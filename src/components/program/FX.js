import React from 'react';
import { Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter, willParametersChange } from 'util/component-helpers';


class FX extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data } = this.props;
    let nextData = nextProps.data;

    return willParametersChange(parameter, data, nextData, [
      "prefx_sw",
      "prefx_type",
      "prefx_drivefreq",
      "modfx_sw",
      "modfx_type",
      "modfx_depth",
      "modfx_speed",
      "revdly_sw",
      "revdly_type",
      "revdly_depth",
      "revdly_time",
    ]);
  }

  render() {
    let { props } = this;
    let { parameter, data } = props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h4>Pre FX</h4>
        <Control {...getControlParameter(props, "prefx_sw", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "prefx_type", "select", "", "prefx_sw")} />

        <div>// TODO: this parameter defined in *4-9 depends on selected type</div>
        <Control {...getControlParameter(props, "prefx_drivefreq", "slider", "", "prefx_sw")} />

        <h4>Mod FX</h4>
        <Control {...getControlParameter(props, "modfx_sw", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "modfx_type", "select", "", "modfx_sw")} />
        <Control {...getControlParameter(props, "modfx_depth", "slider", "", "modfx_sw")} />
        <Control {...getControlParameter(props, "modfx_speed", "slider", "", "modfx_sw")} />

        <h4>Reverb/Delay</h4>
        <Control {...getControlParameter(props, "revdly_sw", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "revdly_type", "select", "", "revdly_sw")} />
        <Control {...getControlParameter(props, "revdly_depth", "slider", "", "revdly_sw")} />

        <div>// TODO: this parameter defined in *4-10 depends on selected type</div>
        <Control {...getControlParameter(props, "revdly_time", "slider", "", "revdly_sw")} />
      </Panel>
    );
  }
};

FX.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FX;
