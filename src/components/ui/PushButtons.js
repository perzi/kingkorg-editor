import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import 'styles/ui/pushbuttons';


class PushButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOptions() {

    let values = this.props.lookup.mappings;

    let options = values.map((item, index) => {
      let handleClick = () => {
        this.props.onChange(item.value);
      };
      let selected = item.value === this.props.value;
      let bsStyle = selected ? "primary" : "default";
      return (<Button key={index} bsStyle={bsStyle} onClick={handleClick}>{item.text}</Button>);
    }, this);

    return (
      <ButtonGroup bsSize="xsmall">
        {options}
      </ButtonGroup>
    );
  }

  render() {
    const { props } = this;

    return (
      <div className={`pushbuttons ${props.className}`}>
        <label className="pushbuttons__label">{props.name}</label>
        <div className="pushbuttons__options">{this.renderOptions()}</div>
      </div>
    );
  }
}

PushButtons.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  lookup: React.PropTypes.object
};


PushButtons.defaultProps = {
  value: 0,
  min: 0,
  max: 127,
  className: "",
  onChange: () => {}
};


export default PushButtons;
