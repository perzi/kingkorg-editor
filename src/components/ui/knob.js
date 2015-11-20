import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Knob extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      dragInfo: null
    }
  }

  calculateDotRotation() {
    let f = this.props.value / (this.props.max - this.props.min);
    return Math.round(f * 270 - 45);
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

    // TODO: solve structure so we don't need the translate in this transform,
    // maybe wrap dot in a container
    let dotStyle = {
        transform: "rotate(" + this.calculateDotRotation() + "deg) translate(-15px, 0)"
    };

    return (
      <div className="knob">
        <div className="knob__name">{this.props.name}</div>
        <div className="knob__scale"
          onMouseDown={this.handleMouseDown.bind(this)}
          onDragStart={this.handleDragStart.bind(this)}
          onDrag={this.handleDrag.bind(this)}
          onDragEnd={this.handleDragEnd.bind(this)}
          draggable="true"
        >
          <div className="knob__dot" style={dotStyle}></div>
        </div>
        <div className="knob__value">{this.props.value}</div>
        <img ref="dragPreview" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4Xw8AAoABf5/NhYYAAAAASUVORK5CYII=" />
      </div>
    );
  }
}

Knob.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  className: React.PropTypes.string.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};


Knob.defaultProps = {
  value: 0,
  min: 0,
  max: 127
};


export default Knob;
