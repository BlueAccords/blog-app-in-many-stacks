import Tag from '../models/Tag';
import Post from '../models/Post';
import tagType from '../types/tag-type';
import { Promise } from 'es6-promise';
import * as _ from 'lodash';

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
    let postId;
    if (args.postId) {
      postId  = fromGlobalId(args.postId).id;
      args['_post'] = postId;
    }

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
        // Now find the post and add the tag
        return Post.findOne({ _id: postId })
        .then((post) => {
          post.tags = _.unique([...post.tags, {_tag: tag._id}], (x) => x._tag.id);

          return post.save();
        })
        .then((post) => { return {tagId: tag._id, user: root.rootValue.user}; });
      });

    } else {
      throw 'You must be logged in to create a tag';
    }
  },
});

module.exports = createTagMutation;
