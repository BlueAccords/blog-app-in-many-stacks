/*
 * The default template for admin pages
 */
import React, {PropTypes} from 'react';
import Header from '../components/Header';
import AuthToggleForm from '../components/AuthToggleForm';
import { loadUserIfNeeded } from '../actions/application-actions';
import { connect } from 'react-redux';

class PublicTemplate extends React.Component {

  static propTypes = {
    authenticated: PropTypes.bool,
    children: PropTypes.node,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount(){
    const { dispatch } = this.props;
    if(this.props.authenticated) {
      dispatch(loadUserIfNeeded());
    }
  }

  render(){
    let mainContent;
    let { authenticated } = this.props;

    if(authenticated) {
      mainContent = this.props.children;
    } else {
      mainContent = <AuthToggleForm />;
    }

    return  (
      <div>
        <Header authenticated={this.props.authenticated} user={this.props.user} />
        <div className="container page-body">
          {mainContent}
        </div>
      </div>
    );
  };
};

export default connect((state) => {
  return {
    user: state.application.user,
  };
})(PublicTemplate);