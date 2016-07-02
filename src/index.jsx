import React from 'react';
import ReactDOM from 'react-dom';

import routes from './routes/router.jsx';

ReactDOM.render(
    routes()
  , document.querySelector('.container'));
