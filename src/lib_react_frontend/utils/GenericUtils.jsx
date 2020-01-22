import ReactDOM from 'react-dom';
import $ from 'jquery';

/**
 * Classe utilidades genéricas para todas as aplicações.
 */
export default (class GenericUtils {

  static abrirPdfBase64(base64, nome) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/pdf;base64, ' + base64);
    element.setAttribute('download', nome + '.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  static irParaPaginaNovaAba(link) {
    const element = document.createElement('a');
    element.setAttribute('href', link);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  static removeElement(father, elementClassName) {
    if ($(father).children(elementClassName).length !== 0) {
      const son = ($(father).children(elementClassName))[0];
      father.removeChild(son);
      return;
    }
  }

  /**
   * Seta o elemento como carregando, isso fará com que
   * apareça um progressbar indefinido bem na frente
   * do componente.
   * @param {ref} el Uma referência do react.
   * @param {boolean} display True ou false para mostrar ou não 
   * @param {string} tamanho O Tamanho do icone de carregamento de 1 a 5 (padrão 3)
   */
  static setElementoCarregando(el, display, tamanho) {
    // eslint-disable-next-line
    el = ReactDOM.findDOMNode(el);
    if (!el) {
      return;
    }

    el.style.pointerEvents = '';
    GenericUtils.removeElement(el, '.loading-wrapper-x');
    GenericUtils.removeElement(el, '.loading-spinner');

    if (display) {
      el.style.pointerEvents = 'none';
      const spinner = document.createElement('span');
      spinner.className = 'loading-spinner fa-center fa fa-refresh fa-spin fa-';
      spinner.className += (tamanho ? tamanho + 'x' : '3x');

      const wrapper = document.createElement('div');
      wrapper.className = 'loading-wrapper-x opacity-05';

      el.appendChild(wrapper);
      el.appendChild(spinner);
    }
  }

  /**
   * Seta a opacidade de um elemento para 
   * o valor especificado.
   */
  static fadeTo(element, opacity) {
    element.style.opacity = opacity;
  }

  /**
   * Checa e retorna se estamos em um dispositivo móvel.
   * Tambem retorna true para larguras pequenas, para podermos atualizar
   * a tela de forma responsiva.
   */
  static isMobile() {
    return ((navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ) || window.innerWidth <= 768);
  }

});
