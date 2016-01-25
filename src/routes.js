import React                 from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App                   from 'components/App';
import CurrentProgram        from 'components/CurrentProgram';

const routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={CurrentProgram} />
      <Route path='currentprogram' component={CurrentProgram}/>
    </Route>
  </Router>
);

export default routes;
