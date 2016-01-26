import React from 'react';

import Control from 'components/program/Control';
import ADSR    from 'components/ui/ADSR';

import 'styles/components/program/eg';


class EG extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;
    let nextData = nextProps.data;

    let ADSR = this.getChildValues(parameter, data);
    let nextADSR = this.getChildValues(parameter, nextData);

    return ADSR.A !== nextADSR.A
      || ADSR.D !== nextADSR.D
      || ADSR.S !== nextADSR.S
      || ADSR.R !== nextADSR.R;
  }


  getChildValue(parentParameter, data, id) {
    let parameter = parentParameter.getParameter(id);
    let value = parameter.getValue(data) || 0;
    return value;
  }

  getChildValues(parentParameter, data) {
    return {
      A: this.getChildValue(parentParameter, data, "attack_time"),
      D: this.getChildValue(parentParameter, data, "decay_time"),
      S: this.getChildValue(parentParameter, data, "sustain_level"),
      R: this.getChildValue(parentParameter, data, "release_time")
    }
  }

  render() {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;
    let adsr = this.getChildValues(parameter, data);

    let A = adsr.A / 127.0;
    let D = adsr.D / 127.0;
    let S = adsr.S / 127.0;
    let R = adsr.R / 127.0;

    return (
      <div className="eg">
        <div className="eg__adsr">
          <ADSR width={240} height={80} A={A} D={D} S={S} R={R} />
        </div>
        <div className="eg__controls">
          <Control id="attack_time" data={this.props.data} parentParameter={parameter} type="knob" />
          <Control id="decay_time" data={this.props.data} parentParameter={parameter} type="knob" />
          <Control id="sustain_level" data={this.props.data} parentParameter={parameter} type="knob" />
          <Control id="release_time" data={this.props.data} parentParameter={parameter} type="knob" />
          <Control id="level_velo_int" data={this.props.data} parentParameter={parameter} type="knob" />
        </div>
      </div>
    );
  }
}

EG.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parentParameter: React.PropTypes.object.isRequired
}

export default EG;
