import Post from '../models/Post';
import Tag from '../models/Tag';
import User from '../models/User';
import tagType from './tag-type';
import postConnectionDefinitions from '../connection-definitions/post-connection-definitions';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import {
  connectionFromArray,
  globalIdField,
  connectionArgs,
} from 'graphql-relay';

import { nodeInterface } from '../node-definitions';
let postConnectionArgs = connectionArgs;
postConnectionArgs['tag'] =  {type: GraphQLString};
postConnectionArgs['username'] =  {type: GraphQLString};


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
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    tags: {
      type: new GraphQLList(tagType),
      resolve: (user) => {
        return Tag.find()
        .then((tag) => tag);
      },
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
        } else if(args.username) {
          return User.findOne({'username': args.username })
          .then((author) => {
            return Post.find({'_author': author._id });
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
