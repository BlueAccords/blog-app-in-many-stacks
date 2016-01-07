/*
 * Loads a single blog post
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

  componentWillMount() {}

  render(){
    let postDateRaw = new Date(this.props.singlePost.date_created),
    postDate = postDateRaw.toDateString();

    return (
      <div>
        <h1>{this.props.singlePost.title}</h1>
        <div className="meta">
          Created on <span className="date">{postDate}</span> by <span className="author">{this.props.singleAuthor.name}</span>
        </div>
        <div className="post-content">{this.props.singlePost.body}</div>
        <Link to="/">Go back</Link>
      </div>
    );
  }
};
export default connect((state) => {
  return {};
})(SinglePost);