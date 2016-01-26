import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import "styles/ui/knob";


class Knob extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      dragInfo: null
    }
  }

  calculateControlRotation() {
    let f = this.props.value / (this.props.max - this.props.min);
    return Math.round(f * 270 - (this.props.center ? 0 : 135));
  }

  handleMouseDown(e) {
    this.setState({
      "dragInfo": { x: e.screenX, y: e.screenY, value: this.props.value }
    });
  }

  handleDragStart(e) {
    e.nativeEvent.dataTransfer.setDragImage(ReactDOM.findDOMNode(this.refs.dragPreview), 0, 0);
  }

  handleDrag(e) {

    // cancel out when user has no button down
    // the last event triggers a drag with no buttons down
    if (!e.buttons) return;

    let yDelta = -(e.screenY - this.state.dragInfo.y);

    let newValue = Math.min(Math.max(this.state.dragInfo.value + yDelta, this.props.min), this.props.max);

    if (newValue !== this.state.dragInfo.value) {
      this.props.onChange(newValue);
    }
  }

  handleDragEnd(e) {
    this.setState({ "dragInfo": null });
  }

  render() {
    let controlStyleRotation = {
      transform: "rotate(" + this.calculateControlRotation() + "deg)"
    };

    return (
      <div
        className={`knob ${this.props.className}`}
        onMouseDown={this.handleMouseDown.bind(this)}
        onDragStart={this.handleDragStart.bind(this)}
        onDrag={this.handleDrag.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}
        draggable="true"
        >
        <div className="knob__title">{this.props.name}</div>
        <div className="knob__container">
          <div className="knob__control" style={controlStyleRotation}>
            <div className="knob__indicator"></div>
          </div>
          <div className="knob__stopmin"></div>
          <div className="knob__stopmax"></div>
          {this.props.center ? (<div className="knob__stopcenter"></div>) : null}
        </div>
        <div className="knob__value">{this.props.value}</div>
        <img ref="dragPreview" style={{visibility: "hidden"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4Xw8AAoABf5/NhYYAAAAASUVORK5CYII=" />
      </div>
    );
  }
}

Knob.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  center: React.PropTypes.bool
};


Knob.defaultProps = {
  className: "",
  value: 0,
  min: 0,
  max: 127,
  center: false
};


export default Knob;
