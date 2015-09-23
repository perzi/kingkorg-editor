import React                 from 'react';
import {Route, DefaultRoute} from 'react-router';

import App                   from 'components/app';
import CurrentProgram        from 'components/currentprogram';

const routes = (
  <Route handler={App}>
    <DefaultRoute name='currentprogram' handler={CurrentProgram}/>
  </Route>
);

export default routes;
