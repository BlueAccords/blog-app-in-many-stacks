import commentType from '../types/comment-type';
import Comment from '../models/Comment';
import { blockCommentNonEditors } from '../utils/model-filters';
import { Promise } from 'es6-promise';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';


let updateCommentMutation = new mutationWithClientMutationId({
  name: 'UpdateComment',
  description: 'Update a comment',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    text: {type: GraphQLString},
  },
  outputFields: {
    comment: {
      type: commentType,
      resolve: (data) => {
        return Comment.findOne({'_id': data.commentId})
          .then((comment) => {
            return comment;
          });
      },
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let _id = fromGlobalId(args.id).id;

    return blockCommentNonEditors(user._id, _id)
    .then(() => {
      return Comment.update({_id: _id}, args, {});
    })
    .then((numAffected) => {
      if (numAffected.nModified > 0) {
        return {commentId: _id, user: root.rootValue.user};
      } else {
        return Promise.reject('Something went wrong');
      }
    });

  },

});

module.exports = updateCommentMutation;
