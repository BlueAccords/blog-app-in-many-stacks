import User from '../models/User';
import userType from '../types/user-type';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

let deleteUserMutation = new mutationWithClientMutationId({
  name: 'DeleteUser',
  description: 'Delete a user',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    viewer: {
      type: userType,
      resolve: (data) => {
        return {};
      },
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let id = fromGlobalId(args.id).id;

    if(String(user._id) !== id) {
      return Promise.reject('You do not have permissions to do this');
    }

    return User.findOne({'_id': id})
    .then((user) => {
      return user.remove();
    })
    .then(() => ({id: args.id}));
  },

});

module.exports = deleteUserMutation;
