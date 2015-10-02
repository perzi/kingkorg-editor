import React   from 'react/addons';

class ADSR extends React.Component {
  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  calculatePoints() {

    let offset = this.props.strokeWidth;
    let h = this.props.height - offset * 2;
    let { A, D, S, R, width } = this.props;

    let x0 = 0;
    let y0 = 0;
    let x1 = A;
    let y1 = 1.0;
    let x2 = D + A;
    let y2 = S;
    let x3 = 2.0;
    let y3 = S;
    let x4 = 2.0 + R;
    let y4 = 0;

    return [
      [x0, y0],
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4]
    ].map(p => [Math.round(p[0] * h) + offset, this.props.height - Math.round(p[1] * h)]);
  }

  render() {

    let points = this.calculatePoints().map(points => points.join(",")).join(" ")
    let polygonStyle = {
      fill: this.props.backgroundColor,
    };
    let polylineStyle = {
      strokeWidth: this.props.strokeWidth,
      stroke: this.props.foregroundColor,
      fill: "transparent"
    };

    let scale = this.props.height - 2 * this.props.strokeWidth;
    let transform = `scale(${scale})`;


    return (
      <svg width={this.props.width} height={this.props.height} >
        <polygon points={points} style={polygonStyle} />
        <polyline points={points} style={polylineStyle}/>
      </svg>
    );
  }
};

ADSR.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  backgroundColor: React.PropTypes.string,
  foregroundColor: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
  A: React.PropTypes.number,
  D: React.PropTypes.number,
  S: React.PropTypes.number,
  R: React.PropTypes.number
}

ADSR.defaultProps = {
  width: 400,
  height: 200,
  backgroundColor: "darkgreen",
  foregroundColor: "lightgreen",
  strokeWidth: 1,
  A: 0,
  D: 0.2,
  S: 0.2,
  R: 1
}

export default ADSR;
