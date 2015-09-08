import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from 'components/app';
import Intro from 'components/intro';

const routes = (
  <Route handler={App}>
    <DefaultRoute name='intro' handler={Intro}/>
  </Route>
);

export default routes;
