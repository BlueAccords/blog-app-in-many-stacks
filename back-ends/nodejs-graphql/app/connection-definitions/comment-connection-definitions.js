import commentType from '../types/comment-type';

import {
  connectionDefinitions,
} from 'graphql-relay';

let {connectionType: CommentConnection, edgeType: CommentEdge} =
  connectionDefinitions({name: 'Comment', nodeType: commentType});

exports.commentConnection = CommentConnection;
exports.commentEdge = CommentEdge;
