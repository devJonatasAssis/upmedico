import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IF from '../../../lib_react_frontend/componentes/IF.jsx';
import { selectTab } from './tabActions';

class TabHeader extends Component {

  render() {
    const selected = this.props.tab.selected === this.props.target;
    const visible = this.props.tab.visible[this.props.target];
    return (
      <IF test={visible}>
        <li className={selected ? 'active' : ''}>
          <a data-toggle='tab'
             onClick={() => {
               this.props.selectTab(this.props.target, this.props.a);
               if (this.props.onClick) {
                 this.props.onClick();
               }
             }}
             data-target={this.props.target}>
            <i className={`fa fa-${this.props.icon}`} />
            {this.props.label}
          </a>
        </li>
      </IF>
    );
  }
}

const mapStateToProps = state => ({ tab : state.tab });
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);
