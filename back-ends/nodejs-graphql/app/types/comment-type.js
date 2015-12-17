import User from '../models/User';
import Post from '../models/Post';
import authorType from './author-type';

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface } from '../node-definitions';

let commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a post',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Comment'),
    text: {
      type: GraphQLString,
      resolve: (comment) => comment.text,
    },
    author: {
      type: authorType,
      resolve: function(post) {
        return User.findOne({_id: post._author})
        //.exec((err, user) => { return user; })
				.then((user) => { return user; });
      },
    },
    post: {
      type: GraphQLString,
      resolve: function(comment) {
        return Post.findOne({_id: comment._post})
    		.exec((err, post) => { return post; })
    		.then((post) => { return post.title; });
      },
    },
  },

});

module.exports = commentType;
