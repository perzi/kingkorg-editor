//import React from 'react';
import React                    from 'react/addons';
import KingKORG                 from 'components/kingkorg';

class Intro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleMidiMessage(evt) {
    if (evt.data[0] !== 0xF8) {
      console.log("MIDI IN!", evt.data);
    }
  }

  handleKbdMessage(evt) {
    if (evt.data[0] !== 0xF8) { // internal clock
      console.log("KBD IN!", evt.data);
    }
  }

  render() {
    return (
      <div>
          <h2>Intro</h2>
          <KingKORG onMidiMessage={this.handleMidiMessage} onKbdMessage={this.handleKbdMessage}/>
      </div>
    );
  }
}

export default Intro;
