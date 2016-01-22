import React, { Component, PropTypes } from 'react';

import { getPostsByTag, queriedPostsWillChange } from '../actions/blog-post-actions';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as _ from 'lodash';

class PostsByTagPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
    posts: PropTypes.array,
    allPostsLoaded: PropTypes.bool,
    queriedPosts: PropTypes.array,
    queriedPostsLoaded: PropTypes.bool,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(queriedPostsWillChange());
  }

  componentWillReceiveProps() {}

  _getParam(param) {
    switch (param) {
      case 'tag_text':
        return this.props.params[param];
        break;
      default:
        return undefined;
    }
  }

  _getFilteredPosts(posts, tag_text) {
    return posts.filter((post) => {
      for (let tag in post.tags) {
        if (post.tags[tag].text === tag_text) { return true; }
      }
      return false;
    });
  }

  render(){
    const { dispatch, posts, allPostsLoaded, queriedPosts, queriedPostsLoaded } = this.props;
    let tag_text = this._getParam('tag_text');

    let loading = <div>Loading...</div>,
      filteredPosts = null,
      printFilteredPosts = loading,
      postCount = 0;

    if (posts && allPostsLoaded) {
      // load filtered post data from previously loaded posts
      filteredPosts = this._getFilteredPosts(posts, tag_text);
    } else if(queriedPosts && queriedPostsLoaded) {
      filteredPosts = this._getFilteredPosts(queriedPosts, tag_text);
    } else {
      // no posts are loaded - lead posts from api
      dispatch( getPostsByTag(tag_text) );
    }

    // get filtered posts
    if (filteredPosts) {
      postCount = filteredPosts.length;
      printFilteredPosts = filteredPosts.map((post) => {
        return (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      });
    }

    return  (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <p>Only showing posts with tag: {tag_text} ({postCount} result{(postCount === 1) ? '' : 's'})</p>
            {printFilteredPosts}
            <Link to="/">Go back</Link>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
};

export default connect((state) => {
  return {
    posts: state.postData.posts,
    allPostsLoaded: state.postData.allPostsLoaded,
    queriedPosts: state.postData.queriedPosts,
    queriedPostsLoaded: state.postData.queriedPostsLoaded,
  };
})(PostsByTagPage);