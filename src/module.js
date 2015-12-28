// Bootstrapping module
import React  from 'react';
import { render } from 'react-dom';
// import Router from 'react-router';
import routes from 'routes';

import { Router, Route } from 'react-router';

import App                   from 'components/app';
import CurrentProgram        from 'components/currentprogram';


render(routes, document.getElementById('content'));
// render((
//   <Router>
//     <Route path="/" component={App}>
//     </Route>
//   </Router>
// ), document.getElementById('content'));


// Router.run(routes, Router.HistoryLocation, (Root, state) => {
//   React.render(<Root {...state}/>, document.getElementById('content'));
// });
