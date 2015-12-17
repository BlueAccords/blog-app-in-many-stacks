import Tag from '../models/Tag';
import tagType from '../types/tag-type';
import { Promise } from 'es6-promise';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

let createTagMutation = new mutationWithClientMutationId({
  name: 'CreateTag',
  description: 'Create a tag',
  inputFields: {
    text: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    tag: {
      type: tagType,
      resolve: (data) => {
        return Tag.findOne({'_id': data.tagId})
        .then((tag) => tag);
      },
    },
  },
  mutateAndGetPayload: (args, root) => {

    let user = root.rootValue.user;

    if (user) {
      let tagParams = {text: args.text};
      return Tag.findOne(tagParams)
      .then((tag) => {
        if(tag) {
          // if the tag exists just return it
          return Promise.resolve(tag);
        } else {
          // Create a new tag otherwise
          return Tag(tagParams).save();
        }
      })
      .then((tag) => {
        return {tagId: tag._id, user: root.rootValue.user};
      });

    } else {
      throw 'You must be logged in to create a tag';
    }
  },
});

module.exports = createTagMutation;