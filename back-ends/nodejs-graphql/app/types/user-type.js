import Post from '../models/Post';
import Tag from '../models/Tag';
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
let postConnectionArgs = connectionArgs;
postConnectionArgs['tag'] =  {type: GraphQLString};


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
      args: postConnectionArgs,
      description: 'The posts',
      resolve: function(user, args) {
        if(args.tag) {
          return Tag.findOne({'text': args.tag })
          .then((tag) => {
            return Post.find({'tags': tag._id })
            .populate('tags');
          })
          .then((posts) => connectionFromArray(posts, args));
        } else {
          return Post.find()
          .populate('tags')
          .then((posts) => connectionFromArray(posts, args));
        }
      },
    },
  },
});

module.exports = userType;
