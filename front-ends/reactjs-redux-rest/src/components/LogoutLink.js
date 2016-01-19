/*
 * Signs a user out when he clicks this link
 */
import React, { Component, PropTypes } from 'react';
import { logout } from '../actions/application-actions';
import { connect } from 'react-redux';

class LogoutLink extends Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  _logout(ev){
    const { dispatch } = this.props;
    ev.preventDefault();
    dispatch(logout());
  }

  render(){
    return (
      <a href="#" className={'sign-out-link ' + this.props.className} onClick={this._logout}>Sign out</a>
    );
  }
};
export default connect((state) => state)(LogoutLink);