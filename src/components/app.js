import React from 'react';
import {RouteHandler, Link} from 'react-router';
import ProgramActions from 'actions/program_actions'
import ProgramStore            from 'stores/program_store';
import Timbre            from 'components/program/timbre';
import Param            from 'components/program/param';
import Parameter            from 'components/program/parameter';
import programData            from 'data/program';

import "styles/app";


class App extends React.Component {

  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {

    return (
      <div>
        <h1>KingKORG Editor</h1>
        <RouteHandler />
      </div>
    );
  }
}


export default App;
