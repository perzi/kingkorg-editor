import React   from 'react/addons';
import Control from './control';

class EG extends React.Component {
  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;

    return (
      <div className="lfo__controls">
        <Control id="wave" data={this.props.data} parentParameter={parameter} />
        <Control id="frequency" data={this.props.data} parentParameter={parameter} />
        <Control id="key_sync" data={this.props.data} parentParameter={parameter} />
        <Control id="tempo_sync" data={this.props.data} parentParameter={parameter} />
        <Control id="sync_note" data={this.props.data} parentParameter={parameter} />
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
