import { routerStateReducer } from 'redux-router';
import applicationReducer from './application-reducer';
import postsReducer from './posts-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  router: routerStateReducer,
  application: applicationReducer,
  postData: postsReducer,
});
