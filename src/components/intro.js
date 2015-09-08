//import React from 'react';
import React          from 'react/addons';

import ProgramActions from 'actions/program_actions'
import ProgramStore   from 'stores/program_store';

import KingKORG           from 'components/kingkorg';
import ProgramDump        from 'components/program/program_dump';

class Intro extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      program: ProgramStore.getState()
    }

    this.programChanged = this.programChanged.bind(this);

    this.midiLog = [];
  }

  componentDidMount()    {
    ProgramStore.listen(this.programChanged);
  }

  componentWillUnmount() {
    ProgramStore.unlisten(this.programChanged);
  }

  programChanged(program)  {
    this.setState({ program: program });
  }

  Uint8ArrToArray(Uint8Arr) {
    let data = [];
    for (let i = 0; i < Uint8Arr.length; i++) {
      data.push(Uint8Arr[i]);
    }
    return data;
  }

  handleMidiMessage(evt) {
    if (evt.data[0] !== 0xF8) {
      console.log("MIDI IN!", evt.data);
    }
  }

  handleKbdMessage(evt) {
    if (evt.data[0] === 0xF8) { // internal clock
      return;
    }

    console.log("KBD IN!", evt.data);
    let data = this.Uint8ArrToArray(evt.data);

    this.midiLog.push(data);

    // only store last 3 messages
    if (this.midiLog.length > 3) this.midiLog.splice(0, 1);

    if (data[0] == 0xF0
      && data[1] == 0x42 // KORG ID
      && data[2] == 0x30 // channel 1
      && data[3] == 0x00 // KK ID 1
      && data[4] == 0x01 // KK ID 2
      && data[5] == 0x18 // KK ID 3
      && data[6] == 0x40 // function
    ) {
      // covert and log hex data
      let hexData = data.map((value) => {
        return "0x" + (value < 16 ? "0" : "") + value.toString(16);
      });
      console.log("PROGRAM DUMP", hexData.join(", "));

      // trigger action
      ProgramActions.fromData(data);
    }
  }

  render() {
    let {program} = this.state;

    return (
      <div>
          <h2>Intro</h2>
          <KingKORG
            onMidiMessage={this.handleMidiMessage.bind(this)}
            onKbdMessage={this.handleKbdMessage.bind(this)}
          />
          <ProgramDump program={program} />
      </div>
    );
  }
}

export default Intro;
