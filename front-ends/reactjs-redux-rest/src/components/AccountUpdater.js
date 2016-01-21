import React, { Component, PropTypes } from 'react';
import { Panel, Input, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../actions/application-actions';
import * as _ from 'lodash';

class AccountUpdater extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.object,
    user: PropTypes.object,
    token: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      userUpdate: {},
      clientErrors: null,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._save = this._save.bind(this);
    this._delete = this._delete.bind(this);
  }

  _handleInputChange(ev) {
    let userUpdate = {...this.state.userUpdate};
    userUpdate[ev.target.name] = ev.target.value;
    this.setState({userUpdate});
  }

  _handleKeyDown(e) {
    const ENTER = 13;
    if( e.keyCode === ENTER ) {
      this._save(e);
    }
  }

  _save(e) {
    const { dispatch, token } = this.props;
    const user = { ...this.state.userUpdate };
    const userId = this.props.user.id;

    e.preventDefault();

    // reset the errors before attempting to save
    this.setState({ clientErrors: null}, () => {
      let errors = [];
      if(_.isEmpty(user)) {
        errors = [...errors, 'No changes to save have been made'];
      }

      if(_.isEmpty(errors)) {
        console.log('updating: ', token, {user});

        dispatch(updateUser({user}, userId));
      } else {
        this.setState({
          clientErrors: {
            general: errors,
          },
        });
      }
    });
  }

  _delete(e) {
    const { dispatch, user } = this.props;
    e.preventDefault();

    // make sure user is set (it should be set in order to see this page, but just making sure!)
    if (user) {
      const confirmDelete = confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        dispatch( deleteUser(user.id) );
      }
    } else {
      alert('error - user not set.');
    }
  }

  render(){
    const { user, errors } = this.props;
    const { clientErrors } = this.state;
    let content,
      passwordError,
      passwordConfirmationError,
      emailError,
      permissionsError;

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

        if (errors.permissions) {
          permissionsError = <p>{errors.permissions}</p>;
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
                defaultValue={user.name}
                onChange={this._handleInputChange}
              />
              <Input
                type="email"
                className="form-elem-full"
                name="email"
                placeholder="Email"
                defaultValue={user.email}
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
          {permissionsError}
          <input type="submit" className="c-btn c-btn-2"
            onClick={this._delete} value="Delete this user account"
          />
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
    user: state.application.user,
    token: state.application.token,
  };
})(AccountUpdater);