'use strict';
import userType from './types/user-type';

import createPostMutation from './mutations/create-post-mutation';
import updatePostMutation from './mutations/update-post-mutation';
import deletePostMutation from './mutations/delete-post-mutation';

import createCommentMutation from './mutations/create-comment-mutation';
import updateCommentMutation from './mutations/update-comment-mutation';
import deleteCommentMutation from './mutations/delete-comment-mutation';

import updateUserMutation from './mutations/update-user-mutation';
import deleteUserMutation from './mutations/delete-user-mutation';

import createTagMutation from './mutations/create-tag-mutation';
//In the future, we will add these but will only allow admins to update and delete tags
//import updateTagMutation from './mutations/update-tag-mutation';
//import deleteTagMutation from './mutations/delete-tag-mutation';

import toggleTagOnPostMutation from './mutations/toggle-tag-on-post-mutation';

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
          return {};
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
    //updateTag: updateTagMutation,
    //deleteTag: deleteTagMutation,
    toggleTagOnPost: toggleTagOnPostMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
  }),
});


let schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
