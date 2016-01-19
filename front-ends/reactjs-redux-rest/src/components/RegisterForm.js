/*
 * The sign up form for creating a new account
 */
import React, { Component, PropTypes } from 'react';
import { register } from '../actions/application-actions';
import { connect } from 'react-redux';
import * as  _ from 'lodash';

import { Input, Alert } from 'react-bootstrap';

class RegisterForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        provider: 'email',
      },
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleRegistrationClick = this._handleRegistrationClick.bind(this);
  }

  _handleInputChange(ev) {
    let user = _.cloneDeep(this.state.user);
    user[ev.target.name] = ev.target.value;
    this.setState({user});
  }

  _handleKeyDown(e) {
    let ENTER = 13;
    if( e.keyCode === ENTER ) {
      this._handleRegistrationClick(e);
    }
  }

  _handleRegistrationClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    let user = this.state.user;
    user.uid = user.email;
    dispatch(register({user}));
  }
  render(){
    let alertErrors;

    let errors = this.props.errors;
    let emailError;
    let passwordError;
    let passwordConfirmationError;
    if(errors) {
      if(errors.email) {
        emailError = { bsStyle:'error', label:errors.email};
      }
      if(errors.password) {
        passwordError = { bsStyle:'error', label:errors.password};
      }
      if(errors.password_confirmation) {
        passwordConfirmationError = { bsStyle:'error', label:errors.password_confirmation};
      }
    }

    if(errors && errors.general) {
      alertErrors = (
        <Alert bsStyle="danger">
          <div>{errors.general}</div>
        </Alert>
      );
    }

    return (
      <div>
        {alertErrors}
        <form onKeyDown={this._handleKeyDown} className="form-style-1">
          <div className="form-header">Sign Up</div>
          <div className="form-body">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this._handleInputChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this._handleInputChange}
              {...emailError}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this._handleInputChange}
              {...passwordError}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Re-type password"
              value={this.state.password_confirmation}
              onChange={this._handleInputChange}
              {...passwordConfirmationError}
            />
          </div>
          <input className="c-btn c-btn-1" onClick={this._handleRegistrationClick} defaultValue="Be Free!"/>
        </form>
      </div>
    );
  }
};

export default connect((state) => {
  return {
    loading: state.application.loading,
    errors: state.application.errors,
  };
})(RegisterForm);