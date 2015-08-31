import Immutable   from 'immutable';
import AltInstance from 'lib/AltInstance';

class ProgramActions {

  setName(name) { 
    this.dispatch(Immutable.fromJS({
      name: name
    }));
  }
}

export default AltInstance.createActions(ProgramActions);
