/****************************************************** General ***********************************/
/**
 * @apiDefine protected
 * @apiHeader (Authentication Headers) {String} Authorization Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. A user must be the owner of the resource or the most top-level parent of the resource to have permissions.
 * @apiError (Authorization Errors 401) errors
 * @apiError (Authorization Errors 401) {String[]} [errors.unauthorized] You are not authorized
 *
 * @apiError (Permissions Errors 403) errors
 * @apiError (Permissions Errors 403) {String[]} [errors.permissions] You do not have permissions to perform this action
 */

/**
 * @apiDefine successfulDeletion
 *
 * @apiSuccess (Success Response 200) {Integer} deleted_id The ID of the deleted resource.
 */

/**
 * @apiDefine generalErrors
 * @apiError (General Errors 400) errors
 * @apiError (General Errors 400) {String[]} [errors.general] General errors that can be used for any purpose.
 */


/****************************************************** Authentication ***********************************/
/**
 * @api {post} /sign-in Authenticate a user
 * @apiName Authenticate a user
 * @apiGroup Authentication
 *
 * @apiParam {Object} user
 * @apiParam {integer} user.id
 * @apiParam {string} user.email
 * @apiParam {string} user.password
 */

/****************************************************** USERS ***********************************/

/**
 * @apiDefine userResponse
 *
 * @apiSuccess (Success Response 200) {Object} user
 * @apiSuccess (Success Response 200) {Integer} user.id
 * @apiSuccess (Success Response 200) {string} user.name
 * @apiSuccess (Success Response 200) {string} user.email
 * @apiSuccess (Success Response 200) {string} user.username
 * @apiSuccess (Success Response 200) {string} user.date_created
 * @apiSuccess (Success Response 200) {string} user.date_modified
 * @apiSuccess (Success Response 200) {String} token The user's jwt token
 */
/**
 * @apiDefine userFieldErrors
 *
 * @apiError (Field Errors 400) {Object} errors
 * @apiError (Field Errors 400) {String[]} [errors.name] Errors related to the name field
 * @apiError (Field Errors 400) {String[]} [errors.email] Errors related to the email field
 * @apiError (Field Errors 400) {String[]} [errors.password] Errors related to the password field
 */

/**
 * @api {post} /users Create user
 * @apiName Create user
 * @apiGroup User
 *
 * @apiUse userResponse
 * @apiUse userFieldErrors
 * @apiUse generalErrors
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
 * @apiUse userResponse
 * @apiUse generalErrors
 * @apiUse protected
 *
 * @apiParam {String} id The user ID
 */

/**
 * @api {put} /users/:id Update user
 * @apiName updateUser
 * @apiGroup User
 * @apiUse userFieldErrors
 * @apiUse generalErrors
 *
 * @apiUse userResponse
 * @apiUse protected
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
 * @apiUse successfulDeletion
 * @apiUse protected
 *
 * @apiParam {String} id The user's id
 */

/****************************************************** POSTS ***********************************/
/**
 * @apiDefine postResponse
 *
 * @apiSuccess (Success Response 200) {Object} post
 * @apiSuccess (Success Response 200) {Integer} post.id
 * @apiSuccess (Success Response 200) {string} post.url_path
 * @apiSuccess (Success Response 200) {string} post.title
 * @apiSuccess (Success Response 200) {string} post.body
 * @apiSuccess (Success Response 200) {Integer} post.user_id
 * @apiSuccess (Success Response 200) {string} post.date_created
 * @apiSuccess (Success Response 200) {string} post.date_modified
 */

/**
 * @apiDefine postsResponse
 *
 * @apiSuccess (Success Response 200) {Object[]} posts
 * @apiSuccess (Success Response 200) {Integer} posts.id
 * @apiSuccess (Success Response 200) {string} post.url_path
 * @apiSuccess (Success Response 200) {string} posts.title
 * @apiSuccess (Success Response 200) {string} posts.body
 * @apiSuccess (Success Response 200) {Integer} post.user_id
 * @apiSuccess (Success Response 200) {string} posts.date_created
 * @apiSuccess (Success Response 200) {string} posts.date_modified
 */

/**
 * @apiDefine postFieldErrors
 *
 * @apiError (Field Errors 400) {Object}  errors
 * @apiError (Field Errors 400) {String[]} [errors.title] Errors related to the title field.
 * @apiError (Field Errors 400) {String[]} [errors.body] Errors related to the body field.
 */

/**
 * @api {get} /posts Get all posts
 * @apiName Get all posts
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 * @apiUse generalErrors
 */

/**
 * @api {get} /users/:user_id/posts Get posts by user
 * @apiName Get all posts by user
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 * @apiUse generalErrors
 *
 * @apiParam {String} user_id The user's id
 */

/**
 * @api {get} /tags/:tag_id/posts Get posts by tag
 * @apiName Get all posts by tag
 * @apiGroup Posts
 *
 * @apiUse postsResponse
 * @apiUse generalErrors
 *
 * @apiParam {String} tag_id The tag's id
 */

/**
 * @api {post} /posts Create post
 * @apiName Create post
 * @apiGroup Posts
 *
 * @apiUse postResponse
 * @apiUse postFieldErrors
 * @apiUse generalErrors
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
 * @apiUse postResponse
 * @apiUse generalErrors
 *
 * @apiParam {String} id The post id
 */

/**
 * @api {put} /posts/:id Update post
 * @apiName Update post
 * @apiGroup Posts
 *
 * @apiUse postResponse
 * @apiUse postFieldErrors
 * @apiUse generalErrors
 * @apiUse protected
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
 * @apiSuccess (Success Response 200) {Object} comment
 * @apiSuccess (Success Response 200) {Integer} comment.id
 * @apiSuccess (Success Response 200) {string} comment.text
 * @apiSuccess (Success Response 200) {string} comment.date_created
 * @apiSuccess (Success Response 200) {string} comment.date_modified
 */

/**
 * @apiDefine commentsResponse
 *
 * @apiSuccess (Success Response 200) {Object[]} comments
 * @apiSuccess (Success Response 200) {Object} comments
 * @apiSuccess (Success Response 200) {Integer} comments.id
 * @apiSuccess (Success Response 200) {string} comments.text
 * @apiSuccess (Success Response 200) {string} comments.date_created
 * @apiSuccess (Success Response 200) {string} comments.date_modified
 */

/**
 * @apiDefine commentFieldErrors
 *
 * @apiError (Field Errors 400) {Object} errors
 * @apiError (Field Errors 400) {String[]} [errors.text] Errors related to the text field.
 */

/**
 * @api {post} /posts/:post_id/comments Create a comment
 * @apiName Create a comment
 * @apiGroup Comments
 * @apiDescription - Any user that is logged in can create a comment
 *
 * @apiUse commentResponse
 * @apiUse commentFieldErrors
 * @apiUse generalErrors
 * @apiUse protected
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
 * @apiUse generalErrors
 *
 * @apiParam {String} post_id The post id
 */

/**
 * @api {get} /comments/:id Delete comment
 * @apiName Delete comment
 * @apiGroup Comments
 *
 * @apiUse successfulDeletion
 * @apiUse generalErrors
 * @apiUse protected
 *
 * @apiParam {String} id The comment id
 */

/**
 * @api {put} /comments/:id Update comment
 * @apiName Update comment
 *
 * @apiGroup Comments
 *
 * @apiUse commentResponse
 * @apiUse commentFieldErrors
 * @apiUse generalErrors
 * @apiUse protected
 *
 * @apiParam {String} id The comment id
 * @apiParam {Object} comment
 * @apiParam {String} comment.text
*/
/****************************************************** TAGS ***********************************/
/**
 * @apiDefine tagResponse
 *
 * @apiSuccess (Success Response 200) {Object} tag
 * @apiSuccess (Success Response 200) {Integer} tag.id
 * @apiSuccess (Success Response 200) {string} tag.text
 */

/**
 * @apiDefine tagsResponse
 *
 * @apiSuccess (Success Response 200) {Object[]} tags
 * @apiSuccess (Success Response 200) {Object} tags
 * @apiSuccess (Success Response 200) {Integer} tags.id
 * @apiSuccess (Success Response 200) {string} tags.text
 */

/**
 * @apiDefine tagFieldErrors
 *
 * @apiError (Field Errors 400) {Object} errors
 * @apiError (Field Errors 400) {String[]} [errors.text] Errors related to the text field.
 */

/**
 * @api {post} /posts/:post_id/tags Create a tag
 * @apiName Create a tag
 * @apiGroup Tags
 * @apiDescription - Any user that is logged in can create a tag
 *
 * @apiUse tagResponse
 * @apiUse tagFieldErrors
 * @apiUse generalErrors
 * @apiUse protected
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
 * @apiUse generalErrors
 */

/**
 * @api {get} /posts/:post_id/tags Get tags by post
 * @apiName Get tags by post
 * @apiGroup Tags
 *
 * @apiUse tagsResponse
 * @apiUse generalErrors
 *
 * @apiParam {String} post_id The post id
 */

/**
 * @api {get} /tags/:id Delete tag
 * @apiName Delete tag
 * @apiGroup Tags
 *
 * @apiUse successfulDeletion
 * @apiUse generalErrors
 * @apiUse protected
 *
 * @apiParam {String} id The tag id
 */

/**
 * @api {put} /tags/:id Update tag
 * @apiName Update tag
 * @apiGroup Tags
 *
 * @apiUse tagResponse
 * @apiUse tagFieldErrors
 * @apiUse generalErrors
 * @apiUse protected
 *
 * @apiParam {String} id The tag id
 * @apiParam {Object} tag
 * @apiParam {String} tag.text
 */


/****************************************************** SEARCH ***********************************/
/**
 * @api {get} /posts?url_path=:url_path Get post by url_path
 * @apiName Get post by url_path
 * @apiGroup Search
 *
 * @apiParam {String} url_path The unique url_path for the post you want to find
 *
 * @apiUse postResponse
 * @apiUse generalErrors
 */

/**
 * @api {get} /tags/?text=:text Get tag by text
 * @apiName Get tag by text
 * @apiGroup Search
 *
 * @apiParam {String} text The text
 *
 * @apiUse tagResponse
 * @apiUse generalErrors
 */

/**
 * @api {get} /users/?username=:username Get user by username
 * @apiName Get user by username
 * @apiGroup Search
 *
 * @apiParam {String} username The username
 *
 * @apiSuccess (Success Response 200) {Object} user
 * @apiSuccess (Success Response 200) {Integer} user.id
 *
 * @apiUse generalErrors
 */
