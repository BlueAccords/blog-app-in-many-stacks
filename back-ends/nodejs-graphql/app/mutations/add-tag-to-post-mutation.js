import Tag from '../models/Tag';
import Post from '../models/Post';
import postType from '../types/post-type';
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

let addTagToPostMutation = new mutationWithClientMutationId({
  name: 'AddTagToPost',
  description: 'Add a tag to a post',
  inputFields: {
    tagId: {type: GraphQLString},
    postId: {type: GraphQLString},
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
        .populate('tags')
        .then((post) => post);
      },
    },
  },
  mutateAndGetPayload: (args, root) => {

    let user = root.rootValue.user;

    let postId  = fromGlobalId(args.postId).id;
    let tagId  = fromGlobalId(args.tagId).id;

    if (user) {
      return Post.findOne({ _id: postId })
      .then((post) => {
        return Tag.findOne({_id: tagId}).then((tag) => {
          post.tags = _.unique([...post.tags, tag._id], (x) => x.id);

          return post.save();
        })
        .then((tag) => { return {postId: post._id, user: root.rootValue.user}; });
      });
    } else {
      throw 'You must be logged in to add a tag to a post';
    }
  },
});

module.exports = addTagToPostMutation;
