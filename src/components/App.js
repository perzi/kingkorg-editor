import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RouteHandler, Link } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kingkorgApp from 'reducers/reducers';

import "styles/app";

let store = createStore(kingkorgApp);


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
