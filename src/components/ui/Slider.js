import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import "styles/ui/slider";


class Slider extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  handleChange(e) {
    //console.log(e.target.value);
    this.props.onChange(parseInt(e.target.value, 10));
  }

  render() {
    let rangeId = `slider__${this.props.id}`;
    let rangeListId = `slider_list__${this.props.id}`;

    return (
      <div className={`slider ${this.props.className}`}>
        <label className="slider__label" htmlFor={rangeId}>{this.props.name}</label>

        <input
          id={rangeId}
          className="slider__range"
          type="range"
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onInput={this.handleChange.bind(this)}
          step={this.props.step}
          list={rangeListId}
          />
        <span className="slider__text">{this.props.text}</span>

        <datalist id={rangeListId}>
          <option>{this.props.min}</option>
          <option>{this.props.max}</option>
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
  center: React.PropTypes.bool,
  step: React.PropTypes.number
};


Slider.defaultProps = {
  className: "",
  value: 0,
  min: 0,
  max: 127,
  center: false,
  step: 1
};


export default Slider;
