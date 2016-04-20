import React from 'react';
import ReactDOM from 'react-dom';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

import "styles/ui/slider";


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  handleChange(e) {
    this.props.onChange(parseInt(e.target.value, 10));
  }

  render() {
    let { props } = this;
    let rangeId = `slider__${props.id}`;
    let rangeListId = `slider_list__${props.id}`;
    let centerOption = props.center !== undefined ? <option>{props.center}</option> : null;
    let labelDisabledClassName = props.disabled ? "slider__label--disabled" : "";
    let inputClassName = props.max - props.min > 128 ? "slider__range--double" : "slider__range";

    return (
      <div className={`slider ${props.className}`}>
        <label className={`slider__label ${labelDisabledClassName}`} htmlFor={rangeId}>{props.name}</label>

        <input
          id={rangeId}
          className={inputClassName}
          type="range"
          value={props.value}
          min={props.min}
          max={props.max}
          onChange={this.handleChange.bind(this)}
          step={props.step}
          list={rangeListId}
          disabled={props.disabled}
          />
        <span className="slider__text">{props.text}</span>

        <datalist id={rangeListId}>
          <option>{props.min}</option>
          { centerOption}
          <option>{props.max}</option>
        </datalist>

      </div>
    );
  }
}

Slider.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  center: React.PropTypes.number,
  step: React.PropTypes.number,
  disabled: React.PropTypes.bool,
};


Slider.defaultProps = {
  className: "",
  value: 0,
  min: 0,
  max: 127,
  center: undefined,
  step: 1,
  disabled: false,
};


export default Slider;
