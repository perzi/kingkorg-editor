import React from 'react';

import Osc     from 'components/program/Osc';
import Control from 'components/program/Control';
import EG      from 'components/program/EG';
import LFO     from 'components/program/LFO';
import Simple  from 'components/ui/Simple';
import { getControlParameter } from 'util/component-helpers';

import 'styles/components/program/timbre';


class Timbre extends React.Component {
  constructor(props) {
    super(props);
  }

  getOscParameter(id) {
    let parameter = this.props.parameter.getParameter(id);
    return {
      title: parameter.name,
      parameter: parameter,
      offset: parameter.getOffset(),
      data: this.props.data,
      onChange: this.props.onChange
    };
  }

  render() {
    let props = this.props;

    return (
      <div className="timbre">
        <h3>{this.props.name}</h3>
        <div className="timbre__blocks">
          <div className="timbre__block">
            <h4 className="timbre__block-title">Voice</h4>
            <Control {...getControlParameter(props, "voice_assign", "pushbuttons", "")} />
            <Control {...getControlParameter(props, "unison_sw", "pushbuttons", "")} />
            <Control {...getControlParameter(props, "unison_detune", "slider", "")} />
            <Control {...getControlParameter(props, "unison_spread", "slider", "")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Pitch</h4>
            <Control {...getControlParameter(props, "pitch_transpose", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_detune", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_lfo2modint", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_lfo2jsy", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_bendrange", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_portamento_sw", "pushbuttons")} />
            <Control {...getControlParameter(props, "pitch_portamento_time", "slider", "")} />
            <Control {...getControlParameter(props, "pitch_analog_tuning", "slider", "")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Filter</h4>
            <Control {...getControlParameter(props, "type")} />
            <Control {...getControlParameter(props, "cutoff", "slider", "")} />
            <Control {...getControlParameter(props, "resonance", "slider", "")} />
            <Control {...getControlParameter(props, "eg1_intensity", "slider", "")} />
            <Control {...getControlParameter(props, "lfo1_mod_int", "slider", "")} />
            <Control {...getControlParameter(props, "lfo1_js-y", "slider", "")} />
            <Control {...getControlParameter(props, "keyboard_track", "slider", "")} />
            <Control {...getControlParameter(props, "velocity_sens", "slider", "")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Mixer</h4>
            <Control {...getControlParameter(props, "osc1_level", "slider", "")} />
            <Control {...getControlParameter(props, "osc2_level", "slider", "")} />
            <Control {...getControlParameter(props, "osc3_level", "slider", "")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Amp</h4>
            <Control {...getControlParameter(props, "level", "slider", "")} />
            <Control {...getControlParameter(props, "panpot", "slider", "")} />
            <Control {...getControlParameter(props, "punch_level", "slider", "")} />
            <Control {...getControlParameter(props, "key_track", "slider", "")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">LFO 1</h4>
            <LFO {...getControlParameter(props, "lfo_1")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">LFO 2</h4>
            <LFO {...getControlParameter(props, "lfo_2")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Oscillator 1</h4>
            <Osc {...this.getOscParameter("osc_1")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Oscillator 2</h4>
            <Osc {...this.getOscParameter("osc_2")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">Oscillator 3</h4>
            <Osc {...this.getOscParameter("osc_3")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">EG 1 (Filter)</h4>
            <EG {...getControlParameter(props, "eg_1")} />
          </div>
          <div className="timbre__block">
            <h4 className="timbre__block-title">EG 2 (Amp)</h4>
            <EG {...getControlParameter(props, "eg_2")} />
          </div>
        </div>
      </div>
    );
  }
};

Timbre.propTypes = {
  onChange: React.PropTypes.func
};

Timbre.defaultProps = {
  onChange: (offset, value) => { }
};


export default Timbre;
