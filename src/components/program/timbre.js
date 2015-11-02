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
            <Control {...this.getControlParameter("filter_type")} />
            <Control {...this.getControlParameter("filter_cutoff")} />
            <Control {...this.getControlParameter("filter_resonance")} />
            <Control {...this.getControlParameter("filter_eg1int")} />
            <Control {...this.getControlParameter("filter_lfo1modint")} />
            <Control {...this.getControlParameter("filter_lfo1jsy")} />
            <Control {...this.getControlParameter("filter_keytrack")} />
            <Control {...this.getControlParameter("filter_velocitysens")} />
          </div>
          <div className="timbre__block">
            <b>Mixer</b>
            <Control {...this.getControlParameter("osc1_level")} />
            <Control {...this.getControlParameter("osc2_level")} />
            <Control {...this.getControlParameter("osc3_level")} />
          </div>
          <div className="timbre__block">
            <b>Amp</b>
            <Control {...this.getControlParameter("amp_level")} />
            <Control {...this.getControlParameter("amp_pan")} />
            <Control {...this.getControlParameter("amp_punch")} />
            <Control {...this.getControlParameter("amp_keytrack")} />
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
