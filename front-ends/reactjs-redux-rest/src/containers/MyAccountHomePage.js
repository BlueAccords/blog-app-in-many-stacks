import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Panel, Button } from 'react-bootstrap';
import AccountUpdater from '../components/AccountUpdater';
import { connect } from 'react-redux';
import { loadUserIfNeeded } from '../actions/application-actions';

class MyAccountHomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    manufacturers: PropTypes.array,
  };

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(loadUserIfNeeded());
  }

  render(){
    return  (
      <Panel header={<h1>My Account</h1>}>
        <AccountUpdater user={this.props.user} />
      </Panel>
    );
  }
};

export default connect((state) => {
  return {
    user: state.application.user,
  };
})(MyAccountHomePage);