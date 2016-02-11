import React from 'react';
import { Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter } from 'util/component-helpers';


class FX extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h3>FX</h3>
        <h4>Pre FX</h4>
        <Control {...getControlParameter(props, "prefx_type", "select", "")} />
        <Control {...getControlParameter(props, "prefx_sw", "pushbuttons", "")} />

        <div>// TODO: this parameter defined in *4-9 depends on selected type</div>
        <Control {...getControlParameter(props, "prefx_drivefreq", "slider", "")} />

        <h4>Mod FX</h4>
        <Control {...getControlParameter(props, "modfx_type", "select", "")} />
        <Control {...getControlParameter(props, "modfx_sw", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "modfx_depth", "slider", "")} />
        <Control {...getControlParameter(props, "modfx_speed", "slider", "")} />

        <h4>Reverb/Delay</h4>
        <Control {...getControlParameter(props, "revdly_type", "select", "")} />
        <Control {...getControlParameter(props, "revdly_sw", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "revdly_depth", "slider", "")} />

        <div>// TODO: this parameter defined in *4-10 depends on selected type</div>
        <Control {...getControlParameter(props, "revdly_time", "slider", "")} />
      </Panel>
    );
  }
};

/*




*/


FX.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FX;
