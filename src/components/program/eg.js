import React          from 'react/addons';
import Control        from './control';

import 'styles/components/program/eg';

class EG extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {
    // TODO: add props to render different type of controls
    let parameter = this.props.parentParameter.getParameter(this.props.id);

    return (
      <div className="eg">
        <div className="eg__adsr">
          Display ADSR
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
