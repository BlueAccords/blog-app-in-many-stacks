import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import { Glyphicon } from 'react-bootstrap';
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
      image = <Link to="/my-account"><Gravatar email={user.email} size={40} https className="img-circle navbar-right me" /></Link>;
    } else {
      authLink = <Link to="/my-account" className="navbar-right"><Glyphicon glyph="user" /> Log In</Link>;
    }

    return (
      <header>
        <nav className="header-navbar navbar">
          <div className="navbar-header">
            <a href="#" className="navbar-left"><Glyphicon glyph="menu-hamburger" /></a>
            <span className="navbar-brand"><Link to="/">blog appendages</Link></span>
            {authLink}
            {image}
            <a href="#" className="navbar-right "><Glyphicon glyph="th" /></a>
            <a href="#" className="navbar-right "><Glyphicon glyph="search" /></a>
          </div>
        </nav>
      </header>
    );
  }
};

export default connect((state) => {
  return {
    user: state.application.user,
  };
})(Header);