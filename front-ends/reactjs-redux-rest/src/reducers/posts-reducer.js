import * as constants from '../constants';
import * as storage from '../utils/storage';
import * as _ from 'lodash';

const initialState = {
  posts: null, // empty array of posts
  tags: null, // empty array of tags
  singlePost: undefined, // single post
  singleAuthor: undefined, // single author
  errors: [], // empty array of errors
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POSTS_LOADED:
      return { ...state, posts: action.payload.posts };
    case constants.TAGS_LOADED:
      return { ...state, tags: action.payload.tags };
    case constants.SINGLE_POST_LOADED:
      return { ...state, singlePost: action.payload.singlePost };
    case constants.QUERIED_POSTS_LOADED:
      return { ...state, posts: action.payload.posts };
    case constants.SINGLE_AUTHOR_LOADED:
      return { ...state, singleAuthor: action.payload.singleAuthor };
    case constants.COMMENTS_LOADED:
      return { ...state, comments: action.payload.comments };
    default:
      return state;
  }
};