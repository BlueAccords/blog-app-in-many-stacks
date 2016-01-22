/*
 * Loads a single blog post
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommentsByPostId } from '../actions/blog-post-actions';
import * as _ from 'lodash';

class Post extends Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array,
    errors: PropTypes.array,
    post: PropTypes.object,
    author: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { post, dispatch } = this.props;

    dispatch(getCommentsByPostId(post.id));
  }

  render(){
    let { post, author } = this.props,
      loading = <div className="meta">Loading...</div>;

    let postDateRaw = new Date(post.date_created),
      postDate = postDateRaw.toDateString();

    let meta = () => {
      return (
        <div className="meta">
          Created on <span className="date">{postDate}</span> by <span className="author">{author.name}</span>
        </div>
      );
    };

    return (
      <div>
        <h1>{post.title}</h1>
          {(author) ? meta() : loading}
        <div className="post-content">{post.body}</div>
        <Link to="/">Go back</Link>
      </div>
    );
  }
};
export default connect()(Post);