'use strict';

import userType from './types/user-type';

import createPostMutation from './mutations/create-post-mutation';
import updatePostMutation from './mutations/update-post-mutation';

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
  }),
});


let schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
