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


let schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
