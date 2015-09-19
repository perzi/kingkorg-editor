import ImmutableStore from 'alt/utils/ImmutableUtil';
import Immutable       from 'immutable';

import AltInstance    from 'lib/AltInstance';
import Actions        from 'actions/program_actions';
import program        from 'data/program';

class ProgramStore {
  constructor() {
    let { setName, fromData, updateParam } = Actions;

    this.bindListeners({
      setName: setName,
      updateParam: updateParam,
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

  updateParam(obj) {
    return this.setState(
      this.state.updateIn(["data"], (list) => {
        return list.set(obj.index, obj.value);
      })
    );
  }

  fromData(data) {
    return this.setState(data);
  }
}

export default AltInstance.createStore(ImmutableStore(ProgramStore));
