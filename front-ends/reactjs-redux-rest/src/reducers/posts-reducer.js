import * as constants from '../constants';
import * as storage from '../utils/storage';
import * as _ from 'lodash';

const initialState = {
  posts: null, // empty array of posts
  tags: null, // empty array of tags
  singlePost: null, // single post - this is used for individual post pages
  singleAuthor: null, // single author
  queriedPosts: [], // empty array of queried posts - these are for custom post queries (by tag, by author, etc.)
  queriedPostsLoaded: false,
  errors: [], // empty array of errors
  allPostsLoaded: false, // boolean to determine whether all posts have been loaded or not
  postsLoading: false, // boolean determines whether posts are currently loading
  tagsLoading: false, // boolean determines whether tags are currently loading
  authorLoading: false, // boolean determines whether author is currently loading
  commentsLoading: false, // boolean determines whether comments are currently loading
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POSTS_LOADING:
      return { ...state, postsLoading: true };
    case constants.POSTS_LOADED:
      return { ...state, posts: action.payload.posts, allPostsLoaded: true, queriedPostsLoaded: false, postsLoading: false };
    case constants.QUERIED_POSTS_LOADED:
      return { ...state, queriedPosts: action.payload.posts, allPostsLoaded: false, queriedPostsLoaded: true, postsLoading: false };
    case constants.QUERIED_POSTS_CHANGED:
      return { ...state, queriedPostsLoaded: false };
    case constants.SINGLE_POST_LOADED:
      return { ...state, singlePost: action.payload.post, postsLoading: false };
    case constants.TAGS_LOADING:
      return { ...state, tagsLoading: true };
    case constants.TAGS_LOADED:
      return { ...state, tags: action.payload.tags, tagsLoading: false };
    case constants.AUTHOR_LOADING:
      return { ...state, authorLoading: true };
    case constants.SINGLE_AUTHOR_LOADED:
      return { ...state, singleAuthor: action.payload.singleAuthor, authorLoading: false };
    case constants.COMMENTS_LOADING:
      return { ...state, commentsLoading: true };
    case constants.COMMENTS_LOADED:
      return { ...state, comments: action.payload.comments, commentsLoading: false };
    default:
      return state;
  }
};