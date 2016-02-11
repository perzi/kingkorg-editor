import React from 'react';
import { Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter } from 'util/component-helpers';


class Arpeggio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h3>Arpeggio</h3>
        <div style={{color: "red"}}>TODO: ADD TEMPO</div>
        <Control {...getControlParameter(props, "arp_sw", "toggle", "")} />
        <Control {...getControlParameter(props, "latch", "toggle", "")} />
        <Control {...getControlParameter(props, "key_sync", "toggle", "")} />
        <div style={{color: "red"}}>TODO: TIMBRE ASSIGN VALUES</div>
        <Control {...getControlParameter(props, "type", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "resolution", "select", "")} />
        <Control {...getControlParameter(props, "gate_time", "slider", "")} />
        <Control {...getControlParameter(props, "swing", "slider", "")} />
        <Control {...getControlParameter(props, "last_step", "select", "")} />
        <Control {...getControlParameter(props, "octave_range", "pushbuttons", "")} />
        <div style={{color: "red"}}>TODO: ADD BIT CONTROL FOR ARPEGGIO ON/OFF</div>
      </Panel>
    );
  }
};

/*
tempo (LSB)
      (MSB)

        <Control {...getControlParameter(props, "timbre_assign", "select", "")} />


*/


Arpeggio.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default Arpeggio;
