import React from 'react';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter } from 'util/component-helpers';


class Arpeggio extends React.Component {
  constructor(props) {
    super(props);
  }


  renderStepButtons() {
    let buttons = []
    let { parameter, data, onChange } = this.props;

    for (let i = 0; i < 8; i++) {

      let step = parameter.getParameter(`step_${i}`);
      let { midiId, midiSubId } = step.getMidiId();
      let offset = step.getOffset();
      let value = step.getValue(data);
      let text = step.getValueAsText(data)
      let selected = value === 1;
      let bsStyle = selected ? "primary" : "default";
      let nextValue = step.getToggleValue(data);

      let onClick = (value) => {
        onChange(offset, nextValue, midiId, midiSubId);
      }

      buttons.push(
        <Button key={i} onClick={onClick} bsStyle={bsStyle}>{text}</Button>
      )
    }

    return buttons;
  }

  render() {
    let props = this.props;

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <h3>Arpeggio</h3>
        <Control {...getControlParameter(props, "tempo", "slider", "")} />
        <Control {...getControlParameter(props, "arp_sw", "toggle", "")} />
        <Control {...getControlParameter(props, "latch", "toggle", "")} />
        <Control {...getControlParameter(props, "key_sync", "toggle", "")} />
        <Control {...getControlParameter(props, "timbre_assign", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "type", "pushbuttons", "")} />
        <Control {...getControlParameter(props, "resolution", "select", "")} />
        <Control {...getControlParameter(props, "gate_time", "slider", "")} />
        <Control {...getControlParameter(props, "swing", "slider", "")} />
        <Control {...getControlParameter(props, "last_step", "select", "")} />
        <Control {...getControlParameter(props, "octave_range", "pushbuttons", "")} />
        <div style={{color: "red"}}>
          <ButtonGroup bsSize="small">
            { this.renderStepButtons() }
          </ButtonGroup>
        </div>
      </Panel>
    );
  }
};

/*
tempo (LSB)
      (MSB)



*/


Arpeggio.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default Arpeggio;
