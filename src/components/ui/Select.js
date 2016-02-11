import React from 'react';
import { ButtonGroup, Button, Popover, OverlayTrigger } from 'react-bootstrap';


class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPopover() {

    let values = [];

    // should not be done here, already computed in lookup
    for (let p in this.props.lookup.values) {
      values.push({
        value: parseInt(p, 10),
        text: this.props.lookup.values[p]
      })
    }

    let options = values.map((item, index) => {
      let handleClick = () => {
        this.props.onChange(item.value);
      };
      let selected = item.value === this.props.value;
      let bsStyle = selected ? "primary" : "link";
      return (<Button key={index} bsStyle={bsStyle} bsSize="xsmall" onClick={handleClick}>{item.text}</Button>);
    }, this);

    // TODO: use generated id for Popover
    return (
      <Popover id="popoverid">
        {options}
        <br />
        <ButtonGroup>
          <Button bsStyle="default" bsSize="xsmall" onClick={this.handlePrev.bind(this)}>&lt;</Button>
          <Button bsStyle="default" bsSize="xsmall" onClick={this.handleNext.bind(this)}>&gt;</Button>
        </ButtonGroup>
      </Popover>
    );
  }

  handlePrev(e) {
    let length = this.props.max - this.props.min + 1
    let newValue = (this.props.value - 1 + length) % length;
    this.props.onChange(newValue);
  }

  handleNext(e) {
    let length = this.props.max - this.props.min + 1
    let newValue = (this.props.value + 1) % length;
    this.props.onChange(newValue);
  }

  render() {
    const { props } = this;

    return (
      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.renderPopover()}>
        <div className={`pushbuttons ${props.className}`}>
          <label className="pushbuttons__label">{props.name}</label>
          <Button bsStyle="default" bsSize="xsmall">{props.text}</Button>
        </div>
      </OverlayTrigger>
    );
  }
}

Select.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  lookup: React.PropTypes.object
};


Select.defaultProps = {
  value: 0,
  min: 0,
  max: 127,
  className: "",
  onChange: () => {}
};


export default Select;
