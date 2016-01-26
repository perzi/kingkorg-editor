import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kingkorgApp from 'reducers/reducers';

import "styles/app";


let store = createStore(kingkorgApp);

let App = (props) => {

  return (
    <Provider store={store}>
      <div>
        <h1>KingKORG Editor</h1>
        { props.children }
      </div>
    </Provider>
  );
}

export default App;
