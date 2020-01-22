import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button.jsx';

export default class Box extends React.Component {

  onHeaderClick() {
    if (this.props.collapsible) {
      // eslint-disable-next-line
      ReactDOM.findDOMNode(this.button).click();
    }
  }

  render() {
    return (
      <div id={this.props.id} className={'box ' +
            (this.props.collapsible ? 'collapsed-box ' : '') +
            this.props.className}
           style={this.props.style}>

        {/* Cabeçalho caso haja um: */}
        {this.props.title &&
          <div className={' box-header hand with-border ' + this.props.headerClass}

              onClick={this.onHeaderClick.bind(this)}>

            {/* Título */}
            <h3 className="box-title">{this.props.title}</h3>

            {/* Icones: */}
            <div className="box-tools pull-right">
              {/* Ícone de minimizar: */}
              {this.props.collapsible &&
                <Button className="btn-box-tool"
                        data-widget="collapse"
                        ref={e => this.button = e}
                        icon="fa-plus" />}
            </div>
          </div>}

        {/* Conteudo G.O.D: */}
        <div className="box-body">
          {this.props.children}
        </div>
      </div>
    );
  }

}
