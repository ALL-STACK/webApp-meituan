import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/main.js';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
const history = createHashHistory();

// 创建初始化tab
history.replace('home');

// 创建history的middleware
const historyMiddl = routerMiddleware(history);

const store = createStore(mainReducer, applyMiddleware(thunk,historyMiddl));

if (module.hot) {
  module.hot.accept('./reducers/main', ()=>{
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer)
  });
}
module.exports = {
  store,
  history
};
