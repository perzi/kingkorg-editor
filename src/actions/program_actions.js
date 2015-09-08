import Immutable   from 'immutable';
import AltInstance from 'lib/AltInstance';

class ProgramActions {

  setName(name) {
    this.dispatch(Immutable.fromJS({
      name: name
    }));
  }

  fromData(programData) {

    var name = "";

    // remove what seems to be a dummy byte
    if (programData[15] === 0) {
      programData.splice(15, 1);
    }
    // remove first bytes
    programData.splice(0, 8);

    for (let i = 0; i < 12; i++) {
      if (programData[i] !== 0)
        name = name + String.fromCharCode(programData[i]);
    }

    this.dispatch(Immutable.fromJS({
      data: programData,
      name: name
    }));
  }
}

export default AltInstance.createActions(ProgramActions);
