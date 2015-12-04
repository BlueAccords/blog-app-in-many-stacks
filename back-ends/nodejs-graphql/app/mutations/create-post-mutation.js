import Post from '../models/Post';
import postType from '../types/post-type.js';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

let createPostMutation = new mutationWithClientMutationId({
  name: 'CreatePost',
  description: 'Create a post',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
        .then((post) => post);
      },
    },
  },
  mutateAndGetPayload: (args, root) => {

    let post = new Post(args);

    return post.save()
    .then((post) => ({postId: post._id, user: root.rootValue.user}));
  },
});

module.exports = createPostMutation;