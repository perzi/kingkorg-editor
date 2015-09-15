import Immutable   from 'immutable';
import AltInstance from 'lib/AltInstance';

class ProgramActions {

  setName(name) {
    this.dispatch(Immutable.fromJS({
      name: name
    }));
  }

  fromData(sysexData) {

    //console.log("programData.length", programData.length);

    var name = "";

    // // remove what seems to be a dummy byte
    // if (programData[15] === 0) {
    //   programData.splice(15, 1);
    // }

    // remove first bytes and the last one
    //programData.splice(0, 7);
    //programData.splice(programData.length - 1, 1);
    let programData = sysexData.slice(7, sysexData.length - 1);

    console.log("programData.length", programData.length);

    let data = [];

    for (let i = 0; i < programData.length; i++) {

      let r = i % 8; // get order

      if (r !== 0) {
        let highbits = programData[Math.floor(i / 8) * 8];
        let highbit = (highbits << (8 - r)) & 0b10000000;
        let value = highbit | programData[i];

        data.push(value);
      }
    }

    console.log(data.length);

    for (let i = 0; i < 12; i++) {
      name = name + String.fromCharCode(data[i]);
    }

    this.dispatch(Immutable.fromJS({
      data: data,
      name: name
    }));
  }
}

export default AltInstance.createActions(ProgramActions);
