import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import 'rc-slider/assets/index.css';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer } from 'redux-form';
import reduxThunk from 'redux-thunk';

// importing the App component to pass it to ReactDOM
import App from './App';
import formReducer from './reducers/formReducer';
import locationsReducer from './reducers/locationsReducer';

const store = createStore(
  combineReducers({form: reducer, formCopy: formReducer, locations: locationsReducer}),
  {}, applyMiddleware(reduxThunk)
);

// rendering the App with Redux
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();