import Post from '../models/Post';
import Comment from '../models/Comment';
import postType from '../types/post-type';
import {Promise} from 'es6-promise';
import { commentEdge } from '../connection-definitions/comment-connection-definitions';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  fromGlobalId,
} from 'graphql-relay';

let createCommentMutation = new mutationWithClientMutationId({
  name: 'CreateComment',
  description: 'Create a comment',
  inputFields: {
    postId: {type: new GraphQLNonNull(GraphQLString)},
    text: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
        .then((post) => post);
      },
    },
    commentEdge: {
      type: commentEdge,
      resolve: (data) => {
        let commentId = data.commentId;

        return Comment.find({'_post': data.postId})
        .then((comments) => {
          let comment;
          comments.forEach((tmpComment) => {
            if(tmpComment._id.toString() === commentId.toString()) {
              comment = tmpComment;
            }
          });

          return {
            cursor: cursorForObjectInConnection(comments, comment),
            node: comment,
          };
        });
      },
    },
  },
  mutateAndGetPayload: (args, root) => {

    let user = root.rootValue.user;
    let postId  = fromGlobalId(args.postId).id;

    if (user) {

      let x = {_author: user._id};

      args['_post'] = postId;
      let commentParams = Object.assign(x, args);
      let comment = new Comment(commentParams);

      return comment.save()
      .then((comment) => { return {commentId: comment._id, postId: postId, user: root.rootValue.user}; });

    } else {
      return Promise.reject('You must be logged in to create a comment');
    }
  },
});

module.exports = createCommentMutation;
