import React            from 'react';

import Control          from 'components/program/Control';
import { getControlParameter } from 'util/component-helpers';


class LFO extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let data = this.props.data;
    let nextData = nextProps.data;

    return this.willParameterChange("wave", data, nextData) ||
      this.willParameterChange("tempo_sync", data, nextData) ||
      this.willParameterChange("key_sync", data, nextData) ||
      this.willParameterChange("sync_note", data, nextData) ||
      this.willParameterChange("frequency", data, nextData);
  }

  willParameterChange(propertyId, data, nextData) {
    let parameter = this.props.parameter.getParameter(propertyId);
    return parameter.getValue(data) !== parameter.getValue(nextData);
  }

  render() {
    let props = this.props;
    let { data, parameter } = props;

    let syncParameter = parameter.getParameter("tempo_sync");
    let syncValue = syncParameter.getValue(data);
    let isSynced = syncValue === 1;
    let freqControl = null;
    let syncControl = null;

    if (isSynced) {
      syncControl = <Control {...getControlParameter(props, "sync_note", "slider")} />;
    } else {
      freqControl = <Control {...getControlParameter(props, "frequency", "slider", "")} />;
    }

    return (
      <div className="lfo__controls">
        <Control {...getControlParameter(props, "wave", "slider", "")} />
        <Control {...getControlParameter(props, "tempo_sync", "pushbuttons", "")} />
        {freqControl}
        {syncControl}
        <Control {...getControlParameter(props, "key_sync", "slider", "")} />
      </div>
    );
  }
}

LFO.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parameter: React.PropTypes.object.isRequired
}

export default LFO;
