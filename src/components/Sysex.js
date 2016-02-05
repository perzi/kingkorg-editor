import React        from 'react';
import { Button }   from 'react-bootstrap';

import KingKORGMidi from 'midi/KingKORG';

function Uint8ArrToArray(Uint8Arr) {
  let data = [];
  for (let i = 0; i < Uint8Arr.length; i++) {
    data.push(Uint8Arr[i]);
  }
  return data;
}


class Sysex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      midiData: [],
      kbdData: []
    }

    this.midi = new KingKORGMidi(this.onKKChange.bind(this), this.onMidi.bind(this), this.onKbd.bind(this));

    window.kkmidi = this.midi;

    this.midi.scanForDevice();
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
    }
  }

  onMidi(evt) {
    console.log("onMidi", evt);

    // TODO: dispatch actions and keep track of data
    this.setState({ midiData: [...this.state.midiData, evt.data]});
  }

  onKbd(evt) {
    console.log("onKbd", evt.data);

    // TODO: dispatch actions
    this.setState({ kbdData: [...this.state.kbdData, evt.data] });
  }

  intArrayToHexString(data) {
    let hexData = data.map((value) => {
      return (value < 16 ? "0" : "") + value.toString(16);
    });
    return hexData;
  }

  renderMidiData() {
    return this.state.midiData.map((data, index) => {
      let hexData = this.intArrayToHexString(data);
      return <div key={index}>[{hexData.join(", ")}]</div>
    });
  }

  renderKbdData() {
    return this.state.kbdData.map((data, index) => {
      let hexData = this.intArrayToHexString(data);
      return <div key={index}>[{hexData.join(", ")}]</div>
    }, this);
  }

  render() {

    return (
      <div>

        <h2>KingKORG MIDI</h2>

        <h3>Last MIDI</h3>
        <div>{ this.renderMidiData() }</div>

        <h3>Last keyboard</h3>
        <div>{ this.renderKbdData() }</div>

      </div>
    );
  }
}


// Wrap the component to inject dispatch and state into it
export default Sysex;
