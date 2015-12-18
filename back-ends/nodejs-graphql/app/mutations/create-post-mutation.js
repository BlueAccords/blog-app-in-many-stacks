import Post from '../models/Post';
import userType from '../types/user-type';
import { Promise } from 'es6-promise';
import { postEdge } from '../connection-definitions/post-connection-definitions';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay';

let createPostMutation = new mutationWithClientMutationId({
  name: 'CreatePost',
  description: 'Create a post',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    viewer: {
      type: userType,
      resolve: (data) => {
        return data.user;
      },
    },
    postEdge: {
      type: postEdge,
      resolve: (data) => {
        let postId = data.postId;
        return Post.find({'_id': data.postId})
        .then((posts) => {
          let post;
          posts.forEach((tmpPost) => {
            if(tmpPost._id.toString() === postId.toString()) {
              post = tmpPost;
            }
          });

          return {
            cursor: cursorForObjectInConnection(posts, post),
            node: post,
          };
        });
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
      return Promise.reject('You must be logged in to create a post');
    }
  },
});

module.exports = createPostMutation;
