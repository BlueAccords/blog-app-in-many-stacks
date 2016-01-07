import React, { Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

class BlogApp extends Component{

  static propTypes = {
    children: PropTypes.node,
    authenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
  };


  render(){
    let content;
    let loader;

    if(this.props.loading) {
      loader = <Loader />;
    }

    content = (
      <div>
        {loader}
        {React.cloneElement(this.props.children, {authenticated: this.props.authenticated })}
      </div>
    );

    return content;
  }
};

export default connect((state) => {
  let authenticated;
  state.application.token === null ? authenticated = false: authenticated = true;

  return {
    authenticated,
    loading: state.application.loading,
  };
})(BlogApp);