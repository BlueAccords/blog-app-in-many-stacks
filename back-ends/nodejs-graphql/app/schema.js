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


let schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
