import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';


class ADSR extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  calculatePoints() {

    const { A, D, S, R, width, height, strokeWidth } = this.props;
    const offset = strokeWidth * 2;
    const w = width - offset * 2;
    const h = height - offset * 2;
    const w3 = Math.round(w / 3);

    const x0 = 0;
    const y0 = 0;
    const x1 = A;
    const y1 = 1.0;
    const x2 = D + A;
    const y2 = S;
    const x3 = 2.0;
    const y3 = S;
    const x4 = 2.0 + R;
    const y4 = 0;
    const normalizedPoints = [
      [x0, y0],
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4]
    ];

    const scaledPoints = normalizedPoints.map(([x, y]) => [Math.round(x * w3) + offset, height - Math.round(y * h) - offset])

    return scaledPoints;
  }

  render() {

    const { width, height, strokeWidth, backgroundColor, foregroundColor } = this.props;
    const cpoints = this.calculatePoints();
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3], [x4, y4]] = cpoints;

    const d = `M ${x0} ${y0}
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
