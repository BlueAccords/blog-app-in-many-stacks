import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import Post from './models/Post';
import User from './models/User';
import Comment from './models/Comment';
import Tag from './models/Tag';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
module.exports = nodeDefinitions(
  (globalId) => {
    let {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return User.findOne({'_id': id});
    } else if (type === 'Post') {
      return Post.findOne({'_id': id});
    } else if (type === 'Comment') {
      return Comment.findOne({'_id': id});
    } else if (type === 'Tag') {
      return Tag.findOne({'_id': id});
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return require('./types/user-type');
    } else if (obj instanceof Post)  {
      return require('./types/post-type');
    } else if (obj instanceof Comment)  {
      return require('./types/comment-type');
    } else if (obj instanceof Tag)  {
      return require('./types/tag-type');
    } else {
      return null;
    }
  });
