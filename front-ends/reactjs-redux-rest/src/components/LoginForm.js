import React, { Component, PropTypes } from 'react';
import { login } from '../actions/application-actions';
import { connect } from 'react-redux';
import * as  _ from 'lodash';

import { Input, Alert } from 'react-bootstrap';

class LoginForm extends Component {

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
      },
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleSignInClick = this._handleSignInClick.bind(this);
  }

  _handleInputChange(ev) {
    let user = _.cloneDeep(this.state.user);
    user[ev.target.name] = ev.target.value;
    this.setState({user});
  }

  _handleKeyDown(e) {
    let ENTER = 13;
    if( e.keyCode === ENTER ) {
      this._handleSignInClick(e);
    }
  }

  _handleSignInClick(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(login({user: this.state.user}));
  }

  render(){
    let alertErrors;
    let errors = this.props.errors;
    if(errors) {
      alertErrors = (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <div>{errors.general}</div>
          <div>{errors.unauthenticated}</div>
        </Alert>
      );
    }

    return (
      <div>
        {alertErrors}
        <form onKeyDown={this._handleKeyDown} className="form-style-1">
          <div className="form-header">Sign In</div>
          <div className="form-body">
            <Input
              type="email"
              className="form-elem-full"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this._handleInputChange}
            />
            <Input
              type="password"
              className="form-elem-full"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this._handleInputChange}
            />
            <Input type="checkbox" label="Remember me" wrapperClassName="ta-r" />
            <input
              type="submit" className="c-btn c-btn-2"
              onClick={this._handleSignInClick} defaultValue="Login"
            />
          </div>
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
})(LoginForm);