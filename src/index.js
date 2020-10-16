import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './Store/reducer'

const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
