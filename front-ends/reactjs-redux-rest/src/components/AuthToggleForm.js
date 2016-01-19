/*
 * Both the Sign up and sign in form
 */
let React       = require('react');
let LoginForm  = require('./LoginForm');
let SignUpForm  = require('./RegisterForm');

import { Glyphicon } from 'react-bootstrap';

class AuthToggleForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {currentForm: 0};

      this._showRegisterForm = this._showRegisterForm.bind(this);
      this._showLoginForm = this._showLoginForm.bind(this);
    }

    _showRegisterForm() {
      this.setState({currentForm: 1});
    }

    _showLoginForm() {
      this.setState({currentForm: 0});
    }

    render(){

      let { currentForm } = this.state;

      switch (currentForm) {
        case 0:
          return (
            <div>
              <LoginForm />
              <div className="c-btn c-btn-1" onClick={this._showRegisterForm}>Sign Up</div>
              {/*Forgot your password?</p>*/}
            </div>
          );
        case 1:
          return (
            <div>
              <SignUpForm />
              <div className="back-to-login" onClick={this._showLoginForm}>
                <a href="#"><Glyphicon glyph="arrow-left" /> Back to login form</a>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };
export default AuthToggleForm;