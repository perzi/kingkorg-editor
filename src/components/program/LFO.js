import React            from 'react';

import Control          from 'components/program/Control';
import { getControlParameter } from 'util/component-helpers';


class LFO extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <div className="lfo__controls">
        <Control {...getControlParameter(props, "wave", "slider", "")} />
        <Control {...getControlParameter(props, "frequency", "slider", "")} />
        <Control {...getControlParameter(props, "key_sync", "slider", "")} />
        <Control {...getControlParameter(props, "tempo_sync", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "sync_note", "slider")} />
      </div>
    );
  }
}

LFO.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parameter: React.PropTypes.object.isRequired
}

export default LFO;
