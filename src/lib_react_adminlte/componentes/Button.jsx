import React from 'react';

export default class Button extends React.Component {

  getClasses() {
    let classes = 'btn ';
    if (this.props.disabled) {
      classes += ' disabled ';
    }
    classes += ' ' + this.props.className;
    return classes;
  }

  render() {
    return (
      <button {...this.props}
              type="button"
              className={this.getClasses()}>
        {this.props.icon && <i className={'fa ' + this.props.icon} />}
        {this.props.label &&
          <span className="ml-5">
            {this.props.label}
          </span>}
      </button>
    );
  }

}
