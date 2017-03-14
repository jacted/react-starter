import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory } from 'react-router';

// Routes
import { getRoutes } from 'routes'

// Store
import store from 'store';

// HTML + SCSS
import 'index.html';
import 'styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById('root')
);