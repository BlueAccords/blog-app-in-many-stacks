import User from '../models/User';

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
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
    author: {
      type: GraphQLString,
      resolve: function(post) {
        return User.findOne({_id: post._author})
				.exec((err, user) => { return user; })
				.then((user) => { return user.email;
				});
      },
    },
  },
});

module.exports = postType;