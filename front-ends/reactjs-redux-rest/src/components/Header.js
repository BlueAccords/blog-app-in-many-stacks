import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import LogoutLink from './LogoutLink';

class Header extends Component {

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  render(){
    let authLink;
    let image;
    let user = this.props.user;

    if(this.props.authenticated && user) {
      authLink = <LogoutLink />;
      image = <Link to="/my-account"><Gravatar email={user.email} size={40} https className /></Link>;
    } else {
      authLink = <Link to="/my-account">Log In</Link>;
    }

    return (
      <header>
        <h1>
          <Link to="/">Blog</Link>
        </h1>
        {authLink}
        {image}
      </header>
    );
  }
};

export default connect((state) => {
  return {
    user: state.application.user,
  };
})(Header);
