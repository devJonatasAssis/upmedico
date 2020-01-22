export default class BackendSearch {

  constructor(entity, Api, alias) {
    this.Api       = Api;
    this.entity    = entity;
    this.includes  = [];
    this.filters   = [];
    this.fieldsArr = [];
    this.alias     = alias;
  }

  fields() {
    for (const key in arguments) {
      if (arguments.hasOwnProperty(key)) {
        this.fieldsArr.push(arguments[key]);
      }
    }
    return this;
  }

  include(entity, field1, field2, alias) {
    this.includes.push({ entity, field1, field2, alias });
    return this;
  }

  filter(field, condition, value) {
    this.filters.push({ field, condition, value });
    return this;
  }

  async execute() {
    return await this.Api.post('/buscar-2', {
      entity: this.entity,
      fields: this.fieldsArr,
      includes: this.includes,
      filters: this.filters,
      alias: this.alias,
    });
  }

}
