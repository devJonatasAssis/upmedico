import React, { Component } from 'react';
import { connect } from 'react-redux';
import IF from '../../../lib_react_frontend/componentes/IF.jsx';

class TabContent extends Component {
    render() {
      const selected = this.props.tab.selected === this.props.id;
      const visible = this.props.tab.visible[this.props.id];
      return (
        <IF test={visible}>
          <div id={this.props.id}
            className={`tab-pane ${selected ? 'active' : ''}`}> 
            {this.props.children}
          </div> 
        </IF>
      );
    }
}

const mapStateToProps = state => ({ tab: state.tab });
export default connect(mapStateToProps)(TabContent);
