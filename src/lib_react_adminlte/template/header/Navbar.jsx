import { connect } from 'react-redux';
import React from 'react';
import Button from '../../componentes/Button.jsx';

/**
 * Mostra informações do usuário na barra superior da aplicação, mostra foto dele
 * e o nome, ao clicar no componente um painel aparece pra realizar o logout.
 */
class Navbar extends React.Component {

	state = {
		open: false,
	}

	/**
	 * Abre o menu sobreposto.
	 */
	openMenu() {
		this.setState({ open: true });
	}

	/**
	 * Fecha o menu sobreposto.
	 */
	closeMenu() {
		this.setState({ open: false });
	}

	render() {
		const { nome_funcionario, options } = this.props.funcionario;
		return (
			<div className="navbar-custom-menu">
				<ul className="nav navbar-nav">
					<li onMouseEnter={this.openMenu.bind(this)}
							onMouseLeave={this.closeMenu.bind(this)}
							className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
						<a aria-expanded={this.state.open ? 'true' : 'false'}
               className="dropdown-toggle">
							 <i className="fa fa-user-circle-o " />
               <span className="hidden-xs">{nome_funcionario}</span>
						</a>

						<ul className="dropdown-menu">

							{/* Painel principal: */}
							<li className="user-header">
								<p>
									{nome_funcionario}
									<br /><br />
									{'Nível de Usuário - ' + this.props.funcionario.cod_nivel}
								</p>
							</li>

							{/* Rodapé do menu que aparece */}
							<li className="user-footer shadow-up-1">
								{/* Botão de sair: */}
								<Button className="btn-default btn-block btn-flat"
												label="Sair"
												icon="fa-sign-out"
												onClick={this.props.onLogout} />
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

export default connect((state) => ({
	funcionario: state.funcionario,
}))(Navbar);
