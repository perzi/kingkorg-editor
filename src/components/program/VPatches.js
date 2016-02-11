import React from 'react';
import { Panel } from 'react-bootstrap';

import VPatch from 'components/program/VPatch';
import { getControlParameter } from 'util/component-helpers';

import 'styles/components/program/vpatches';


class VPatches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h3>VPatches</h3>
        <table className="vpatches">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Intensity</th>
            </tr>
          </thead>
          <tbody>
            <VPatch {...getControlParameter(props, "vpatch_1")} />
            <VPatch {...getControlParameter(props, "vpatch_2")} />
            <VPatch {...getControlParameter(props, "vpatch_3")} />
            <VPatch {...getControlParameter(props, "vpatch_4")} />
            <VPatch {...getControlParameter(props, "vpatch_5")} />
            <VPatch {...getControlParameter(props, "vpatch_6")} />
          </tbody>
        </table>
      </Panel>
    );
  }
};

VPatches.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default VPatches;
