import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reduxThunk from 'redux-thunk';

// importing the App component to pass it to ReactDOM
import App from './App';

const store = createStore(formReducer, {}, applyMiddleware(reduxThunk));

// rendering the App with Redux
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();