/**
 * Classe de criação de ações genéricas para o redux, as classes
 * de criação de ações específicas devem herdar dessa.
 */
export default class GenericActionCreator {

  /**
   * Adiciona um growl padrão.
   */
  static addGrowl(category, title, message, time) {
    return {
      type: 'ADD_GROWL',
      category,
      title,
      message,
      time,
    };
  }

  /**
   * Remove um growl
   * @param {any} id O Id do growl
   */
  static removeGrowl(id) {
    return {
      type: 'REMOVE_GROWL',
      id,
    };
  }

}
