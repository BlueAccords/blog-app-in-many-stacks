/*
 * Loads a single blog post
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommentsByPostId } from '../actions/blog-post-actions';
import * as _ from 'lodash';

class SinglePost extends Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array,
    errors: PropTypes.array,
    singlePost: PropTypes.object,
    singleAuthor: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { singlePost, dispatch } = this.props,
      postId = singlePost.id;

    dispatch(getCommentsByPostId(postId));
  }

  render(){
    let { singlePost, singleAuthor } = this.props;

    let postDateRaw = new Date(singlePost.date_created),
      postDate = postDateRaw.toDateString();

    let meta = () => {
      return (
        <div className="meta">
          Created on <span className="date">{postDate}</span> by <span className="author">{singleAuthor.name}</span>
        </div>
      );
    };

    return (
      <div>
        <h1>{singlePost.title}</h1>
          {(singleAuthor) ? meta() : ''}
        <div className="post-content">{singlePost.body}</div>
        <Link to="/">Go back</Link>
      </div>
    );
  }
};
export default connect()(SinglePost);