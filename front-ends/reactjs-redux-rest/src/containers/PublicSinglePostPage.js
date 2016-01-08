import React, { Component, PropTypes } from 'react';

import SinglePost from '../components/SinglePost';
import { loadPostByUrl, getAuthorById } from '../actions/blog-post-actions';

import { connect } from 'react-redux';

class PublicHomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
    singlePost: PropTypes.object,
    singleAuthor: PropTypes.object,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    const { dispatch } = this.props;
    let url_path = this._getParam('url_path');
    if (url_path) {
      dispatch( loadPostByUrl(this._getParam('url_path')) );
    }
    if (this.props.singlePost) {
      dispatch( getAuthorById(this.props.singlePost._author) );
    }
  }

  componentWillReceiveProps() {
    const { dispatch } = this.props;
    if (this.props.singlePost && this.props.singleAuthor === undefined) {
      dispatch( getAuthorById(this.props.singlePost._author) );
    }
  }

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
    let singlePost = (this.props.singlePost ? <SinglePost singlePost={this.props.singlePost} singleAuthor={this.props.singleAuthor}/> : <div>Loading...</div>);
    return  (
      <div>
        {singlePost}
      </div>
    );
  }
};

export default connect((state) => {
  return {
    loading: state.application.loading,
    errors: state.application.errors,
    singlePost: state.posts.singlePost,
    singleAuthor: state.posts.singleAuthor,
  };
})(PublicHomePage);
