/*
 * The sign up form for creating a new account
 */
import React, { Component, PropTypes } from 'react';
import { getPostsByUserId } from '../actions/blog-post-actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as  _ from 'lodash';

import { Input, Alert } from 'react-bootstrap';

class PostsByUser extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.object,
    user: PropTypes.object,
    allPostsLoaded: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  _handleInputChange(ev) {}

  _handleKeyDown(e) {}

  _handleRegistrationClick(e) {}

  render(){
    const { dispatch, user, posts, allPostsLoaded } = this.props;
    let filteredPosts = null,
      printFilteredPosts = null;

    if (posts && !allPostsLoaded) {
      // filter posts corresponding to userId
      filteredPosts = posts.filter((post) => {
        if (post._author === user.id) { return true; }
        return false;
      });
    }
    else {
      // if posts are not loaded yet, get posts from api
      dispatch(getPostsByUserId(user.id));
    }

    if (filteredPosts) {
      printFilteredPosts = filteredPosts.map((post) => {
        return (
          <div>
            <Link to={'archives/' + post.url_path}><p>{post.title}</p></Link>
          </div>
        );
      });
    }

    return (
      <div>
        <h2>these are da posts that you've written:</h2>
        {printFilteredPosts}
      </div>
    );
  }
};

export default connect((state) => {
  return {
    loading: state.application.loading,
    errors: state.application.errors,
    user: state.application.user,
    posts: state.postData.posts,
    allPostsLoaded: state.postData.allPostsLoaded,
  };
})(PostsByUser);