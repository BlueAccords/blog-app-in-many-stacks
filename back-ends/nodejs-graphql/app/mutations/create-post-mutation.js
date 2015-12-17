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

    let user = root.rootValue.user;

    if (user) {
      let x = {_author: user._id};
      let postParams = Object.assign(x, args);
      postParams['url_path'] = args.title.replace(/\s/g, '-') + Date.now();
      let post = new Post(postParams);

      return post.save()
      .then((post) => ({postId: post._id, user: root.rootValue.user}));
    } else {
      throw 'You must be logged in to create a post';
    }
  },
});

module.exports = createPostMutation;
