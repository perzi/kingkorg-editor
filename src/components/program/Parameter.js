import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import "styles/components/program/parameter";

class Parameter extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  renderValue() {

    var content = (
      <span className="param param-value">
        {this.props.text}
        <span className="raw">{this.props.value}</span>
      </span>

    );
    if (this.props.allValues && this.props.allValues.length <= 32) {
      let options = this.props.allValues.map((text, value) => {
        let selected = this.props.text === text;
        let className = "param-value-list__item" + (selected ? " param-value-list__item--selected" : "");
        let handleClick = (e) => {
          e.preventDefault();
          this.props.onChange(value, this.props.offset);
        };
        return (
          <li className={className}><a href="#" onClick={handleClick} className="param-value-list__link">{text}</a></li>
        );
      }, this);

      content = (
        <ul className="param param-value-list">
          {options}
        </ul>
      );
    }

    return content;
  }

  render() {
    return (
      <div className="param-container">
          <span className="param param-title">
            {this.props.category + " "}{this.props.name}
            <span className="raw">{this.props.offset}</span>
          </span>
          {this.renderValue()}
      </div>
    );
  }
}

Parameter.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  offset: React.PropTypes.number.isRequired,
  category: React.PropTypes.string,
  allValues: React.PropTypes.array
};


Parameter.defaultProps = {
  onChange: (value, offset) => {
    console.log(value, offset);
  }
};


export default Parameter;
