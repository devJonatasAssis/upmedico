const nodemailer = require('nodemailer');

module.exports = class Email {

  constructor() {
    this.nodemailer = null;
    this.options = {
      attachments: [],
    };
    this.HOST_GMAIL = 'smtp.gmail.com';
    this.HOST_HOTMAIL = 'smtp.live.com';
    this.HOST_HOTMAIL = 'smtp.mail.yahoo.com';
  }

  autenticar(host, port, email, usuario, senha) {
    this.options.from = email;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: usuario,
        pass: senha,
      },
    });
  }

  autenticarGmail(email, usuario, senha) {
    this.autenticar(this.HOST_GMAIL, 465, email, usuario, senha);
  }

  autenticarHotmail(email, usuario, senha) {
    this.autenticar(this.HOST_HOTMAIL, 587, email, usuario, senha);
  }

  autenticarYahoo(email, usuario, senha) {
    this.autenticar(this.HOST_YAHOO, 465, email, usuario, senha);
  }

  adicionarAnexoBase64(nomeArquivo, conteudo, cid) {
    this.options.attachments.push({
      fileName: nomeArquivo,
      content: conteudo,
      encoding: 'base64',
      contentType: 'image/jpeg',
      cid,
    });
  }

  setCorpo(mensagem, isHtml) {
    if (isHtml) {
      this.options.html = mensagem;
    } else {
      this.options.text = mensagem;
    }
  }

  enviar(assunto, emailsDestino) {
    return new Promise((resolve, reject) => {
      this.options.subject = assunto;
      this.options.to = emailsDestino;
      this.transporter.sendMail(this.options, (error, info) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(info);
      });
    });
  }

};
