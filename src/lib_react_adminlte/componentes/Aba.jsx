import React from 'react';
import TabsContent from '../template/tab/TabsContent.jsx';

let uniqueId = 0;

export class Aba extends React.Component {

}

/**
 */
export class PageControl extends React.Component {

  constructor() {
    super();
    this.id = 'page-control-' + (++uniqueId);
  }

  state = {
    selected: null,
  }

  componentDidMount() {
    if (this.state.selected === null) {
      const firstNotDisabled = this.getChildren()[0] || { key: null };
      this.setState({ selected: this.getItemKey(firstNotDisabled.key) });
    }
  }

  componentWillReceiveProps() {
    if (this.state.selected === null) {
      const firstNotDisabled = this.getChildren()[0]  || { key: null };
      this.setState({ selected: this.getItemKey(firstNotDisabled.key) });
    }
  }

  setAbaSelecionada(id) {
    this.setState({ selected: this.getItemKey(id) });
  }

  onSelectAba(key) {
    this.setState({ selected: key });
  }

  getItemKey(key) {
    return this.id + key;
  }

  getChildren() {
    return (this.props.children.length ? this.props.children : [this.props.children]).filter(x => !x.props.disabled);
  }

  renderAba(item) {
    return (
      <li className={this.state.selected === this.getItemKey(item.key) ? 'active' : ''}>
        <a data-toggle='tab' 
           onClick={this.onSelectAba.bind(this, this.getItemKey(item.key))}
           data-target={this.getItemKey(item.key)}>
          <i className={`fa fa-${item.props.icone}`} />
          {item.props.label}
        </a>
      </li>
    );
  }

  renderConteudo(item) {
    return (
      <div id={this.getItemKey(item.key)} 
           className={`tab-pane ${this.state.selected === this.getItemKey(item.key) ? 'active' : ''}`}> 
        {item.props.children}
      </div> 
    );
  }

  render() {
    return (
      <div className='nav-tabs-custom flex d-flex flex-col'> 
        <ul className='nav nav-tabs'> 
          {this.getChildren().map(this.renderAba.bind(this))}
        </ul>
        
        <TabsContent>
          {this.getChildren().map(this.renderConteudo.bind(this))}
        </TabsContent>
      </div>
    );
  }

}