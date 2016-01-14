/*
 * Loads all blog posts
 */
import React, { Component, PropTypes } from 'react';
import { getPosts, getTags } from '../actions/blog-post-actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as _ from 'lodash';

class AllPosts extends Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array,
    tags: PropTypes.array,
    errors: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this._loadPosts = this._loadPosts.bind(this);
    this._loadTags = this._loadTags.bind(this);
  }

  componentWillMount() {
    this._loadPosts();
    this._loadTags();
  }

  _loadPosts() {
    const { dispatch } = this.props;
    dispatch( getPosts() );
  }

  _loadTags() {
    const { dispatch } = this.props;
    dispatch( getTags() );
  }

  render(){
    let { posts, tags } = this.props;

    let printPosts = _.map(posts, (post) => {
      let url = 'archives/' + post.url_path;
      return <li key={post.id} post={post} url_path={post.url_path}><Link to={url}>{post.title}</Link></li>;
    });

    let printTags = _.map(tags, (tag) => {
      let url = '/tags/' + tag.text;
      return <li key={tag.id} tag={tag} text={tag.text}><Link to={url}>{tag.text}</Link></li>;
    });

    return (
      <div>
        <h2>Posts:</h2>
        <ol>{printPosts}</ol>
        <h2>tags:</h2>
        <ul>{printTags}</ul>
      </div>
    );
  }
};
export default connect((state) => {
  return {
    posts: state.postData.posts,
    tags: state.postData.tags,
    errors: state.postData.errors,
  };
})(AllPosts);