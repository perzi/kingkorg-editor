import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import 'styles/ui/toggle';


class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOptions() {

    let values = this.props.lookup.mappings;

    let options = values.map((item, index) => {
      let nextIndex = (index + 1) % values.length;
      let nextValue = values[nextIndex].value;

      let handleClick = () => {
        this.props.onChange(nextValue);
      };
      let selected = item.value === this.props.value;
      let bsStyle = index === values.length - 1 ? "primary" : "default";

      if (selected) {
        return (<Button key={index} bsStyle={bsStyle} onClick={handleClick} disabled={this.props.disabled}>{item.text}</Button>);
      } else {
        return null;
      }
    }, this);

    return (
      <ButtonGroup bsSize="xsmall">
        {options}
      </ButtonGroup>
    );
  }

  render() {
    let { props } = this;
    let labelDisabledClassName = props.disabled ? "toggle__label--disabled" : "";

    return (
      <div className={`toggle ${props.className}`}>
        <label className={`toggle__label ${labelDisabledClassName}`}>{props.name}</label>
        <div className="toggle__options">{this.renderOptions()}</div>
      </div>
    );
  }
}

Toggle.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  lookup: React.PropTypes.object,
  disabled: React.PropTypes.bool,
};


Toggle.defaultProps = {
  value: 0,
  min: 0,
  max: 127,
  className: "",
  onChange: () => {},
  disabled: false,
};


export default Toggle;
