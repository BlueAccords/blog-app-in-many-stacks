import postType from '../types/post-type';
import Post from '../models/Post';
import Comment from '../models/Comment';
import commentType from '../types/comment-type';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
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
    comment: {
      type: commentType,
      resolve: (data) => {
        return Comment.findOne({'_id': data.commentId})
        .then((comment) => comment);
      },
    },
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
          .then((post) => {
            return post;
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
      throw 'You must be logged in to create a comment';
    }
  },
});

module.exports = createCommentMutation;