import Post from '../models/Post';
import postConnectionDefinitions from '../connection-definitions/post-connection-definitions';

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
    posts: {
      type: postConnectionDefinitions.postConnection,
      args: connectionArgs,
      description: 'The posts',
      resolve: function(user, args) {
        if (user) {
          return Post.find({'_author': user._id})
          .then((posts) => connectionFromArray(posts, args));
        } else {
          return [];
        }
      },
    },
  },
});

module.exports = userType;
