import React, { Component, PropTypes } from 'react';

import Post from '../components/Post';
import { loadPostByUrl, getAuthorById, setSinglePost } from '../actions/blog-post-actions';

import { connect } from 'react-redux';
import * as _ from 'lodash';

class PublicHomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
    posts: PropTypes.array,
    allPostsLoaded: PropTypes.bool,
    singlePost: PropTypes.object,
    singleAuthor: PropTypes.object,
    comments: PropTypes.array,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._loadSinglePost = this._loadSinglePost.bind(this);
  };

  componentWillMount() {}

  componentWillReceiveProps() {}

  _loadSinglePost() {}

  _getParam(param) {
    switch (param) {
      case 'url_path':
        return this.props.params[param];
        break;
      default:
        return undefined;
    }
  }

  render(){
    const { dispatch, posts, singlePost, singleAuthor, errors } = this.props;
    let singlePostLoaded = false,
      singleAuthorLoaded = false;

    // load single post from already loaded posts, or fetch from api
    // get url_path
    let url_path = this._getParam('url_path');
    if (url_path && !errors) {
      if (singlePost && singlePost.url_path === url_path) {
        // singlePost is already loaded
        singlePostLoaded = true;
      } else if (posts) {
        // try and find singlePost in posts already loaded
        for (let index in posts) {
          let post = posts[index];
          if (post.url_path === url_path) { console.log(post); dispatch(setSinglePost(post)); break; };
        }
        // single post not found - load post by url
        dispatch(loadPostByUrl( url_path ));
      } else {
        // no posts are loaded - load post by url
        dispatch(loadPostByUrl( url_path ));
      }
    }

    // get author of this post - see if current author is currently loaded before fetching from api
    if (singlePostLoaded) {
      if (!singleAuthor || singlePost._author !== singleAuthor.id) {
        // single author is not set or does not match the author of this post - reload the author!
        dispatch( getAuthorById(singlePost._author) );
      } else {
        // author matches - kindly proceed
        singleAuthorLoaded = true;
      }
    }


    let printSinglePost,
      comments;
    if (singlePostLoaded){

      printSinglePost = <Post post={singlePost} author={(singleAuthorLoaded) ? singleAuthor : null}/>;
      comments = _.map(this.props.comments, (comment, index) => {
        return (
          <div>
            <p><span>{index+1}: </span>{comment.text}</p>
          </div>
        );
      });

    } else {

      printSinglePost = <div>Loading...</div>;
      comments = <div>Loading...</div>;

    }

    return  (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {printSinglePost}
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h3>da commentation:</h3>
            {comments}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
};

export default connect((state) => {
  return {
    loading: state.application.loading,
    errors: state.application.errors,
    posts: state.postData.posts,
    allPostsLoaded: state.postData.allPostsLoaded,
    singlePost: state.postData.singlePost,
    singleAuthor: state.postData.singleAuthor,
    comments: state.postData.comments,
  };
})(PublicHomePage);
