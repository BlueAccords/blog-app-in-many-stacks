/*
 * Loads all blog posts
 */
import React, { Component, PropTypes } from 'react';
import { getPosts } from '../actions/blog-post-actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as _ from 'lodash';

class AllPosts extends Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array,
    errors: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this._loadPosts = this._loadPosts.bind(this);
  }

  componentWillMount() {
    this._loadPosts();
  }

  _loadPosts() {
    const { dispatch } = this.props;
    dispatch( getPosts() );
  }

  render(){
    let posts = _.map(this.props.posts, (post) => {
      let url = 'archives/' + post.url_path;
      return <li key={post.id} post={post} url_path={post.url_path}><Link to={url}>{post.title}</Link></li>;
    });
    return (
      <ol>{posts}</ol>
    );
  }
};
export default connect((state) => {
  return {
    posts: state.posts.posts,
    errors: state.posts.errors,
  };
})(AllPosts);