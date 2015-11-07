import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Param   from './param';
import Osc     from './osc';
import Control from './control';
import EG      from './eg';
import LFO     from './lfo';
import Simple  from 'components/ui/simple';

import program from 'data/program_parameters';

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

  getControlParameter(id) {
    return {
      data: this.props.data,
      parentParameter: this.props.parameter,
      id: id
    }
  }

//   getParameterProps(id) {
//     let parameter = this.props.parameter.getParameter(id);
// //    let parameter = this.props.parameter.parameters[index];
//     let data = this.props.data;
//     let offset = parameter.getOffset();
//     let props = {
//       name: parameter.name,
//       value: parameter.getValue(data),
//       text: parameter.getValueAsText(data),
//       offset: offset,
//       category: parameter.category,
//       allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
//       onChange: ((value) => {
//         this.props.onChange(offset, value);
//       }).bind(this)
//     };
//
//     return props;
//   }

  render() {
    return (
      <div className="timbre">
        <h3>{this.props.name}</h3>
        <div className="timbre__blocks">
          <div className="timbre__block">
            <b>Voice</b>
            <Control {...this.getControlParameter("voice_assign")} />
            <Control {...this.getControlParameter("unison_sw")} />
            <Control {...this.getControlParameter("unison_detune")} />
            <Control {...this.getControlParameter("unison_spread")} />
          </div>
          <div className="timbre__block">
            <b>Pitch</b>
            <Control {...this.getControlParameter("pitch_transpose")} />
            <Control {...this.getControlParameter("pitch_detune")} />
            <Control {...this.getControlParameter("pitch_lfo2modint")} />
            <Control {...this.getControlParameter("pitch_lfo2jsy")} />
            <Control {...this.getControlParameter("pitch_bendrange")} />
            <Control {...this.getControlParameter("pitch_portamento_sw")} />
            <Control {...this.getControlParameter("pitch_portamento_time")} />
            <Control {...this.getControlParameter("pitch_analog_tuning")} />
          </div>
          <div className="timbre__block">
            <b>Filter</b>
            <Control {...this.getControlParameter("type")} />
            <Control {...this.getControlParameter("cutoff")} />
            <Control {...this.getControlParameter("resonance")} />
            <Control {...this.getControlParameter("eg1_intensity")} />
            <Control {...this.getControlParameter("lfo1_mod_int")} />
            <Control {...this.getControlParameter("lfo1_js-y")} />
            <Control {...this.getControlParameter("keyboard_track")} />
            <Control {...this.getControlParameter("velocity_sens")} />
          </div>
          <div className="timbre__block">
            <b>Mixer</b>
            <Control {...this.getControlParameter("osc1_level")} />
            <Control {...this.getControlParameter("osc2_level")} />
            <Control {...this.getControlParameter("osc3_level")} />
          </div>
          <div className="timbre__block">
            <b>Amp</b>
            <Control {...this.getControlParameter("level")} />
            <Control {...this.getControlParameter("panpot")} />
            <Control {...this.getControlParameter("punch_level")} />
            <Control {...this.getControlParameter("key_track")} />
          </div>
          <div className="timbre__block">
            <b>LFO 1</b>
            <LFO {...this.getControlParameter("lfo_1")} />
          </div>
          <div className="timbre__block">
            <b>LFO 2</b>
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
            <b>EG 1 (Filter)</b>
            <EG {...this.getControlParameter("eg_1")} />
          </div>
          <div className="timbre__block">
            <b>EG 2 (Amp)</b>
            <EG {...this.getControlParameter("eg_2")} />

          </div>
        </div>
      </div>
    );
  }
};

Timbre.propTypes = {
  onChange: React.PropTypes.function
};

Timbre.defaultProps = {
  onChange: (offset, value) => { }
};


export default Timbre;
