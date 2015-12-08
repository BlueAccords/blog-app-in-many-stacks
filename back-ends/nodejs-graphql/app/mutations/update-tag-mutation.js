import tagType from '../types/tag-type';
import Tag from '../models/Tag';
import { blockTagNonEditors } from '../utils/model-filters';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';


let updateTagMutation = new mutationWithClientMutationId({
  name: 'UpdateTag',
  description: 'Update a tag',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    text: {type: GraphQLString},
  },
  outputFields: {
    tag: {
      type: tagType,
      resolve: (data) => {
        return Tag.findOne({'_id': data.tagId})
          .then((tag) => {
            return tag;
          });
      },
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let _id = fromGlobalId(args.id).id;

    if (user) {

      return Tag.update({_id: _id}, args, {})
      .then((numAffected) => {
        if (numAffected.nModified > 0) {
          return {tagId: _id, user: root.rootValue.user};
        } else {
          throw 'Something went wrong';
        }
      });
    } else {
      throw 'You must be logged in to create a tag';
    }

  },

});

module.exports = updateTagMutation;