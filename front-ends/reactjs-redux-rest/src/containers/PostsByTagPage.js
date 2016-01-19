import React, { Component, PropTypes } from 'react';

import { getPostsByTag } from '../actions/blog-post-actions';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as _ from 'lodash';

class PostsByTagPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
    posts: PropTypes.array,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentWillReceiveProps() {
    const { dispatch, posts } = this.props;
  }

  _getParam(param) {
    switch (param) {
      case 'tag_text':
        return this.props.params[param];
        break;
      default:
        return undefined;
    }
  }

  render(){
    const { dispatch, posts } = this.props;
    let tag_text = this._getParam('tag_text');
    let filteredPosts = null,
      printFilteredPosts = null;
    if (posts) {
      // load filtered post data from previously loaded posts
      filteredPosts = posts.filter((post) => {
        for (let tag in post.tags) {
          if (post.tags[tag].text === tag_text) { return true; }
        }
        return false;
      });
    }
    else {
      // lead posts from api
      dispatch( getPostsByTag(tag_text) );
    }

    if (filteredPosts) {
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
            <p>Only showing posts with tag: {tag_text}</p>
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
  };
})(PostsByTagPage);