import React from 'react';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Control from 'components/program/Control';
import { getControlParameter, willParametersChange } from 'util/component-helpers';


class Arpeggio extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data } = this.props;
    let nextData = nextProps.data;

    return willParametersChange(parameter, data, nextData, [
      "arp_sw",
      "tempo",
      "latch",
      "key_sync",
      "timbre_assign",
      "type",
      "resolution",
      "gate_time",
      "swing",
      "last_step",
      "octave_range",
    ]);
  }

  renderStepButtons(disabled) {
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
        <Button key={i} onClick={onClick} bsStyle={bsStyle} disabled={disabled}>{text}</Button>
      )
    }

    return buttons;
  }

  render() {
    let props = this.props;
    let { data } = props;

    let arpProp = props.parameter.getParameter("arp_sw");
    let arpSw = arpProp.getValue(data);
    let disabled = !arpSw;
    let labelDisabledClassName = disabled ? "pushbuttons__label--disabled" : "";

    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
        <Control {...getControlParameter(props, "arp_sw", "toggle", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "tempo", "slider", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "latch", "toggle", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "key_sync", "toggle", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "timbre_assign", "pushbuttons", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "type", "pushbuttons", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "resolution", "select", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "gate_time", "slider", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "swing", "slider", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "last_step", "select", "")} />
        <Control disabled={disabled} {...getControlParameter(props, "octave_range", "pushbuttons", "")} />
        <div className="pushbuttons">
          <label className={`pushbuttons__label ${labelDisabledClassName}`}>Steps</label>
          <ButtonGroup bsSize="xsmall" disabled={disabled}>
            { this.renderStepButtons(disabled) }
          </ButtonGroup>
        </div>
      </Panel>
    );
  }
};


Arpeggio.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default Arpeggio;
