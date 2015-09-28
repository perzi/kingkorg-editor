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
            <h4>Filter + EG1</h4>
          </div>
          <div className="timbre__block">
            <h4>Amp + EG2 + Pan</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Timbre;
