import React   from 'react/addons';
import Param   from './param';
import Osc     from './osc';
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

  getParameterProps(id) {
    let parameter = this.props.parameter.getParameter(id);
//    let parameter = this.props.parameter.parameters[index];
    let data = this.props.data;
    let offset = parameter.getOffset();
    let props = {
      name: parameter.name,
      value: parameter.getValue(data),
      text: parameter.getValueAsText(data),
      offset: offset,
      category: parameter.category,
      allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
      onChange: ((value) => {
        this.props.onChange(offset, value);
      }).bind(this)
    };

    return props;
  }

  render() {
    return (
      <div className="timbre">
        <h3>{this.props.name}</h3>
        <div className="timbre__blocks">
          <div className="timbre__block">
            <b>Voice</b>
            <Simple {...this.getParameterProps("voice_assign")} />
            <Simple {...this.getParameterProps("unison_sw")} />
            <Simple {...this.getParameterProps("unison_detune")} />
            <Simple {...this.getParameterProps("unison_spread")} />
          </div>
          <div className="timbre__block">
            <b>Pitch</b>
            <Simple {...this.getParameterProps("pitch_transpose")} />
            <Simple {...this.getParameterProps("pitch_detune")} />
            <Simple {...this.getParameterProps("pitch_lfo2modint")} />
            <Simple {...this.getParameterProps("pitch_lfo2jsy")} />
            <Simple {...this.getParameterProps("pitch_bendrange")} />
            <Simple {...this.getParameterProps("pitch_portamento_sw")} />
            <Simple {...this.getParameterProps("pitch_portamento_time")} />
            <Simple {...this.getParameterProps("pitch_analog_tuning")} />
          </div>
          <div className="timbre__block">
            <b>Filter</b>
            <Simple {...this.getParameterProps("filter_type")} />
            <Simple {...this.getParameterProps("filter_cutoff")} />
            <Simple {...this.getParameterProps("filter_resonance")} />
            <Simple {...this.getParameterProps("filter_eg1int")} />
            <Simple {...this.getParameterProps("filter_lfo1modint")} />
            <Simple {...this.getParameterProps("filter_lfo1jsy")} />
            <Simple {...this.getParameterProps("filter_keytrack")} />
            <Simple {...this.getParameterProps("filter_velocitysens")} />
          </div>
          <div className="timbre__block">
            <b>Amp</b>
            <Simple {...this.getParameterProps("amp_level")} />
            <Simple {...this.getParameterProps("amp_pan")} />
            <Simple {...this.getParameterProps("amp_punch")} />
            <Simple {...this.getParameterProps("amp_keytrack")} />
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
            <b>Mixer</b>
            <Simple {...this.getParameterProps("osc1_level")} />
            <Simple {...this.getParameterProps("osc2_level")} />
            <Simple {...this.getParameterProps("osc3_level")} />
          </div>
          <div className="timbre__block">
            <b>Filter + EG1</b>


          </div>
          <div className="timbre__block">
            <b>Amp + EG2 + Pan</b>


          </div>
        </div>
      </div>
    );
  }
}

export default Timbre;
