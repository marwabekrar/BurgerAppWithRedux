import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';
import reducer from './store/reducer';

const store = createStore(reducer);

const app = (
    <Provider store={store}> 
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </Provider> 
);


ReactDOM.render(
  app,
  document.getElementById('root')
);
