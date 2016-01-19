import React, { Component, PropTypes } from 'react';
import { Panel, Input, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser } from '../actions/application-actions';
import * as _ from 'lodash';

class AccountUpdater extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.object,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      clientErrors: null,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._save = this._save.bind(this);
  }

  _handleInputChange(ev) {
    let user = {...this.state.user};
    user[ev.target.name] = ev.target.value;
    this.setState({user});
  }

  _handleKeyDown(e) {
    let ENTER = 13;
    if( e.keyCode === ENTER ) {
      this._save(e);
    }
  }

  _save(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    // reset the errors before attempting to save
    this.setState({ clientErrors: null}, () => {
      let errors = [];
      if(_.isEmpty(this.state.user)) {
        errors = [...errors, 'No changes to save have been made'];
      }

      if(_.isEmpty(errors)) {
        dispatch(updateUser({user: this.state.user}));
      } else {
        this.setState({
          clientErrors: {
            general: errors,
          },
        });
      }
    });
  }
  render(){
    const { user, errors } = this.props;
    const { clientErrors } = this.state;
    let content;
    let passwordError;
    let passwordConfirmationError;
    let emailError;

    if(user) {
      let alertErrors;
      if(clientErrors) {
        alertErrors = (
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <div>{clientErrors.general}</div>
          </Alert>
        );
      }

      if(errors) {
        if(errors.password) {
          passwordError = { bsStyle:'error', label:errors.password};
        }

        if(errors.password_confirmation) {
          passwordConfirmationError = { bsStyle:'error', label:errors.password_confirmation};
        }

        if(errors.email) {
          emailError = { bsStyle:'error', label:errors.email};
        }
      }

      content =  (
        <Panel header="Edit Account">
          {alertErrors}
          <form onKeyDown={this._handleKeyDown} className="form-style-1">
            <div className="form-header">Personal Info</div>
            <div className="form-body">
              <Input
                type="text"
                className="form-elem-full"
                name="name"
                placeholder="Name"
                defaultValue={this.props.user.name}
                onChange={this._handleInputChange}
              />
              <Input
                type="email"
                className="form-elem-full"
                name="email"
                placeholder="Email"
                defaultValue={this.props.user.email}
                onChange={this._handleInputChange}
                {...emailError}
              />
              <Input
                type="password"
                className="form-elem-full"
                name="password"
                placeholder="Password"
                onChange={this._handleInputChange}
                {...passwordError}
              />
              <Input
                type="password"
                className="form-elem-full"
                name="password_confirmation"
                placeholder="Re-Type Password"
                onChange={this._handleInputChange}
                {...passwordConfirmationError}
              />
              <input
                type="submit" className="c-btn c-btn-2"
                onClick={this._save} value="Update"
              />
            </div>
          </form>
        </Panel>
      );
    } else {
      content = <div></div>;
    };

    return content;
  }
};

export default connect((state) => {
  return {
    errors: state.application.errors,
  };
})(AccountUpdater);