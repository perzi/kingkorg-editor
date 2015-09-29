import React   from 'react/addons';
import Param   from './param';
import Osc     from './osc';
import Control from './control';
import EG      from './eg';
import Simple  from 'components/ui/simple';

import program from 'data/program_parameters';

import 'styles/components/program/timbre';


class Timbre extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
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
            <Control data={this.props.data} id="voice_assign" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="unison_sw" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="unison_detune" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="unison_spread" parentParameter={this.props.parameter} />
          </div>
          <div className="timbre__block">
            <b>Pitch</b>
            <Control data={this.props.data} id="pitch_transpose" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_detune" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_lfo2modint" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_lfo2jsy" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_bendrange" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_portamento_sw" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_portamento_time" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="pitch_analog_tuning" parentParameter={this.props.parameter} />
          </div>
          <div className="timbre__block">
            <b>Filter</b>
            <Control data={this.props.data} id="filter_type" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_cutoff" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_resonance" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_eg1int" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_lfo1modint" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_lfo1jsy" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_keytrack" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="filter_velocitysens" parentParameter={this.props.parameter} />
          </div>
          <div className="timbre__block">
            <b>Mixer</b>
            <Control data={this.props.data} id="osc1_level" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="osc2_level" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="osc3_level" parentParameter={this.props.parameter} />
          </div>
          <div className="timbre__block">
            <b>Amp</b>
            <Control data={this.props.data} id="amp_level" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="amp_pan" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="amp_punch" parentParameter={this.props.parameter} />
            <Control data={this.props.data} id="amp_keytrack" parentParameter={this.props.parameter} />
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
            <b>Filter + EG1</b>
            <EG data={this.props.data} id="eg_1" parentParameter={this.props.parameter} />


          </div>
          <div className="timbre__block">
            <b>Amp + EG2 + Pan</b>
            <EG data={this.props.data} id="eg_2" parentParameter={this.props.parameter} />

          </div>
        </div>
      </div>
    );
  }
}

export default Timbre;
