import React   from 'react/addons';
import Param   from './param';
import Osc     from './osc';

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

    console.log(this.props.data);

    return {
      title: parameter.name,
      parameterGroup: parameter,
      offset: parameter.getOffset(),
      programData: this.props.data,
      onChange: this.props.onChange
    };
  }

  handleChange(offset, value) {

  }

  render() {
    return (
      <div className="timbre">
        <h3>{this.props.name}</h3>
        <div className="timbre__oscillators">
          <Osc {...this.getOscParameter("osc_1")} />
          <Osc {...this.getOscParameter("osc_2")} />
          <Osc {...this.getOscParameter("osc_3")} />
        </div>
      </div>
    );
  }
}

export default Timbre;
