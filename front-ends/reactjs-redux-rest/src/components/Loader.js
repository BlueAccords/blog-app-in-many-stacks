import React, { Component, PropTypes }from 'react';

class Loader extends Component{
  render(){
    return (
      <div className="loader-bg">
        <div className="loader">Loading...</div>
      </div>
    );
  }
};

export default Loader;
