import Immutable   from 'immutable';
import AltInstance from 'lib/AltInstance';

window.Immutable = Immutable;

class ProgramActions {

  setName(name) {
    this.dispatch(Immutable.fromJS({
      name: name
    }));
  }

  updateParam(offset, value) {
    this.dispatch({
      index: offset,
      value: value
    });
  }

  fromData(sysexData) {

    var name = "";

    // remove first bytes and the last one
    let programData = sysexData.slice(7, sysexData.length - 1);

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
