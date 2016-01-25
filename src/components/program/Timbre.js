import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Osc     from 'components/program/Osc';
import Control from 'components/program/Control';
import EG      from 'components/program/EG';
import LFO     from 'components/program/LFO';
import Simple  from 'components/ui/Simple';

import 'styles/components/program/timbre';


class Timbre extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
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

  getControlParameter(id, type = "select") {
    return {
      data: this.props.data,
      parentParameter: this.props.parameter,
      id,
      type
    }
  }

  render() {
    return (
      <div className="timbre">
        <h3>{this.props.name}</h3>
        <div className="timbre__blocks">
          <div className="timbre__block">
            <h4>Voice</h4>
            <Control {...this.getControlParameter("voice_assign", "select")} />
            <Control {...this.getControlParameter("unison_sw", "select")} />
            <Control {...this.getControlParameter("unison_detune", "knob")} />
            <Control {...this.getControlParameter("unison_spread", "knob")} />
          </div>
          <div className="timbre__block">
            <h4>Pitch</h4>
            <Control {...this.getControlParameter("pitch_transpose", "knob")} />
            <Control {...this.getControlParameter("pitch_detune", "knob")} />
            <Control {...this.getControlParameter("pitch_lfo2modint", "knob")} />
            <Control {...this.getControlParameter("pitch_lfo2jsy", "knob")} />
            <Control {...this.getControlParameter("pitch_bendrange")} />
            <Control {...this.getControlParameter("pitch_portamento_sw")} />
            <Control {...this.getControlParameter("pitch_portamento_time", "knob")} />
            <Control {...this.getControlParameter("pitch_analog_tuning", "knob")} />
          </div>
          <div className="timbre__block">
            <h4>Filter</h4>
            <Control {...this.getControlParameter("type", "select")} />
            <Control {...this.getControlParameter("cutoff", "knob")} />
            <Control {...this.getControlParameter("resonance", "knob")} />
            <Control {...this.getControlParameter("eg1_intensity", "cknob")} />
            <Control {...this.getControlParameter("lfo1_mod_int", "cknob")} />
            <Control {...this.getControlParameter("lfo1_js-y", "cknob")} />
            <Control {...this.getControlParameter("keyboard_track", "cknob")} />
            <Control {...this.getControlParameter("velocity_sens", "cknob")} />
          </div>
          <div className="timbre__block">
            <h4>Mixer</h4>
            <Control {...this.getControlParameter("osc1_level", "knob")} />
            <Control {...this.getControlParameter("osc2_level", "knob")} />
            <Control {...this.getControlParameter("osc3_level", "knob")} />
          </div>
          <div className="timbre__block">
            <h4>Amp</h4>
            <Control {...this.getControlParameter("level", "knob")} />
            <Control {...this.getControlParameter("panpot", "knob")} />
            <Control {...this.getControlParameter("punch_level", "knob")} />
            <Control {...this.getControlParameter("key_track", "knob")} />
          </div>
          <div className="timbre__block">
            <h4>LFO 1</h4>
            <LFO {...this.getControlParameter("lfo_1")} />
          </div>
          <div className="timbre__block">
            <h4>LFO 2</h4>
            <LFO {...this.getControlParameter("lfo_2")} />
          </div>
        </div>
        <div className="timbre__blocks">
          <div className="timbre__oscillators-title"><div>Oscillators</div></div>
          <div className="timbre__oscillators">
            <Osc {...this.getOscParameter("osc_1")} />
            <Osc {...this.getOscParameter("osc_2")} />
            <Osc {...this.getOscParameter("osc_3")} />
          </div>
          <div className="timbre__block">
            <h4>EG 1 (Filter)</h4>
            <EG {...this.getControlParameter("eg_1")} />
          </div>
          <div className="timbre__block">
            <h4>EG 2 (Amp)</h4>
            <EG {...this.getControlParameter("eg_2")} />

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
