import * as constants from '../constants';
import * as storage from '../utils/storage';
import * as _ from 'lodash';

const initialState = {
  posts: [], // empty array of posts
  singlePost: undefined, // single post
  singleAuthor: undefined, // single author
  postsRequested: [], // array of post ids that have been requested
  errors: [], // empty array of errors
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POSTS_LOADED:
      return { ...state, posts: action.payload.posts };
    case constants.SINGLE_POST_LOADED:
      return { ...state, singlePost: action.payload.singlePost };
    case constants.SINGLE_AUTHOR_LOADED:
      return { ...state, singleAuthor: action.payload.singleAuthor };
    default:
      return state;
  }
};