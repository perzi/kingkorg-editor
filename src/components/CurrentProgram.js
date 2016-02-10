import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setCurrentProgramName, updateCurrentProgramParam, setCurrentProgram, loadCurrentProgram } from 'actions/actions';
import Timbre from 'components/program/Timbre';
import Control from 'components/program/Control';
import KingKORGMidi, { CURRENT_PROGRAM_DATA_DUMP } from 'midi/KingKORG';
import programParameters from 'data/programParameters';


class CurrentProgram extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use another component to render programs. maybe log all program dumps and store in local storage
    this.state = {
      channel: 0,
      exampleData: [
        [0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x53, 0x74, 0x61, 0x62, 0x20, 0x4b, 0x69, 0x00, 0x6e, 0x67, 0x20, 0x20, 0x20, 0x00, 0x00, 0x40, 0x00, 0x3c, 0x02, 0x01, 0x04, 0x40, 0x74, 0x01, 0x7d, 0x01, 0x0d, 0x02, 0x00, 0x28, 0x0c, 0x00, 0x09, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x7f, 0x7f, 0x04, 0x00, 0x7f, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x40, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x4f, 0x00, 0x00, 0x0d, 0x00, 0x10, 0x00, 0x00, 0x07, 0x0f, 0x52, 0x00, 0x07, 0x00, 0x10, 0x18, 0x00, 0x02, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x02, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x00, 0x00, 0x0f, 0x02, 0x00, 0x00, 0x28, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x05, 0x01, 0x3c, 0x01, 0x00, 0x00, 0x00, 0x40, 0x01, 0x01, 0x3d, 0x33, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64, 0x5d, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x05, 0x02, 0x4f, 0x00, 0x08, 0x01, 0x01, 0x34, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7],
        [0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69, 0x63, 0x00, 0x20, 0x4c, 0x65, 0x61, 0x64, 0x01, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x01, 0x7d, 0x00, 0x0f, 0x02, 0x01, 0x09, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x7f, 0x7f, 0x02, 0x00, 0x6b, 0x13, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6c, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x7f, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x49, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x0d, 0x00, 0x10, 0x00, 0x00, 0x07, 0x0f, 0x61, 0x00, 0x07, 0x00, 0x10, 0x0a, 0x00, 0x05, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x02, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x00, 0x00, 0x0f, 0x02, 0x00, 0x00, 0x28, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x40, 0x03, 0x01, 0x2f, 0x40, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x32, 0x00, 0x08, 0x01, 0x01, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7],
        [0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x44, 0x69, 0x73, 0x74, 0x4d, 0x6f, 0x64, 0x00, 0x4c, 0x65, 0x61, 0x64, 0x20, 0x01, 0x01, 0x40, 0x00, 0x3c, 0x00, 0x00, 0x0a, 0x40, 0x74, 0x00, 0x00, 0x00, 0x0f, 0x0c, 0x01, 0x14, 0x05, 0x04, 0x19, 0x00, 0x7f, 0x25, 0x30, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x0a, 0x00, 0x47, 0x55, 0x00, 0x15, 0x15, 0x1d, 0x00, 0x08, 0x3c, 0x40, 0x00, 0x76, 0x00, 0x0d, 0x61, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x1d, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x07, 0x02, 0x0f, 0x6a, 0x00, 0x07, 0x1b, 0x18, 0x00, 0x00, 0x07, 0x10, 0x08, 0x00, 0x07, 0x28, 0x10, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x04, 0x0a, 0x40, 0x74, 0x00, 0x00, 0x0f, 0x0c, 0x00, 0x01, 0x14, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x05, 0x7f, 0x27, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x50, 0x40, 0x00, 0x76, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x03, 0x01, 0x28, 0x01, 0x00, 0x40, 0x00, 0x40, 0x05, 0x03, 0x0e, 0x24, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x04, 0x00, 0x64, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x02, 0x50, 0x00, 0x08, 0x01, 0x01, 0x2d, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7]
      ]
    }
    this.midiLog = [];

    this.midi = new KingKORGMidi(this.onKKChange.bind(this),
      this.onMidi.bind(this),
      this.onKbd.bind(this),
      this.onSysex.bind(this),
      this.onDeviceInquiry.bind(this),
      this.onDeviceSearch.bind(this)
    );
    window.kkmidi = this.midi;
  }

  componentWillMount() {
    this.midi.scanForDevice();
  }

  componentDidMount()    {
    this.props.dispatch(loadCurrentProgram(this.state.exampleData[0]));
  }

  onKKChange(newState, oldState) {
    // Callback to handle connection change
    if (newState.devicePresent && !oldState.devicePresent) {
      console.log("READY TO SYSEX!")

      // TODO: show button to connect and option to always connect automatically?
      this.midi.connectToKingKorg();
    }

    if (newState.midiOut && !oldState.midiOut) {
      console.log("MIDI OUT AVAILABLE");
    }

    if (newState.midiSound && !oldState.midiSound) {
      console.log("MIDI SOUND AVAILABLE");

      this.midi.deviceInquiry();
    }
  }

  onMidi(evt) {
    console.log("CurrentProgram.onMidi", evt);
  }

  onKbd(evt) {
    console.log("CurrentProgram.onKbd", evt);
    // TODO: listen to program change to load new data from synth
  }

  onSysex(evt) {
    console.log("CurrentProgram.onSysex", evt, evt.command, CURRENT_PROGRAM_DATA_DUMP, evt.command === CURRENT_PROGRAM_DATA_DUMP);

    // TODO: filter out if not matching midi channel?

    if (evt.command === CURRENT_PROGRAM_DATA_DUMP) {
      console.log("CurrentProgram.onSysex CURRENT_PROGRAM_DATA_DUMP", evt);
      this.props.dispatch(setCurrentProgram(evt.data));
    }
  }

  onDeviceInquiry(channel) {
    console.log("CurrentProgram.onDeviceInquiry", channel);
    this.setState({ channel });
  }

  onDeviceSearch(channel) {
    console.log("CurrentProgram.onDeviceSearch", channel);
    this.setState({ channel });
  }

  getTimbreProps(id, data) {
    let parameter = programParameters.getParameter(id);

    return {
      name: parameter.name,
      parameters: parameter.parameters,
      parameter: parameter,
      data: data,
      onChange: this.handleChange.bind(this)
    };
  }

  handleChange(offset, value, midiId, midiSubId) {
    this.props.dispatch(updateCurrentProgramParam(offset, value));

    console.log(this.state.channel, midiId, midiSubId, value);
    this.midi.parameterChange(this.state.channel, midiId, midiSubId, value);
  }

  handleGetCurrentProgram() {
    if (this.midi.state.kingKorgConnected) {
      this.midi.currentProgramDataDump(this.state.channel);
    }
  }

  render() {

    const { dispatch, currentProgram } = this.props;
    const { name, data } = currentProgram;

    let handleProgramChange = (index) => () => dispatch(loadCurrentProgram(this.state.exampleData[index]));

    return (
      <div>
        <ButtonGroup bsSize="xsmall">
          <Button onClick={handleProgramChange(0)}>Stab King</Button>
          <Button onClick={handleProgramChange(1)}>Classic Lead</Button>
          <Button onClick={handleProgramChange(2)}>DistModLead</Button>
        </ButtonGroup>

        <Button bsSize="xsmall" onClick={this.handleGetCurrentProgram.bind(this)}>Get Current Program</Button>


        <h2>{name}</h2>
        <Timbre {...this.getTimbreProps("timbre_a", data) } />
        <Timbre {...this.getTimbreProps("timbre_b", data)} />
      </div>
    );


  }

}


function selectPropsFromStore(state) {
  return {
    currentProgram: state.currentProgram
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(selectPropsFromStore)(CurrentProgram);
