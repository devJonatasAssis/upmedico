import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Header from '../lib_react_adminlte/template/header/Header.jsx';
import SideBar from '../lib_react_adminlte/template/sidebar/SideBar.jsx';
import MenuItem from '../lib_react_adminlte/template/sidebar/MenuItem.jsx';
import MenuTree from '../lib_react_adminlte/template/sidebar/MenuTree.jsx';
import ApiceValidadorSessao from '../lib_react_frontend/componentes/ApiceValidadorSessao.jsx';
import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import Footer from '../lib_react_adminlte/template/footer/Footer.jsx';
import Cookies from '../lib_react_frontend/utils/Cookies.jsx';
import Api from '../utils/Api.jsx';

// Cadastros
import Configuracoes from '../componentes/Configuracoes.jsx';
import CadastroFuncionario from '../componentes/CadastroFuncionario.jsx';
import CadastroEstado from '../componentes/CadastroEstado.jsx';
import CadastroCidade from '../componentes/CadastroCidade.jsx';
import CadastroBairro from '../componentes/CadastroBairro.jsx';
import CadastroNivel from '../componentes/CadastroNivel.jsx';
import CadastroSexo from '../componentes/CadastroSexo.jsx';
import CadastroGrauParentesco from '../componentes/CadastroGrauParentesco.jsx';
import CadastroEmpresa from '../componentes/CadastroEmpresa.jsx';
import CadastroPaciente from '../componentes/CadastroPaciente.jsx';
import CadastroMedicamento from '../componentes/CadastroMedicamento.jsx';
import CadastroExame from '../componentes/CadastroExame.jsx';
import CadastroDiagnostico from '../componentes/CadastroDiagnostico.jsx';
import CadastroDocumento from '../componentes/CadastroDocumento.jsx';
import CadastroConvenio from '../componentes/CadastroConvenio.jsx';
import CadastroProduto from '../componentes/CadastroProduto.jsx';

// Movimentos
import MovimentoCompra from '../componentes/MovimentoCompra.jsx';
import MovimentoAgenda from '../componentes/MovimentoAgenda.jsx';
import MovimentoAtendimento from '../componentes/MovimentoAtendimento.jsx';

// UTILITÁRIOS
import UtilMudarSenha from '../componentes/UtilMudarSenha.jsx';

import RelatorioCadastral from '../componentes/RelatorioCadastral.jsx';
import RelatorioMovimento from '../componentes/RelatorioMovimental.jsx';

// import  from '';
// import  from '';
/**
 * Tela da aplicação.
 */
class TelaApp extends React.Component {

  state = {
    funcionario:{},
  }

  async componentWillMount() {
    const ret = await Api.validarAuth();
    
    if (ret.status) {
      this.props.dispatch({
        type: 'set_funcionario',
        funcionario: ret.dados.usuario,
      });
      this.props.dispatch({
        type: 'connect_socket',
      });      
      this.props.dispatch({
        type: 'set_config',
        config: ret.dados.config,
      });
      this.modificaMenu();
    }
  }

  /**
   * Retorna os cadastros do sistema.
   */
  getCadastros() {
    return [
      {
        rota: 'bairro',
        label: 'Bairro',
        icone: 'fa-thumb-tack',
        component: CadastroBairro,
      },
      {
        rota: 'cidade',
        label: 'Cidade',
        icone: 'fa-globe',
        component: CadastroCidade,
      },
      {
        rota: 'estado',
        label: 'Estado',
        icone: 'fa-globe',
        component: CadastroEstado,
      },
      {
        rota: 'empresa',
        label: 'Empresa',
        icone: 'fa-edit',
        component: CadastroEmpresa,
      },
      {
        rota: 'funcionario',
        label: 'Funcionário / Usuário',
        icone: 'fa-child',
        component: CadastroFuncionario,
      },
      {
        rota: 'grau_parentesco',
        label: 'Grau de Parentesco',
        icone: 'fa-group',
        component: CadastroGrauParentesco,
      },
      {
        rota: 'pacientes',
        label: 'Pacientes',
        icone: 'fa-user-plus',
        component: CadastroPaciente,
      },
      {
        rota: 'nivel',
        label: 'Nivel de Acesso',
        icone: 'fa-key',
        component: CadastroNivel,
      },
      {
        rota: 'sexo',
        label: 'Sexo',
        icone: 'fa-intersex',
        component: CadastroSexo,
      },
      {
        rota: 'medicamento',
        label: 'Medicamento',
        icone: 'fa-edit',
        component: CadastroMedicamento,
      },
      {
        rota: 'exame',
        label: 'Exame',
        icone: 'fa-edit',
        component: CadastroExame,
      },
      {
        rota: 'diagnostico',
        label: 'Diagnostico',
        icone: 'fa-edit',
        component: CadastroDiagnostico,
      },
      {
        rota: 'documento',
        label: 'Documento',
        icone: 'fa-edit',
        component: CadastroDocumento,
      },
      {
        rota: 'convenio',
        label: 'Convenio',
        icone: 'fa-edit',
        component: CadastroConvenio,
      },
      {
        rota: 'produto',
        label: 'Produto',
        icone: 'fa-edit',
        component: CadastroProduto,
      },
    ];
  }

  getMovimentos() {
    const arr = [
      {
        rota: 'compra',
        label: 'Compra',
        icone: 'fa-plus',
        component: MovimentoCompra,
      },
    ];

    if ([0, 2].indexOf(this.props.funcionario.tp_usuario) >= 0) {
      arr.push({
        rota: 'agenda',
        label: 'Agendamento',
        icone: 'fa-plus',
        component: MovimentoAgenda,
      });
    } if ([0, 1].indexOf(this.props.funcionario.tp_usuario) >= 0) {
      arr.push({        
        rota: 'atendimento',
        label: 'Atendimento',
        icone: 'fa-plus',
        component: MovimentoAtendimento,
      });
    }

    return arr;
  }

  modificaMenu() {
    const { config } = this.props;    
    const usaAberto = (config.status_usa_menu_aberto === 'S') ? ' ' : ' sidebar-collapse';
    document.body.className = 'skin-blue sidebar-mini' + usaAberto;
  }

  /**
   * Realiza o logout da aplicação, isso apaga o token de autenticação
   * e retorna à pagina de login.
   */
  realizarLogout() {
    Cookies.erase('sistema_medico_auth');
    this.props.history.push('/');
  }

  render() {
    return (
      <ApiceValidadorSessao history={this.props.history}
                            api={Api}>
          {/* Navbar: */}
          <Header tituloGrande="Sistema Médico"
                  tituloPequeno="SM"
                  icon="fa-heartbeat"
                  rota='/app'
                  onLogout={this.realizarLogout.bind(this)} />

          {/* Sidebar: */}
          <SideBar>
            <MenuTree label='Cadastro' icon='fa-edit'>
              {this.getCadastros().map(x => (
                <MenuItem key={x.rota} path={'/app/cadastros/' + x.rota}
                          label={x.label} icon={x.icone} />
              ))}
            </MenuTree>
            <MenuTree label='Movimento' icon='fa-edit'>
              {this.getMovimentos().map(x => (
                <MenuItem key={x.rota} path={'/app/movimentos/' + x.rota}
                          label={x.label} icon={x.icone} />
              ))}
            </MenuTree>
            <MenuItem path='/app/relatorioCadastral' label='Relatório Cadastral' icon='fa-book' />
            <MenuItem path='/app/relatorioMovimento' label='Relatório Movimento' icon='fa-book' />
            <MenuItem path='/app/configuracoes' label='Configurações' icon='fa-cog' />
            <MenuTree label='Utilitarios' icon='fa-cube'>
			        <MenuItem path='/app/util/mudarSenha' label='Alterar Senha' icon='fa-edit' />
            </MenuTree>
          </SideBar>

          {/* Configura as sub-rotas: */}
          <Switch>
            <Route exact path="/app/relatorioCadastral" component={RelatorioCadastral} />
            <Route exact path="/app/relatorioMovimento" component={RelatorioMovimento} />
            <Route exact path="/app/configuracoes" component={Configuracoes} />
            <Route exact path="/app/util/mudarSenha" component={UtilMudarSenha} />
            {this.getCadastros().map(x => (
              <Route key={x.rota} path={'/app/cadastros/' + x.rota} component={x.component} />
            ))}
            {this.getMovimentos().map(x => (
              <Route key={x.rota} path={'/app/movimentos/' + x.rota} component={x.component} />
            ))}
            <Route component={ContentWrapper} />
          </Switch>

          <Footer titulo="João Sistem" link="#" />
      </ApiceValidadorSessao>
    );
  }
}

export default connect((state) => ({
  funcionario: state.funcionario,
  config: state.config,
}), (dispatch) => ({
  dispatch,
}))(TelaApp);
