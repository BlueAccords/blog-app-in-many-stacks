import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';


let authorType = new GraphQLObjectType({
  name: 'Author',
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
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
  },
});

module.exports = authorType;
