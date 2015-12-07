import Post from '../models/Post';
import Comment from '../models/Comment';
/**
 * Throws an error if the current user can't does not have permission to
 * edit the post
 *
 * @param {integer} userId The user ID
 * @param {integer} id The post ID
 * @returns {Promise}
 */
export function blockPostNonEditors(userId, id) {
  return Post.findOne({'_id': id, '_author': userId })
  .then((post) => {
    if(!post) {
      throw 'You do not have permissions to edit this Post';
    }
  });
}

/**
 * Throws an error if the current user can't does not have permission to
 * edit the comment
 *
 * @param {integer} userId The user ID
 * @param {integer} id The comment ID
 * @returns {Promise}
 */
export function blockCommentNonEditors(userId, id) {
  return Comment.findOne({'_id': id, '_author': userId })
  .then((comment) => {
    if (!comment) {
      throw 'You do not have permissions to edit this comment';
    }
  });
}
