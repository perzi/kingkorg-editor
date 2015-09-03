import Immutable   from 'immutable';
import AltInstance from 'lib/AltInstance';

class ProgramActions {

  setName(name) {
    this.dispatch(Immutable.fromJS({
      name: name
    }));
  }

  fromData(data) {

    var name = "";
    let dataToUse = data.subarray ? data.subarray(8) : data.slice(8); // TODO: remove overhead som other way?
    let programData = []

    // convert to array
    for (let i = 0; i < dataToUse.length; i++) {
      programData.push(dataToUse[i]);
    }

    for (let i = 0; i < 12; i++) {
      name = name + String.fromCharCode(programData[i]);
    }

    this.dispatch(Immutable.fromJS({
      data: programData,
      name: name
    }));
  }
}

export default AltInstance.createActions(ProgramActions);
