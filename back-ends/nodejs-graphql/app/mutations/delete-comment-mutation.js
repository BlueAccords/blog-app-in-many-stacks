import Comment from '../models/Comment';
import Post from '../models/Post';
import postType from '../types/post-type';
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
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
        .then((post) => post);
      },
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
      return comment.remove((err, comment) => root)
      .then(() => ({id: args.id, postId: comment._post.toString()}));
    });
  },

});

module.exports = deleteCommentMutation;
