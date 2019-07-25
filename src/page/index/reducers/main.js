import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  tabReducer,
  router: routerReducer
});
