const utils = require('./utils/utils');

const parsers = [
  parseFindField,
  parseFindJoin,
  parseFunc,
  parseOperation,
  parseUpdateField,
  parseParenthesis,
  parseString,
];

function parseString(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^('[\s\S]*')$/g, token)) {
    return token;
  }
}

function parseParenthesis(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^(\([\s\S]*\))$/g, token)) {
    return parseToken(token.substring(1, token.length - 1), method, alias);
  }
}

function parseOperation(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^(\$\w+\s+(eq)\s+[\s\S]*)$/g, token)) {
    const field = token.substring(0, token.indexOf(' '))
                       .replace(/\$/g, alias + '.');
    
    let op = token.substring(token.indexOf(' ')).trim();
    op = op.substring(0, op.indexOf(' '));
    switch (op) {
      case 'eq': op = '='; break;
      default: throw new Error('Operator not identified!');
    }

    token = token.substring(token.indexOf(' ')).trim();
    token = token.substring(token.indexOf(' ')).trim();
    const value = parseToken(token, method, alias);
    
    return `${field} ${op} ${value}`;
  }
}

function parseFunc(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^(@\w+\s*[\s\S]*)$/g, token)) {
    const func = token.substring(1, token.indexOf(' '));
    const rest = token.substring(token.indexOf(' ') + 1, token.length);
    const tokens = rest.split('||');

    let value = func + '(';
    for (let i = 0; i < tokens.length; i++) {
      const ret = parseToken(tokens[i], method, alias);
      tokens[i] = ret;
      value += tokens[i] + ',';
    }
    value = value.substring(0, value.length - 1) + ')';
    return value;
  }
}

function parseFindField(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^(\w+\s*(\([\s\S]*\))?\s*,?)$/g, token)) {
    // Selecting token
    if (method === 'find') {
      // Match!
      let fieldName = token.replace(/,/g, '');
      let name = `${alias}.${fieldName}`;
      const extraMatch = token.match(/\([\s\S]*\)/g);
      if (extraMatch && extraMatch.length && extraMatch[0].replace(/\s*/g, '') != '()') {
        const innerCommand = extraMatch[0].trim().substring(1, extraMatch[0].trim().length - 1);
        const ret = parseToken(innerCommand, method, alias);
        fieldName = token.substring(0, token.indexOf('('));
        name = ret;
      }
      fieldName = fieldName.trim();
      return [{
        type: 'get_field',
        value: `${name} as '${alias}_${fieldName}', `,
      }];
    }     
    throw new Error('Search tokens can only be used in "find" methods!');
  }
}

function parseUpdateField(token, method) {
  token = token.trim();
  if (utils.regexMatch(/^(\w+\s*->\s*[\s\S]*)$/g, token)) {
    // Updating field
    if (method === 'update') {
      // Match!
      const hasComma = token.endsWith(',');
      const name = token.substring(0, token.indexOf(' '));
      const value = token.substring(token.indexOf('->') + 2, 
          token.length - (hasComma ? 1 : 0)).trim();
      return [{
        type: 'set_field',
        value: `${name} = ${value}, `,
      }];
    }     
    throw new Error('Search tokens can only be used in "update" methods!');
  }
}

function parseFindJoin(token, method, alias) {
  token = token.trim();
  if (utils.regexMatch(/^(\.?\s*\w+\s+(\w+\s*:\s*\w+|\w+)\s+(\([\s\S]*\))*\s*{)$/g, token)) {
    // Joining table
    const results = [];

    // Increate the alias and send notification:
    alias = 'a' + (Number(alias.substring(1, alias.length)) + 1);
    results.push({
      type: 'inc_alias',
    });

    token = token.replace(/\s+/g, ' ');

    let joinType = 'inner'; // Default is inner
    let entityName = ''; // The entity to be joined with
    let on = ''; // The on condition

    if (token.startsWith('.')) {
      // Left join, dot symbolizes optional.
      token = token.substring(1, token.length).trim();
      joinType = 'left';
    }

    const words = token.split(/\s+/g);
    entityName = words[0];
    on = words[1];

    results.push({
      type: 'add_association',
      alias: `${alias}`,
      entity: entityName,
    });

    if (!on || on.trim() === '{') {
      throw new Error(`"On" clause not specified for the entity "${entityName}"`);
    }

    const fields = on.split(':');
    if (fields.length > 1) {
      on = ` on ${alias}.${fields[0]} = a1.${fields[1]} `;
    } else {
      on = ` on ${alias}.${fields[0]} = a1.${fields[0]} `;
    }

    const whereMatch = token.match(/\([\s\S]*\)/g);
    if (whereMatch && whereMatch.length) {
      const value = whereMatch[0].toLowerCase()
              .replace(/\$/g, `${alias}.`)
              .replace(/update|delete|\s+table\s+|truncate/g, '');
      results.push({
        type: 'add_where',
        value,
      });
    }

    results.push({
      type: 'add_join',
      value: ` ${joinType} join ${entityName} ${alias} ${on}\n`,
    });
    return results;
  }
}

/**
 * Parses the specified token and returns the 
 * action to be performed by a handler.
 * @param {string} token The token.
 * @param {string} method The current method (find|update|delete)
 * @param {alias} alias The current alias of the table (only used in find)
 */
function parseToken(token, method, alias) {
  if (token.trim() === '' || utils.regexMatch(/\s*}\s*,\s*/g, token)) {
    return;
  }

  for (const parser of parsers) {
    const ret = parser(token, method, alias);
    if (ret) {
      return ret;
    }
  }
  throw new Error(`Token ${token} could not be compiled!`);
}

// ======================

/**
 * Main papito module.
 */
module.exports = class Papito {

  constructor() {
    this.associations = {};
  }

  handleFind(mainEntity, content) {
    let fields = '';
    let joins = '';
    let where = ' 1 = 1 ';
    let alias = 1; // Aliases of the entities
    const splittedContent = content.split('\n');
    for (const line of splittedContent) {
      const results = parseToken(line, 'find', `a${alias}`);   
      if (results) { 
        for (const r of results) {
          switch (r.type) {
            case 'get_field': fields += r.value; break;
            case 'inc_alias': alias++; break;
            case 'add_association': this.associations[r.alias] = r.entity; break;
            case 'add_where': where += ` and ${r.value} `; break;
            case 'add_join': joins += `${r.value}`; break;
            default: break;
          }
        }
      }
    }
    fields = fields.substring(0, fields.length - 2);
    return {
      type: 'find',
      value: (`SELECT ${fields} from ${mainEntity} a1 ${joins} where ${where}`),  
    };
  }

  /**
   * Handles an update papito string, returning the sql
   * for the update.
   * @param {string} mainEntity the main entity to be updated.
   * @param {string} content The content of the update str.
   * @param {string} where The where condition passed within parenthesis.
   */
  handleUpdate(mainEntity, content, where) {
    let fields = '';
    const splittedContent = content.split('\n');
    for (const line of splittedContent) {
      const results = parseToken(line, 'update');   
      if (results) { 
        for (const r of results) {
          switch (r.type) {
            case 'set_field': fields += r.value; break;
            default: break;
          }
        }
      }
    }
    fields = fields.substring(0, fields.length - 2);
    return {
      type: 'update',
      value: (`UPDATE ${mainEntity} SET ${fields} where 1 = 1 ${where}`),  
    };
  }

  /**
   * Transforms a Papito string into a query.
   * @param {string} query The papito string.
   */
  transform(query) {
    const tokens = query.trim().split(/\s*\}\s*;/g);
    for (let token of tokens) {
      token += '};';
      const header = token.substring(0, token.indexOf('{'));
      const firstLineWords = header.replace(/\s*/g, '').split(':'); 
      const firstToken  = firstLineWords[0].trim();
      const mainContent = token.substring(token.indexOf('{') + 1, token.lastIndexOf('}'));

      let firstEntity = (firstLineWords[1] || firstLineWords[0]).trim();
      this.associations.a1 = firstEntity;

      let where = '';
      const whereMatch = header.match(/\([\s\S]*\)/g);
      if (whereMatch && whereMatch.length && whereMatch[0] != '()') {
        where = 'and ' + whereMatch[0];
        firstEntity = firstEntity.substring(0, firstEntity.indexOf('('));
      }

      if (firstToken === firstEntity || firstToken === 'find') {
        // Select|Find
        return this.handleFind(firstEntity, mainContent);
      } else if (firstToken === 'update') {
        // Update
        return this.handleUpdate(firstEntity, mainContent, where);
      }
    }
  }
  
  /**
   * Converts the queried array to objects, the array must be a 
   * result of a query created by Papito using 'transform'.
   * @param {array} queryResult The results of the query created by Papito.
   */
  buildToObjects(queryResult) {
    const output = [];
    for (const simpleRow of queryResult) {
      const builtRow = {};
      for (const key in simpleRow) {
        if (simpleRow.hasOwnProperty(key)) {
          const alias = key.substring(0, key.indexOf('_'));
          const field = key.substring(key.indexOf('_') + 1);

          if (alias !== 'a1') {
            // Its not the main table
            const entity = this.associations[alias];
            if (!builtRow[entity]) { // Create if it doesnt exists
              builtRow[entity] = {};
            }
            builtRow[entity][field] = simpleRow[key]; // Puts the key
          } else {
            // É tabela principal 
            builtRow[field] = simpleRow[key];
          }
        }
      }
      output.push(builtRow);
    }   
    return output;
  }

};
