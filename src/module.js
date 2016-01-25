// Bootstrapping module
import React            from 'react';
import { render }       from 'react-dom';

import routes           from 'routes';
import App              from 'components/app';
import CurrentProgram   from 'components/currentprogram';

render(routes, document.getElementById('content'));
