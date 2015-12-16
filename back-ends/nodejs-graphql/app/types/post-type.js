import User from '../models/User';
import tagType from './tag-type';
import commentConnectionDefinitions from '../connection-definitions/comment-connection-definitions';
import Comment from '../models/Comment';


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

let postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post that has an author.',
  interfaces: [nodeInterface],
  args: connectionArgs,
  fields: {
    id: globalIdField('Post'),
    title: {
      type: GraphQLString,
      resolve: (post) => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: (post) => post.body,
    },
    tags: {
      type: new GraphQLList(tagType),
      description: 'The tags',
      resolve: function(post) {
        return post.tags;
      },
    },
    comments: {
      type: commentConnectionDefinitions.commentConnection,
      args: connectionArgs,
      description: 'The comments',
      resolve: function(post, args) {
        return Comment.find({_post: post._id})
        .exec((err, comments) => comments)
        .then((comments) => connectionFromArray(comments, args));
      },
    },
    author: {
      type: GraphQLString,
      resolve: function(post) {
        return User.findOne({_id: post._author})
				.exec((err, user) => { return user; })
				.then((user) => { return user.username; });
      },
    },
  },
});

module.exports = postType;
