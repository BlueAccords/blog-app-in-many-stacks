'use strict';

import userType from './types/user-type';

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
      resolve: (root) => root.user,
    },
  }),
});


let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
   // Mutation fields go here, with no fields here 'npm run update-schema' will fail
  }),
});


let schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
