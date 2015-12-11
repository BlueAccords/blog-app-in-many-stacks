/****************************************************** General ***********************************/
/**
 * @apiDefine protected
 * @apiHeader (Authentication Headers) {String} Authorization Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. A user must be the owner of the resource or the most top-level parent of the resource to have permissions.
 */

/**
 * @apiDefine successfulDeletion
 *
 * @apiSuccess {Integer} deleted_id The ID of the deleted resource.
 */

/****************************************************** Authentication ***********************************/
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
 * @apiDefine userResponse
 *
 * @apiSuccess {Object} user
 * @apiSuccess {Integer} user.id
 * @apiSuccess {string} user.name
 * @apiSuccess {string} user.email
 * @apiSuccess {string} user.username
 * @apiSuccess {string} user.date_created
 * @apiSuccess {string} user.date_modified
 * @apiSuccess {String} token The user's jwt token
 */

/**
 * @api {post} /users Create user
 * @apiName Create user
 * @apiGroup User
 *
 * @apiUse userResponse
 *
 * @apiParam {Object} user
 * @apiParam {String} user.name
 * @apiParam {string} user.email
 * @apiParam {string} user.username
 * @apiParam {string} user.password
 */

/**
 * @api {get} /users/:id Get user
 * @apiName Get user
 * @apiGroup User
 *
 * @apiUse protected
 * @apiUse userResponse
 *
 * @apiParam {String} id The user ID
 */

/**
 * @api {put} /users/:id Update user
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiUse protected
 * @apiUse userResponse
 *
 * @apiParam {String} id The user ID
 * @apiParam {Object} user
 * @apiParam {String} user.name
 * @apiParam {string} user.email
 * @apiParam {string} user.username
 */

/**
 * @api {delete} /users/:id Delete user
 * @apiName Delete user
 * @apiGroup User
 *
 * @apiUse protected
 * @apiUse successfulDeletion
 *
 * @apiParam {String} id The user's id
 */

/****************************************************** POSTS ***********************************/
/**
 * @apiDefine postResponse
 *
 * @apiSuccess {Object} post
 * @apiSuccess {Integer} post.id
 * @apiSuccess {string} post.url_path
 * @apiSuccess {string} post.title
 * @apiSuccess {string} post.body
 * @apiSuccess {string} post.date_created
 * @apiSuccess {string} post.date_modified
 */

/**
 * @apiDefine postsResponse
 *
 * @apiSuccess {Object[]} posts
 * @apiSuccess {Integer} posts.id
 * @apiSuccess {string} posts.title
 * @apiSuccess {string} posts.body
 * @apiSuccess {string} posts.date_created
 * @apiSuccess {string} posts.date_modified
 */

/**
 * @api {get} /posts Get all posts
 * @apiName Get all posts
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 */

/**
 * @api {get} /users/:user_id/posts Get posts by user
 * @apiName Get all posts by user
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 *
 * @apiParam {String} user_id The user's id
 */

/**
 * @api {get} /tags/:tag_id/posts Get posts by tag
 * @apiName Get all posts by tag
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 *
 * @apiParam {String} tag_id The tag's id
 */

/**
 * @api {post} /posts Create post
 * @apiName Create post
 * @apiGroup Posts
 *
 * @apiUse postResponse
 *
 * @apiUse protected
 *
 * @apiParam {Object} post
 * @apiParam {String} post.title The title of the post
 * @apiParam {string} post.url_path The unique url path for the post (eg. blog.com/:url-path). Must be hiphenated.
 * @apiParam {string} post.body The post content
 */

/**
 * @api {get} /posts/:id Get post
 * @apiName Get post
 * @apiGroup Posts
 *
 * @apiUse postResponse
 *
 * @apiParam {String} id The post id
 */

/**
 * @api {put} /posts/:id Update post
 * @apiName Update post
 * @apiGroup Posts
 *
 * @apiUse protected
 * @apiUse postResponse
 *
 * @apiParam {String} id The post ID
 * @apiParam {Object} post
 * @apiParam {string} post.title
 * @apiParam {string} post.url_path
 * @apiParam {string} post.body
*/
/**
 * @api {delete} /posts/:id Delete post
 * @apiName Delete post
 * @apiGroup Posts
 *
 * @apiUse protected
 * @apiUse successfulDeletion
 *
 * @apiParam {String} id The post ID
 */

/****************************************************** COMMENTS ***********************************/
/**
 * @apiDefine commentResponse
 *
 * @apiSuccess {Object} comment
 * @apiSuccess {Integer} comment.id
 * @apiSuccess {string} comment.text
 * @apiSuccess {string} comment.date_created
 * @apiSuccess {string} comment.date_modified
 */

/**
 * @apiDefine commentsResponse
 *
 * @apiSuccess {Object[]} comments
 * @apiSuccess {Object} comments
 * @apiSuccess {Integer} comments.id
 * @apiSuccess {string} comments.text
 * @apiSuccess {string} comments.date_created
 * @apiSuccess {string} comments.date_modified
 */

/**
 * @api {post} /posts/:post_id/comments Create a comment
 * @apiName Create a comment
 * @apiGroup Comments
 *
 * @apiUse protected
 * @apiUse commentResponse
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
 * @apiUse commentsResponse
 *
 * @apiParam {String} post_id The post id
 */

/**
 * @api {get} /comments/:id Delete comment
 * @apiName Delete comment
 * @apiGroup Comments
 *
 * @apiUse protected
 * @apiUse successfulDeletion
 *
 * @apiParam {String} id The comment id
 */

/**
 * @api {put} /comments/:id Update comment
 * @apiName Update comment
 * @apiUse protected
 * @apiUse commentResponse
 * @apiGroup Comments
 *
 * @apiParam {String} id The comment id
 * @apiParam {Object} comment
 * @apiParam {String} comment.text
*/
/****************************************************** COMMENTS ***********************************/
/**
 * @apiDefine tagResponse
 *
 * @apiSuccess {Object} tag
 * @apiSuccess {Integer} tag.id
 * @apiSuccess {string} tag.text
 */

/**
 * @apiDefine tagsResponse
 *
 * @apiSuccess {Object[]} tags
 * @apiSuccess {Object} tags
 * @apiSuccess {Integer} tags.id
 * @apiSuccess {string} tags.text
 */

/**
 * @api {post} /posts/:post_id/tags Create a tag
 * @apiName Create a tag
 * @apiGroup Tags
 *
 * @apiUse protected
 * @apiUse tagResponse
 * @apiDescription - Any user that is logged in can create a tag
 *
 * @apiParam {String} post_id The post id
 * @apiParam {Object} tag
 * @apiParam {String} tag.text The tag text
 */

/**
 * @api {get} /tags Get all tags
 * @apiName Get all tags
 * @apiGroup Tags
 *
 * @apiUse tagsResponse
 */

/**
 * @api {get} /posts/:post_id/tags Get tags by post
 * @apiName Get tags by post
 * @apiGroup Tags
 *
 * @apiUse tagsResponse
 *
 * @apiParam {String} post_id The post id
 */

/**
 * @api {get} /tags/:id Delete tag
 * @apiName Delete tag
 * @apiGroup Tags
 *
 * @apiUse protected
 * @apiUse successfulDeletion
 *
 * @apiParam {String} id The tag id
 */

/**
 * @api {put} /tags/:id Update tag
 * @apiName Update tag
 * @apiUse protected
 * @apiUse tagResponse
 * @apiGroup Tags
 *
 * @apiParam {String} id The tag id
 * @apiParam {Object} tag
 * @apiParam {String} tag.text
 */


/****************************************************** SEARCH ***********************************/
/**
 * @api {get} /posts?path_url=:path_url Get post by path_url
 * @apiName Get post by path_url
 * @apiGroup Search
 *
 * @apiParam {String} path_url The unique path_url for the post you want to find
 *
 * @apiUse postResponse
 */

/**
 * @api {get} /tags/?text=:text Get tag by text
 * @apiName Get tag by text
 * @apiGroup Search
 *
 * @apiParam {String} text The text
 *
 * @apiUse tagResponse
 */

/**
 * @api {get} /users/?username=:username Get user by username
 * @apiName Get user by username
 * @apiGroup Search
 *
 * @apiParam {String} username The username
 *
 * @apiSuccess {Object} user
 * @apiSuccess {Integer} user.id
 */
