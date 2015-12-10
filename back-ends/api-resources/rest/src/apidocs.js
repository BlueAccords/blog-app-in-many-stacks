/**
 * @apiDefine protected
 * @apiHeader (Authentication Headers) {String} Authorization Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.
 */

/**
 * @api {post} /sign-in Authenticate a user
 * @apiName Authenticate a user
 * @apiGroup Authentication
 *
 * @apiParam {Object} user
 * @apiParam {string} user.email
 * @apiParam {string} user.password
 */

/****************************************************** USERS ***********************************/

/**
 * @api {post} /user Create user
 * @apiName Create user
 * @apiGroup User
 *
 * @apiParam {Object} user
 * @apiParam {String} user.name
 * @apiParam {string} user.email
 * @apiParam {string} user.password
 */

/**
 * @api {get} /user/:id Get user
 * @apiName Get user
 * @apiGroup User
 * @apiUse protected
 * @apiParam {String} id The user ID
 */

/**
 * @api {put} /user/:id Update user
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiUse protected
 *
 * @apiParam {String} id The user ID
 * @apiParam {Object} user
 * @apiParam {String} user.name
 * @apiParam {string} user.email
 * @apiParam {string} user.password
 */

/**
 * @api {delete} /user/:id Delete user
 * @apiName Delete user
 * @apiGroup User
 *
 * @apiUse protected
 *
 * @apiParam {String} id The user's id
 */

/****************************************************** POSTS ***********************************/
/**
 * @api {get} /posts Get all posts
 * @apiName Get posts
 * @apiDescription Get all posts
 * @apiGroup Posts
 *
 */

/**
 * @api {get} /user/:user_id/posts Get posts by user
 * @apiName Get all posts by user
 * @apiGroup Posts
 *
 * @apiParam {String} user_id The user's id
 */

/**
 * @api {post} /posts Create post
 * @apiName Create post
 * @apiGroup Posts
 *
 * @apiUse protected
 *
 * @apiParam {Object} post
 * @apiParam {String} post.title The title of the post
 * @apiParam {string} post.body The post content
 */

/**
 * @api {get} /posts/:id Get post
 * @apiName Get post
 * @apiGroup Posts
 *
 * @apiParam {String} id The post id
 */

/**
 * @api {put} /posts/:id Update post
 * @apiName Update post
 * @apiGroup Posts
 *
 * @apiUse protected
 *
 * @apiParam {String} id The post ID
 * @apiParam {Object} post
 * @apiParam {string} post.title
 * @apiParam {string} post.body
*/
/**
 * @api {delete} /posts/:id Delete post
 * @apiName Delete post
 * @apiGroup Posts
 *
 * @apiUse protected
 *
 * @apiParam {String} id The post ID
 */

/****************************************************** COMMENTS ***********************************/
/**
 * @api {post} /posts/:post_id/comments Create a comment
 * @apiName Create a comment
 * @apiGroup Comments
 *
 * @apiUse protected
 * @apiDescription - Any user that is logged in can create a comment
 *
 * @apiParam {String} post_id The post id
 * @apiParam {Object} comment
 * @apiParam {String} comment.text The comment text
 */

/**
 * @api {get} /posts/:post_id/comments Get comments by post
 * @apiName Get comments by post
 * @apiGroup Comments
 *
 * @apiParam {String} post_id The post id
 */

/**
 * @api {get} /comments/:id Delete comment
 * @apiName Delete comment
 * @apiUse protected
 * @apiGroup Comments
 *
 * @apiParam {String} id The comment id
 */

/**
 * @api {put} /comments/:id Update comment
 * @apiName Update comment
 * @apiUse protected
 * @apiGroup Comments
 *
 * @apiParam {String} id The comment id
 * @apiParam {Object} comment
 * @apiParam {String} comment.text
*/
