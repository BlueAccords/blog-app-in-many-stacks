import Post from '../models/Post';
import userType from '../types/user-type';
import { blockPostNonEditors } from '../utils/model-filters';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

let deletePostMutation = new mutationWithClientMutationId({
  name: 'DeletePost',
  description: 'Delete a post',
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

    return blockPostNonEditors(user._id, _id)
    .then(() => {
      return Post.findOne({'_id': _id});
    })
    .then((post) => {
      return post.remove((err, post) => root);
    })
    .then(() => ({id: args.id, user: user}));

  },

});

module.exports = deletePostMutation;