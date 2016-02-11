import React from 'react';
import { Panel } from 'react-bootstrap';

import VPatch from 'components/program/VPatch';
import { getControlParameter } from 'util/component-helpers';

class VPatches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h3>VPatches</h3>

        <h4>VPatch 1</h4>
        <VPatch {...getControlParameter(props, "vpatch_1")} />

        <h4>VPatch 2</h4>
        <VPatch {...getControlParameter(props, "vpatch_2")} />

        <h4>VPatch 3</h4>
        <VPatch {...getControlParameter(props, "vpatch_3")} />

        <h4>VPatch 4</h4>
        <VPatch {...getControlParameter(props, "vpatch_4")} />

        <h4>VPatch 5</h4>
        <VPatch {...getControlParameter(props, "vpatch_5")} />

        <h4>VPatch 6</h4>
        <VPatch {...getControlParameter(props, "vpatch_6")} />

      </Panel>
    );
  }
};

VPatches.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default VPatches;
