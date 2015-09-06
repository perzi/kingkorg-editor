import React from 'react';
import {RouteHandler, Link} from 'react-router';
import ProgramActions from 'actions/program_actions'
import ProgramStore            from 'stores/program_store';
import Timbre            from 'components/program/timbre';
import Param            from 'components/program/param';
import Parameter            from 'components/program/parameter';
import programData            from 'data/program';



let translation = {

  program: {

    category: {
      0: "Synth",        3: "Brass",        6: "Key",
      1: "Lead",         4: "Strings",      7: "SE/Voc",
      2: "Bass",         5: "Piano",        8: "User"
    }
  }
}



class Main extends React.Component {

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
      kingKorgPresent: false,
      program: ProgramStore.getState()
    }

    this.programChanged           = this.programChanged.bind(this);

    this.scanForDevice();
  }

  componentDidMount()    {
    ProgramStore.listen(this.programChanged);

    // DEBUG
    ProgramActions.fromData([0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x53, 0x74, 0x61, 0x62, 0x20, 0x4b, 0x69, 0x00, 0x6e, 0x67, 0x20, 0x20, 0x20, 0x00, 0x00, 0x40, 0x00, 0x3c, 0x02, 0x01, 0x04, 0x40, 0x74, 0x01, 0x7d, 0x01, 0x0d, 0x02, 0x00, 0x28, 0x0c, 0x00, 0x09, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x7f, 0x7f, 0x04, 0x00, 0x7f, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x40, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x4f, 0x00, 0x00, 0x0d, 0x00, 0x10, 0x00, 0x00, 0x07, 0x0f, 0x52, 0x00, 0x07, 0x00, 0x10, 0x18, 0x00, 0x02, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x02, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x00, 0x00, 0x0f, 0x02, 0x00, 0x00, 0x28, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x05, 0x01, 0x3c, 0x01, 0x00, 0x00, 0x00, 0x40, 0x01, 0x01, 0x3d, 0x33, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64, 0x5d, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x05, 0x02, 0x4f, 0x00, 0x08, 0x01, 0x01, 0x34, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7]);
  }

  componentWillUnmount() {
    ProgramStore.unlisten(this.programChanged);
  }

  programChanged(program)  {
    this.setState({ program: program });
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
    if (evt.data[0] !== 0xF8) {
      console.log("MIDI IN", evt.data);
    }
  }

  onKbdMessage(evt) {
    if (evt.data[0] !== 0xF8) { // internal clock
      console.log("KBD IN", evt.data);
    }

    if (evt.data[0] == 0xF0
      && evt.data[1] == 0x42 // KORG ID
      && evt.data[2] == 0x30 // channel 1
      && evt.data[3] == 0x00 // KK ID 1
      && evt.data[4] == 0x01 // KK ID 2
      && evt.data[5] == 0x18 // KK ID 3
      && evt.data[6] == 0x40 // function
    ) {
      let hexData = [];
      let data = [];

      for (let i = 0; i < evt.data.length; i++) {
        let value = evt.data[i];
        data = value;
        var s = "0x" + (value < 16 ? "0" : "") + value.toString(16);
        hexData.push(s);
      }

      console.log("PROGRAM DUMP", hexData.join(", "));
      console.log("PROGRAM DUMP", evt.data.subarray(0, 5));

      ProgramActions.fromData(evt.data);
    }
  }


  renderProgram(program) {

    let data = program.get("data").toJS();

    let parameters = programData.map((parameter, index) => {
      return (
        <Parameter key={index} parameter={parameter} programData={data}/>
      );
    });

    return (
      <div>
        {parameters}
      </div>
    );
  }

  render() {

    let {program} = this.state;
    let data = program.get("data");

    return (
      <div>
        <h1>KingKORG Editor</h1>
        <p>KK here: {this.state.kingKorgPresent ? "YES" : "NO" }</p>



        <h2>Program</h2>
        <Param value={program.get("name")} title="Name" />

        {this.renderProgram(program)}

        <hr />
        <Param value={data.get(13)} title="Category" translation={translation.program["category"]} />

        <h2>Timbre</h2>
        <Timbre data={data.slice(16, 99 + 16 + 1)} />
      </div>
    );
  }
}
        // <Link to='example'>Go to the Example page...</Link>
        // <RouteHandler />

//


export default Main;
