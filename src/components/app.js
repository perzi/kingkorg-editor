import React from 'react';
import {RouteHandler, Link} from 'react-router';
import ProgramActions from 'actions/program_actions'
import ProgramStore            from 'stores/program_store';
import Timbre            from 'components/program/timbre';
import Param            from 'components/program/param';
import Parameter            from 'components/program/parameter';
import programData            from 'data/program';


class App extends React.Component {

  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      midiAccess: null,
      midiIn: null,
      midiKbd: null,
      hasScanned: false,
      canConnect: false,
      kingKorgPresent: false
    }

    this.scanForDevice();
  }

  scanForDevice() {
    navigator.requestMIDIAccess({ sysex: true }).then(
      (midiAccess) => {
        this.setState({
          midiAccess: midiAccess,
          scanned: true,
          canConnect: true
        });

        this.scanForTheKing();
      },
      () => {
        this.setState({
          scanned: true,
          canConnect: false 
        });
      }
    );
  }

  scanForTheKing() {
    let inputs = [];

    this.state.midiAccess.inputs.forEach((input) => {
      console.log(input.name);

      if (input.name === "KingKORG MIDI IN") {
        input.open().then(() => {
          this.setState({
            midiIn: input,
            kingKorgPresent: true
          });

          input.onmidimessage = this.onMidiMessage.bind(this);
        });
      }
      if (input.name === "KingKORG KBD/KNOB") {
        input.open().then(() => {
          this.setState({
            midiKbd: input,
            kingKorgPresent: true
          });

          input.onmidimessage = this.onKbdMessage.bind(this);
        });
      }
    });
  }

  onMidiMessage(evt) {
    if (evt.data[0] !== 0xF8) {
      console.log("MIDI IN", evt.data);
    }
  }

  onKbdMessage(evt) {
    if (evt.data[0] !== 0xF8) { // internal clock
      console.log("KBD IN", evt.data);
    }
  }

  render() {

    return (
      <div>
        <h1>KingKORG Editor</h1>
        <RouteHandler />
      </div>
    );
  }
}


export default App;
