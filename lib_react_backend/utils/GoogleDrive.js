const google = require('googleapis');
const drive = google.drive('v3');
const fs = require('fs');
const path = require('path');
const requests = require('./requests');
const app = require('../../utils/app');
const files = require('../../utils/files');

/**
 * Classe de manipulação de informações do google drive.
 */
module.exports = class GoogleDrive {

  constructor() {
    this.authGoogle = null; // Autenticação OAUTH do google.
    this.downloadCallback = () => {};
  }

  async encontrarPastaArray(pastas, parentId) {
    let lastParentId = parentId;
    for (const pasta of pastas) {
      lastParentId = await this.encontrarPasta(pasta, lastParentId);  
    }
    return lastParentId;
  }

  /**
   * Encontra uma pasta no drive. Caso não seja encontrada ela já é criada.
   * @param {String} nomePasta O Nome da pasta no drive separada por / 
   * @param {String} parentId O Parentid da pasta, é opcional.
   */
  encontrarPasta(nomePasta, parentId) {
    return new Promise(async (resolve) => {
      if (nomePasta.contains('/')) {
        // Varias pastas, vamos centralizar em outro lugar.
        return await this.encontrarPastaArray(nomePasta.split('/'), parentId);
      }

      let query = ` name = "${nomePasta}" `;
      if (parentId) {
        query += ` and "${parentId}" in parents`;
      }

      drive.files.list({
        auth: params.authGoogleApice,
        pageSize: 1,
        trashed: false,
        fields: 'files(id)',
        mimeType: 'application/vnd.google-apps.folder',
        q: query,
      }, (error, response) => {
        if (error) {
          return resolve();
        }
        return resolve(response.files[0].id);
      });
    });
  }

  /**
   * Realiza a autenticação do drive através da conta da apice backups.apice@gmail.com.
   * Uma requisição é feita pra apice para pegar as informações da autenticação.
   */
  async autenticarViaApiceBackups() {
    const ret = await requests.post(`http://${app.ipApice}:8093/drive/request_drive_token`, {}, { timeout: 5000 });
    if (ret.a && ret.r) {
      this.autenticar(ret.i, ret.s, ret.a, ret.r);
    }
  }
  
  /**
   * Realiza a autenticação no drive, deve ser chamado antes de qualquer processo
   * de requisição no drive.
   * @param {String} clientId 
   * @param {String} clientSecret 
   * @param {String} accessToken 
   * @param {String} refreshToken 
   */
  autenticar(clientId, clientSecret, accessToken, refreshToken) {
    this.authGoogle = new google.auth.OAuth2(clientId, clientSecret);
    this.authGoogle.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  /**
   * Encontra um arquivo no drive com base nos parâmetros passados.
   * @param {String} nome O Nome do arquivo no drive.
   * @param {String} parentId O Id da pasta pai no drive.
   * @return {Google.File} O Arquivo no google drive ou nulo se não foi encontrado.
   */
  encontrarArquivo(nome, parentId) {
    return new Promise(async (resolve, reject) => {
      let query = ` name = "${nome}" `;
      if (parentId) {
        query += ` and "${parentId}" in parents `;
      }

      drive.files.list({
        auth: this.authGoogle,
        pageSize: 1,
        trashed: false,
        fields: 'files(id, size)',
        q: query,
      }, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response.files[0]);
      });
    });
  }

  /**
   * Baixa um arquivo do google drive.
   * @param {Google.File} file Um arquivo do tipo Google.File.
   * @param {String} pastaDestino A Pasta de destino aonde o arquivo será colocado.
   * @param {String} nomeDestino O Nome com o qual o arquivo será baixado.
   */
  async baixarArquivo(file, pastaDestino, nomeDestino) {
    return new Promise(async (resolve, reject) => {
      files.criarPasta(pastaDestino);
      const stream = fs.createWriteStream(path.join(pastaDestino, nomeDestino));

      const tamanhoArquivo = Number(file.size);
      let tamanhoBaixado = 0;

      stream.on('finish', () => {
        stream.close();
        const infoArquivo = files.getInfoArquivo(path.join(pastaDestino, nomeDestino));
        if (infoArquivo.size == tamanhoArquivo) {
          // Sucesso
          resolve();
        } else {
          reject(new Error('Tamanho dos arquivos diferem!'));
        }
      });

      const driveStream = drive.files.get({
        auth: this.authGoogle,
        fileId: file.id,
        alt: 'media',
      });

      let ultimaPorcentagem = 0;
      driveStream.on('data', (buffer) => {
        tamanhoBaixado += buffer.length;
        const porcentagem = ((tamanhoBaixado / tamanhoArquivo) * 100).toFixed(2);
        if (ultimaPorcentagem != porcentagem) {
          this.downloadCallback(porcentagem);
        }
        ultimaPorcentagem = porcentagem;
      });

      driveStream.pipe(stream);
    });
  }

  /**
   * Seta uma função de callback que será invocada para mostrar a porcentagem
   * de download de um arquivo do drive.
   * @param {Function} callback O Callback de download.
   */
  async onDownloadProgress(callback) {
    this.downloadCallback = callback;
  }

  /**
   * Baixa um arquivo do drive pelo nome e coloca ele na pasta de destino.
   * @param {String} nome O Nome do arquivo no Drive, caso existam vários arquivos 
   *                      com o mesmo nome será escolhido o primeiro.
   * @param {String} pastaDestino A Pasta onde o arquivo será colocado.
   */
  async baixarArquivoPeloNome(nome, pastaDestino) {
    const file = await this.encontrarArquivo(nome);
    if (file) {
      // Sucesso, encontramos o arquivo.
      await this.baixarArquivo(file, pastaDestino, nome);
    }
    return file;
  }

  createFolder(params) {
    return new Promise((resolve) => {
      const fileMetadata = {
        name : params.nomePasta,
        mimeType : 'application/vnd.google-apps.folder',
      };

      if (params.parentId) fileMetadata.parents = [params.parentId];

      drive.files.create({
        auth: params.authGoogleApice,
        resource: fileMetadata,
      }, (err, response) => {
        if (err) {
          console.log('Erro ao criar a pasta no drive ', params.nomePasta, ' erro -> ', err);
          return resolve();
        }
        if (!response ||
          !response.id) {
          return resolve();
        }
        console.log('Pasta criada no drive ', params.nomePasta);
        resolve(response.id);
      });
    });
  }

  criarArquivo(file, caminhoArquivo) {
    return new Promise((resolve) => {
      const fileMetadata = {
        name: path.basename(caminhoArquivo),
      };

      // if (params.parentId) fileMetadata.parents = [params.parentId];

      const media = {
        body: fs.createReadStream(caminhoArquivo),
      };

      drive.files.create({
        auth: this.authGoogle,
        resource: fileMetadata,
        media,
      }, (err, file) => {
        if (err) {
          console.log('Erro ao criar o arquivo no drive ', params.nomeArquivo, ' erro -> ', err);
          return resolve();
        }
        if (!file ||
          !file.id) {
          return resolve();
        }

        console.log('Arquivo criado com sucesso no drive ', params.nomeArquivo);
        const retorno = {
          status: true,
          file,
        };

        if (fileMetadata.parents &&
          fileMetadata.parents.length > 0) {
          const modifiedParams = {
            modifiedTime: new Date(),
            authGoogleApice: params.authGoogleApice,
            parents: fileMetadata.parents,
          };
          setModifiedDateParents(modifiedParams).then(resolve(retorno));
        } else {
          resolve(retorno);
        }
      });
    });
  }

  async setModifiedDateParents(params) {
    for (let x = 0; x < params.parents.length; x++) {
      const fileId = params.parents[x];
      const paramsUpdateParent = {
        authGoogleApice: params.authGoogleApice,
        fileId,
        // Se retirar, ele vai fazer recursiva voltando cada pasta
        // como no atualizador do delphi somente atualizavamos a pasta do backup do cliente,
        // resolvi manter assim, senão é so retirar o fields: 'id'
        fields: 'id',
        fileMetadata: {
          modifiedTime: (params.modifiedTime || new Date()),
        },
      };
      // yield updateFile(paramsUpdateParent);
    }
    resolve();
  }

  /**
   * Atualiza um arquivo do drive.
   * @param {Google.File} file O Arquivo do drive a ser atualizado.
   * @param {String} caminhoArquivo O Arquivo de origem para atualizar.
   */
  atualizarArquivo(file, caminhoArquivo) {
    return new Promise((resolve, reject) => {
      const media = {
        body: fs.createReadStream(caminhoArquivo),
      };

      drive.files.update({
        auth: this.authGoogle,
        fileId: file.id,
        resource: file.fileMetadata,
        media,
        fields: 'id, parents, modifiedTime, size',
      }, (err, file) => {
        if (err) {
          reject(err);
        } 

        // if (file.parents &&
        //   file.parents.length > 0) {
        //   const modifiedParams = {
        //     modifiedTime: file.modifiedTime || new Date(),
        //     authGoogleApice: params.authGoogleApice,
        //     parents: file.parents,
        //   };
        //   setModifiedDateParents(modifiedParams).then(resolve(retorno));
        // } else {
        //   resolve(retorno);
        // }
      });
    });
  }

  /**
   * Salva um arquivo no drive.
   * @param {String} pastaDrive A Pasta aonde será salva no drive no estilo A/B/C.
   * @param {String} caminhoArquivo O Caminho do arquivo no disco.
   * @param {String} nomeDrive O Nome do arquivo no qual será salvo no drive.
   */
  async salvarArquivo(pastaDrive, caminhoArquivo, nomeDrive) {
    const parentId = await this.encontrarPasta(pastaDrive);
    const arquivo = await this.encontrarArquivo(nomeDrive, parentId);
    if (arquivo) {
      // Atualizaremos o arquivo
      await this.atualizarArquivo(arquivo, caminhoArquivo);
    } else {
      // Criaremos o arquivo
      await this.criarArquivo(arquivo, caminhoArquivo);
    }
  }
};
