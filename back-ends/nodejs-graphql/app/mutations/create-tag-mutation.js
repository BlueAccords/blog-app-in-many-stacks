import Tag from '../models/Tag';
import tagType from '../types/tag-type';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

let createTagMutation = new mutationWithClientMutationId({
  name: 'CreateTag',
  description: 'Create a tag',
  inputFields: {
    text: {type: new GraphQLNonNull(GraphQLString)},
    postId: {type: GraphQLString},
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
    if (args.postId) {
      let postId  = fromGlobalId(args.postId).id;
      args['_post'] = postId;
    }

    if (user) {

      let x = {_author: user._id};

      let tagParams = Object.assign(x, args);
      let tag = new Tag(tagParams);

      return tag.save()
      .then((tag) => { return {tagId: tag._id, user: root.rootValue.user}; });

    } else {
      throw 'You must be logged in to create a tag';
    }
  },
});

module.exports = createTagMutation;