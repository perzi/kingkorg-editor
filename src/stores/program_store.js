import ImmutableStore from 'alt/utils/ImmutableUtil';
import Immutable       from 'immutable';

import AltInstance    from 'lib/AltInstance';
import Actions        from 'actions/program_actions';

class ProgramStore {
  constructor() {
    let { setName } = Actions;

    this.bindListeners({
      setName: setName
    });

    this.state = Immutable.Map({
      name: ""
    });
  }

  setName(name) {
    return this.setState(this.state.set("name", name));
  }
}

export default AltInstance.createStore(ImmutableStore(ProgramStore));
