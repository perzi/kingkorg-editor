import React                 from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App                   from 'components/App';
import CurrentProgram        from 'components/CurrentProgram';
import Sysex                 from 'components/Sysex';

const routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={CurrentProgram} />
      <Route path='currentprogram' component={CurrentProgram}/>
      <Route path='sysex' component={Sysex}/>
    </Route>
  </Router>
);

export default routes;
