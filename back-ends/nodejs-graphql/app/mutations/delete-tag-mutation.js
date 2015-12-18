import Tag from '../models/Tag';
import userType from '../types/user-type';
import { Promise } from 'es6-promise';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

let deleteTagMutation = new mutationWithClientMutationId({
  name: 'DeleteTag',
  description: 'Delete a tag',
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
      resolve: (data) => data.user,
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let _id = fromGlobalId(args.id).id;

    if (user) {

      return Tag.findOne({'_id': _id})
      .then((tag) => {
        return tag.remove((err, tag) => root);
      })
      .then(() => ({id: args.id, user: user}));
    }
    else {
      return Promise.rejectt('You must be logged in to delete a tag');
    }
  },

});

module.exports = deleteTagMutation;
