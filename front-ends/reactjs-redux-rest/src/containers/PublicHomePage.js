import React, { Component, PropTypes } from 'react';

import AllPosts from '../components/AllPosts';

import { connect } from 'react-redux';

class PublicHomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {}

  render(){
    return  (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h1>A Very Groovy Blog</h1>
            <AllPosts />
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
  };
})(PublicHomePage);
