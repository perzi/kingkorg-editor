import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import "styles/ui/simple";


class Simple extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      dragInfo: null
    }
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
    return (
      <div className={`simple ${this.props.className}`}
        onMouseDown={this.handleMouseDown.bind(this)}
        onDragStart={this.handleDragStart.bind(this)}
        onDrag={this.handleDrag.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}
        draggable="true"
      >
        <div className="simple__name">{this.props.name} ({this.props.value})</div>
        <div className="simple__value">{this.props.text}</div>
        <div ref="dragPreview" style={{display: "none", visibility: "hidden"}} />
      </div>
    );
  }
}

Simple.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};


Simple.defaultProps = {
  value: 0,
  min: 0,
  max: 127,
  onChange: () => {}
};


export default Simple;
