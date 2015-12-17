import postType from '../types/post-type';

import {
  connectionDefinitions,
} from 'graphql-relay';

let {connectionType: PostConnection, edgeType: PostEdge} =
  connectionDefinitions({name: 'Post', nodeType: postType});

exports.postConnection = PostConnection;
exports.postEdge = PostEdge;
