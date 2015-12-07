import Comment from '../models/Comment';
import userType from '../types/user-type';
import { blockCommentNonEditors } from '../utils/model-filters';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

let deleteCommentMutation = new mutationWithClientMutationId({
  name: 'DeleteComment',
  description: 'Delete a comment',
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

    return blockCommentNonEditors(user._id, _id)
    .then(() => {
      return Comment.findOne({'_id': _id});
    })
    .then((comment) => {
      return comment.remove((err, comment) => root);
    })
    .then(() => ({id: args.id, user: user}));

  },

});

module.exports = deleteCommentMutation;