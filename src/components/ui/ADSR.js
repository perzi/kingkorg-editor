import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class ADSR extends React.Component {
  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  calculatePoints() {

    let { A, D, S, R, width, height, strokeWidth } = this.props;
    let offset = strokeWidth * 2;
    let w = width - offset * 2;
    let h = height - offset * 2;
    let w3 = Math.round(w / 3);

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
    ].map(([x, y]) => [Math.round(x * w3) + offset, height - Math.round(y * h) - offset]);
  }

  render() {

    let { width, height, strokeWidth, backgroundColor, foregroundColor } = this.props;
    let cpoints = this.calculatePoints();
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3], [x4, y4]] = cpoints;

    let d = `M ${x0} ${y0}
      Q ${x0} ${y1} ${x1} ${y1}
      Q ${x1} ${y2} ${x2} ${y2}
      L ${x3} ${y3}
      Q ${x3} ${y4} ${x4} ${y4}`;

    return (
      <svg width={width} height={height} >
        <path d={d} stroke={foregroundColor} strokeWidth={strokeWidth} fill={backgroundColor} />
        <g stroke={foregroundColor} strokeWidth={strokeWidth} fill={foregroundColor}>
          <circle cx={x1} cy={y1} r={strokeWidth} />
          <circle cx={x2} cy={y2} r={strokeWidth} />
          <circle cx={x3} cy={y3} r={strokeWidth} />
          <circle cx={x4} cy={y4} r={strokeWidth} />
        </g>
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
  backgroundColor: "#ccc",
  foregroundColor: "#999",
  strokeWidth: 1,
  A: 0,
  D: 0.2,
  S: 0.2,
  R: 1
}

export default ADSR;
