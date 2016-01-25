import React from 'react';


class KingKORG extends React.Component {

  constructor(props) {
    super(props);
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

  componentWillUnmount() {
    // TODO: close connections and remove references
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
    this.props.onMidiMessage(evt);
  }

  onKbdMessage(evt) {
    this.props.onKbdMessage(evt);
  }

  render() {
    // Maybe render connection info
    return false;
  }
}

KingKORG.propTypes = {
  onMidiMessage: React.PropTypes.func,
  onKbdMessage: React.PropTypes.func
};

KingKORG.defaultProps = {
  onMidiMessage: () => {},
  onKbdMessage: () => {}
}


export default KingKORG;
