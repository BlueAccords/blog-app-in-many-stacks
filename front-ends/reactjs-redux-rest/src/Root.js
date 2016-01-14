/* global __DEVTOOLS__ */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import configureStore from './utils/configure-store';


import BlogApp from './containers/BlogApp';
import PublicTemplate from './containers/PublicTemplate';
import PublicHomePage from './containers/PublicHomePage';
import PublicSinglePostPage from './containers/PublicSinglePostPage';
import PostsByTagPage from './containers/PostsByTagPage';
import NotFoundPage from './containers/NotFoundPage';

export const store = configureStore();

/**
 * Allows us to attach dev tools if in development
 *
 * @param {Object} props
 * @returns {node} - The dom node with or without devtools attached
 */
function getRootChildren (props) {
  const rootChildren = [renderRoutes()];
  if (__DEVTOOLS__) {
    const DevTools = require('./components/DevTools');
    rootChildren.push(<DevTools key="devtools" />);
  }
  return rootChildren;
}

/**
 * Render the routes
 * @returns {node} - The dom node with all the routes
 */
function renderRoutes () {
  return (
    <ReduxRouter key="redux-router">
      <Route component={BlogApp}>
        <Route path="/" component={PublicTemplate}>
          <IndexRoute component={PublicHomePage} />
          <Route path="archives" component={PublicHomePage} />
          <Route path="archives/:url_path" component={PublicSinglePostPage} />
          <Route path="tags/:tag_text" component={PostsByTagPage} />
        </Route>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </ReduxRouter>
  );
}

class Root extends React.Component {
  render () {
    return (
      <div>{getRootChildren(this.props)}</div>
    );
  }
}

export default connect((state) => ({}))(Root);
