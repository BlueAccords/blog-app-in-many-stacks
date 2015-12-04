
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface } from '../node-definitions';

let tagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A tag for a post',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Tag'),
    text: {
      type: GraphQLString,
      resolve: (tag) => tag.text,
    },
  },

});

module.exports = tagType;