import React from 'react';

import Control from 'components/program/Control';
import ADSR    from 'components/ui/ADSR';
import { getControlParameter, willParametersChange } from 'util/component-helpers';

import 'styles/components/program/eg';


class EG extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data } = this.props;
    let nextData = nextProps.data;

    return willParametersChange(parameter, data, nextData, ["attack_time", "decay_time", "sustain_level", "release_time", "level_velo_int"]);
  }

  getValue(id) {
    return this.props.parameter.getParameter(id).getValue(this.props.data) || 0;
  }

  render() {
    let props = this.props;

    let A = this.getValue("attack_time") / 127.0;
    let D = this.getValue("decay_time") / 127.0;
    let S = this.getValue("sustain_level") / 127.0;
    let R = this.getValue("release_time") / 127.0;

    return (
      <div className="eg">
        <div className="eg__adsr">
          <ADSR width={170} height={60} A={A} D={D} S={S} R={R} />
        </div>
        <div className="eg__controls">
          <Control {...getControlParameter(props, "attack_time", "slider", "")} />
          <Control {...getControlParameter(props, "decay_time", "slider", "")} />
          <Control {...getControlParameter(props, "sustain_level", "slider", "")} />
          <Control {...getControlParameter(props, "release_time", "slider", "")} />
          <Control {...getControlParameter(props, "level_velo_int", "slider", "")} />
        </div>
      </div>
    );
  }
}

EG.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parameter: React.PropTypes.object.isRequired
}

export default EG;
