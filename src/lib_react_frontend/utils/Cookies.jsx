import Cookie from 'universal-cookie';
const cookie = new Cookie();

/**
 * Classe que gerencia os cookies da aplicação.
 */
export default (class Cookies {

  // Seta um cookie
  static set(nome, valor, dtExpiracao) {
    cookie.set(nome, valor, { path: '/', expires: dtExpiracao });
  }

  // Recupera um cookie
  static get(nome) {
    return cookie.get(nome);
  }

  // Deleta um cookie
  static erase(nome) {
    cookie.remove(nome, { path: '/' });
  }
  
});
