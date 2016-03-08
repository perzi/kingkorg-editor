import React from 'react';

import Control from 'components/program/Control';
import { getControlParameter, willParametersChange } from 'util/component-helpers';

class VPatch extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data } = this.props;
    let nextData = nextProps.data;

    return willParametersChange(parameter, data, nextData, ["patch_source", "patch_destination", "patch_intensity"]);
  }

  render() {
    let props = this.props;

    // TODO: render dimmed if Intensity is 0, ie patch has no effect

    return (
      <tr>
        <td className="vpatch__source"><Control {...getControlParameter(props, "patch_source", "select", "")} /></td>
        <td className="vpatch__destination"><Control {...getControlParameter(props, "patch_destination", "select", "")} /></td>
        <td className="vpatch__intensity"><Control {...getControlParameter(props, "patch_intensity", "slider", "")} /></td>
      </tr>
    );
  }
}

VPatch.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parameter: React.PropTypes.object.isRequired
}

export default VPatch;
