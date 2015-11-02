import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RouteHandler, Link } from 'react-router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import kingkorgApp from 'reducers/reducers'

// import { setCurrentProgramName, updateCurrentProgramParam, loadCurrentProgram } from 'actions/actions'

let store = createStore(kingkorgApp);

// import ProgramActions       from 'actions/program_actions'
// import ProgramStore         from 'stores/program_store';
// import Timbre               from 'components/program/timbre';
// import Param                from 'components/program/param';
// import Parameter            from 'components/program/parameter';

import "styles/app";

class App extends React.Component {

  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>KingKORG Editor</h1>
          { this.props.children }
        </div>
      </Provider>
    );
  }
}


export default App;
