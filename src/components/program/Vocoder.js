import React from 'react';
import { Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter, willParametersChange } from 'util/component-helpers';


class Vocoder extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data } = this.props;
    let nextData = nextProps.data;

    return willParametersChange(parameter, data, nextData, [
      "sw",
      "timbrea_level",
      "timbreb_level",
      "audio_source",
      "gate_sens",
      "threshold",
      "hpf_level",
      "hpf_gate",
      "formanto_shift",
      "fc_offset",
      "resonance",
      "fc_mod_source",
      "fc_mod_intensity",
      "efsens",
      "band_1",
      "band_2",
      "band_3",
      "band_4",
      "band_5",
      "band_6",
      "band_7",
      "band_8",
      "band_9",
      "band_10",
      "band_11",
      "band_12",
      "band_13",
      "band_14",
      "band_15",
      "band_16",
    ]);
  }

  render() {
    let { props } = this;
    let { parameter, data } = props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <Control {...getControlParameter(props, "sw", "toggle", "")} />
        <Control {...getControlParameter(props, "timbrea_level", "slider", "")} />
        <Control {...getControlParameter(props, "timbreb_level", "slider", "")} />
        <Control {...getControlParameter(props, "audio_source", "toggle", "")} />
        <Control {...getControlParameter(props, "gate_sens", "slider", "")} />
        <Control {...getControlParameter(props, "threshold", "slider", "")} />
        <Control {...getControlParameter(props, "hpf_level", "slider", "")} />
        <Control {...getControlParameter(props, "hpf_gate", "toggle", "")} />
        <Control {...getControlParameter(props, "formanto_shift", "slider", "")} />
        <Control {...getControlParameter(props, "fc_offset", "slider", "")} />
        <Control {...getControlParameter(props, "resonance", "slider", "")} />
        <Control {...getControlParameter(props, "fc_mod_source", "select", "")} />
        <Control {...getControlParameter(props, "fc_mod_intensity", "slider", "")} />
        <Control {...getControlParameter(props, "efsens", "slider", "")} />

        <Control {...getControlParameter(props, "band_1", "slider", "")} />
        <Control {...getControlParameter(props, "band_2", "slider", "")} />
        <Control {...getControlParameter(props, "band_3", "slider", "")} />
        <Control {...getControlParameter(props, "band_4", "slider", "")} />
        <Control {...getControlParameter(props, "band_5", "slider", "")} />
        <Control {...getControlParameter(props, "band_6", "slider", "")} />
        <Control {...getControlParameter(props, "band_7", "slider", "")} />
        <Control {...getControlParameter(props, "band_8", "slider", "")} />
        <Control {...getControlParameter(props, "band_9", "slider", "")} />
        <Control {...getControlParameter(props, "band_10", "slider", "")} />
        <Control {...getControlParameter(props, "band_11", "slider", "")} />
        <Control {...getControlParameter(props, "band_12", "slider", "")} />
        <Control {...getControlParameter(props, "band_13", "slider", "")} />
        <Control {...getControlParameter(props, "band_14", "slider", "")} />
        <Control {...getControlParameter(props, "band_15", "slider", "")} />
        <Control {...getControlParameter(props, "band_16", "slider", "")} />
      </Panel>
    );
  }
};


Vocoder.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default Vocoder;
