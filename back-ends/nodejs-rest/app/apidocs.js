/**
 * @api {post} / Authenticate A User
 * @apiName Authenticate A User
 * @apiGroup Login
 *
 * @apiParam {string} username Users unique username.
 * @apiParam {string} password Users unique password.
*/

/**
 * @api {post} /sign-up Create a new User/ Account
 * @apiName Create A New User/ Account
 * @apiGroup Sign-Up
 *
 * @apiParam {string} fName User's First name.
 * @apiParam {string} lName User's Last name.
 * @apiParam {string} email User's email.
 * @apiParam {string} username User's username.
 * @apiParam {string} password User's password.
*/

/**
 * @api {get} /Tag/:name Find a post with a given tag.
 * @apiName Find All Posts With A Given Tag
 * @apiGroup Tag
 *
 * @apiParam {URL-param} url.name The name of the tag you are searching.
*/


/**
 * @api {get} /user/ View current user info.
 * @apiName currentUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
*/

/**
 * @api {get} /user/:username Read a specific user's info.
 * @apiName showUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/

/**
 * @api {put} /user/:username Update the current user's info.
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {string} fName User's First name.
 * @apiParam {string} lName User's Last name.
 * @apiParam {string} email User's email.
 * @apiParam {string} username User's username.
 * @apiParam {string} password User's password.
*/

/**
 * @api {delete} /user/:username Delete the current user's account.
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/

/**
 * @api {get} /user/:username/posts List all the posts written by a specific user.
 * @apiName listUserPosts
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/

/**
 * @api {post} /user/:username/posts Create a new post as the current user.
 * @apiName createNewPost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {string} title Title of the post.
 * @apiParam {string} title Body of the post.
*/

/**
 * @api {get} /user/:username/posts/:postname Read a specific post written by a user.
 * @apiName readUserPost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/

/**
 * @api {put} /user/:username/posts/:postname Update a post written by the current user.
 * @apiName updatePost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
 * @apiParam {string} title Either the updated title or the current one.
 * @apiParam {string} body Either the updated body or the current one.
*/

/**
 * @api {delete} /user/:username/posts/:postname Delete a post written by the current user.
 * @apiName deletePost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/

/**
 * @api {post} /user/:username/posts/:postname Comment on a post as the current user.
 * @apiName commentOnPost
 * @apiGroup .Post-Comments
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
 * @apiParam {string} text Text which makes up the comment.
*/

/**
 * @api {get} /user/:username/posts/:postname/comments List all the comments on a given post.
 * @apiName listAllComments
 * @apiGroup .Post-Comments
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/
