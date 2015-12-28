import React from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPopover() {

    let values = [];

    // should not be done here, already computed in lookup
    for (var p in this.props.lookup.values) {
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

    return (
      <Popover id="popoverid">
        {options}
      </Popover>
    );
  }

  render() {


    return (
      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.renderPopover()}>
        <div className={`simple ${this.props.className}`}>
          <div className="simple__name">{this.props.name} ({this.props.value})</div>
          <div className="simple__value">{this.props.text}</div>
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
  allValues: React.PropTypes.object,
  lookup: React.PropTypes.object
};


Select.defaultProps = {
  value: 0,
  min: 0,
  max: 127,
  onChange: () => {}
};


export default Select;
