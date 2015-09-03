import ImmutableStore from 'alt/utils/ImmutableUtil';
import Immutable       from 'immutable';

import AltInstance    from 'lib/AltInstance';
import Actions        from 'actions/program_actions';

class ProgramStore {
  constructor() {
    let { setName, fromData } = Actions;

    this.bindListeners({
      setName: setName,
      fromData: fromData
    });

    this.state = Immutable.fromJS({
      name: "", // 12
      data: []
    });
  }

  setName(name) {
    return this.setState(this.state.set("name", name));
  }

  fromData(data) {
    return this.setState(data);
  }
}

export default AltInstance.createStore(ImmutableStore(ProgramStore));
