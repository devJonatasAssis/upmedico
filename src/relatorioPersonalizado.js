import './html2canvas.js';
import co       from 'co';

import Api from './utils/Api.jsx';
import pdfMake  from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function abc() {

  this.titulo       = ''; // Título do relatório
  this.sql          = ''; // Sql do relatório
  this.apelidos     = null; // Array de strings dos nomes dos campos
  this.larguras     = null; // Larguras das colunas 
  this.lineCallback = null; // Callback para adicionar sub relatorios para cada linha

  /**
   * Irá gerar o relatório personalizado, por padrão o relatório
   * será aberto em outra janela.
   */
  this.gerar = function gerar() {
    const self = this;
    co(function* () {
      let widths = [];
      let body   = [];
      const res = (yield Api.post('/sql', { sql: self.sql })).dados;

      if (res && res.length > 0) {
        // Insere os cabeçalhos primeiro:
        body.push(Object.keys(res[0]));
        for (let i = 0; i < Object.keys(res[0]).length; i++) {
          widths.push('*');
        }
        for (let i = 0; i < res.length; i++) {
          body.push(Object.values(res[i]));
        };
      }

      if (self.apelidos && body.length > 0) {
        // Se definimos os apelidos
        body[0] = self.apelidos;
      }         
      
      if (self.larguras && body.length > 0) {
        // Se definimos as larguras
        widths = self.larguras;
      }         
  
      if (body.length == 0) {
        body.push(['Nenhum registro encontrado.']);
        widths.push(['*']);
      }
  
      const docDefinition = {   
        // Informações do PDF e relatório: 
        info: {
          title: self.titulo || 'Relatório',
          author: 'Harmonia Coutry Club',
          subject: 'Relatório desenvolvido pelo sistema ClubSystema',
          keywords: 'relatorio, lol, wtf',
        },
  
        // O Conteúdo da table
        content: [
          {text: self.titulo, style: 'headerStyle'},
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths,
              body,
            }
          }
        ],
  
        // Os estilos
        styles: {
          headerStyle: {
            fontSize: 25,
            alignment: 'center',
            marginTop: 0,
            marginBottom: 15,
            padding: [10, 10, 10, 10],
          },
          subHeaderStyle: {
            fontSize: 12,
            bold: true,
            margin: [50, 0, 0, 0],
          },
          subLineStyle: {
            fontSize: 8,
            margin: [50, 0, 0, 0],
          }
        }
      };
  
      pdfMake.createPdf(docDefinition).open();
    });
  }
};