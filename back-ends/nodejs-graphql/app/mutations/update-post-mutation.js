import postType from '../types/post-type';
import Post from '../models/Post';
import { blockPostNonEditors } from '../utils/model-filters';
import { Promise } from 'es6-promise';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';


let updatePostMutation = new mutationWithClientMutationId({
  name: 'UpdatePost',
  description: 'Update a post',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    url_path: {type: GraphQLString},
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (data) => {
        return Post.findOne({'_id': data.postId})
          .then((post) => {
            return post;
          });
      },
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let _id = fromGlobalId(args.id).id;

    return blockPostNonEditors(user._id, _id)
    .then(() => {
      if(args['url_path']) {
        args['url_path'] = args.url_path.replace(/\s/g, '-');
      }
      return Post.update({_id: _id}, args, {});
    })
    .then((numAffected) => {
      if (numAffected.nModified > 0) {
        return {postId: _id, user: root.rootValue.user};
      } else {
        return Promise.reject('Something went wrong');
      }
    });

  },

});

module.exports = updatePostMutation;
