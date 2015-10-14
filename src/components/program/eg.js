import React   from 'react/addons';
import Control from './control';
import ADSR    from 'components/ui/adsr';

import 'styles/components/program/eg';

class EG extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  calculateChildValue(parentParameter, id) {
    let parameter = parentParameter.getParameter(id);
    let data = this.props.data;
    let value = parameter.getValue(data) || 0;

    return value / 127.0;
  }

  render() {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;

    let A = this.calculateChildValue(parameter, "attack");
    let D = this.calculateChildValue(parameter, "decay");
    let S = this.calculateChildValue(parameter, "sustain");
    let R = this.calculateChildValue(parameter, "release");

    return (
      <div className="eg">
        <div className="eg__adsr">
          <ADSR width={240} height={80} A={A} D={D} S={S} R={R}/>
        </div>
        <div className="eg__controls">
          <Control id="attack" data={this.props.data} parentParameter={parameter} />
          <Control id="decay" data={this.props.data} parentParameter={parameter} />
          <Control id="sustain" data={this.props.data} parentParameter={parameter} />
          <Control id="release" data={this.props.data} parentParameter={parameter} />
          <Control id="lvl_velo_int" data={this.props.data} parentParameter={parameter} />
        </div>
      </div>
    );
  }
}

EG.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  parentParameter: React.PropTypes.object.isRequired
}

export default EG;
