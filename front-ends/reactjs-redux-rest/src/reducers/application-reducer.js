import * as constants from '../constants';
import * as storage from '../utils/storage';

const initialState = {
  token: storage.get('token'),
  user: JSON.parse(storage.get('user')),
  errors: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.APPLICATION_ERRORS:
      return { ...state, errors: action.payload.errors, loading: false };
    case constants.APPLICATION_LOADING:
      return { ...state, loading: true };
    case constants.APPLICATION_LOADED:
      return { ...state, loading: false };
    case constants.LOGGED_OUT:
      storage.remove('token');
      storage.remove('user');
      return { ...state, token: null, user: null, loading: false, errors: null };
    case constants.REGISTERED:
      return { ...state, loading: false, errors: null };
    case constants.USER_LOADED:
      storage.put('token', action.payload.token);
      storage.put('user', JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false, errors: null};
    default:
      return state;
  }
};
