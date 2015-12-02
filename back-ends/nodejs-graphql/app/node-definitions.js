import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import User from './models/User';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
module.exports = nodeDefinitions(
  (globalId) => {
    let {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return User.findOne({'_id': id});
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return require('./types/user-type');
    } else {
      return null;
    }
  });
