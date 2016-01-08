/*
 * The default template for public pages
 */
import React, {PropTypes} from 'react';
import Header from '../components/Header';
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
    return  (
      <div>
        <Header authenticated={this.props.authenticated} user={this.props.user} />
        <div className="container page-body">
          {this.props.children}
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