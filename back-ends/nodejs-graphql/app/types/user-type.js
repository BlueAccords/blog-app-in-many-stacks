
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionFromArray,
  globalIdField,
  connectionArgs,
} from 'graphql-relay';

import { nodeInterface } from '../node-definitions';


let userType = new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
  },
});

module.exports = userType;
