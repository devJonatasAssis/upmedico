import './jqueryConfig';

/* eslint-disable */ // Vamos desabilitar porque o jquery tem que vir primeiro
import 'admin-lte/bootstrap/js/bootstrap.min'
import 'admin-lte/plugins/jQueryUI/jquery-ui.min'
import 'admin-lte/plugins/fastclick/fastclick'
import 'admin-lte/plugins/slimScroll/jquery.slimscroll.min'
import 'admin-lte/plugins/timepicker/bootstrap-timepicker.js'
import 'admin-lte/plugins/timepicker/bootstrap-timepicker.css'
import 'admin-lte/dist/js/app.min'

import 'font-awesome/css/font-awesome.min.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'admin-lte/bootstrap/css/bootstrap.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/plugins/iCheck/flat/blue.css'

import './index.css';

import $ from 'jquery';

/* eslint-enable */

$.datepicker.regional['pt-BR'] = {
  closeText: 'Fechar',
  prevText: '&#x3C;Anterior',
  nextText: 'Próximo&#x3E;',
  currentText: 'Hoje',

  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
               'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],

  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  weekHeader: 'Sm',
  dateFormat: 'dd/mm/yy',
  firstDay: 0,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: '',
};

$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
