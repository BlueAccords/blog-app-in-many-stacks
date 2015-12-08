'use strict';

import userType from './types/user-type';

import createPostMutation from './mutations/create-post-mutation';
import updatePostMutation from './mutations/update-post-mutation';
import deletePostMutation from './mutations/delete-post-mutation';

import createCommentMutation from './mutations/create-comment-mutation';
import updateCommentMutation from './mutations/update-comment-mutation';
import deleteCommentMutation from './mutations/delete-comment-mutation';

import createTagMutation from './mutations/create-tag-mutation';
import updateTagMutation from './mutations/update-tag-mutation';
import deleteTagMutation from './mutations/delete-tag-mutation';

import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let nodeField = require('./node-definitions').nodeField;

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: userType,
      resolve: (root) => {
        if(root.user) {
          return root.user;
        } else {
          return {
            name: null,
            email: null,
          };
        }
      },
    },
  }),
});

let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: createPostMutation,
    updatePost: updatePostMutation,
    deletePost: deletePostMutation,
    createComment: createCommentMutation,
    updateComment: updateCommentMutation,
    deleteComment: deleteCommentMutation,
    createTag: createTagMutation,
    updateTag: updateTagMutation,
    deleteTag: deleteTagMutation,
  }),
});


let schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
