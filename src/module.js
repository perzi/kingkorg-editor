// Bootstrapping module
import React            from 'react';
import { render }       from 'react-dom';

import routes           from 'routes';

render(routes, document.getElementById('content'));
