import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import '../../static/reset.css';
import Main from './Main/Main.jsx';
import store from './store'

ReactDom.render(
  <Provider store={store}><Main /></Provider>,
  document.getElementById('root')
);

