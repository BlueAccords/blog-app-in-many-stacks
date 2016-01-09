'use strict';
import ob from 'objob';
import faker from 'faker';

let token = {
  description: 'Authentication token for a user.',
  example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
};

let tag = {
  'id': { description: 'The id.', example: '5634d4760066be016bf10c09'},
  'text': { description: 'The public representation of the tag.', example: () => faker.lorem.words()[0]},
};

let user = {
  'id': { description: 'The id', example: '5634d4760066be016bf10c09'},
  'name': { description: 'The name', example: 'Jane Doe'},
  'email':{
    description:'Email address',
    example: () => {
      return faker.internet.email();
    },
  },
  'username': { description: 'The username', example: 'janedoe'},
  'password': { description: 'The password', example: 'testtest'},
  'date_created': { description: 'Date created', example: '2015-10-31T14:47:18.000Z'},
  'date_modified': { description: 'Date modified', example: '2015-10-31T14:47:18.000Z'},
};

let post = {
  'id': { description: 'The id', example: '5634d4760066be016bf10c09'},
  'url_path': { description: 'The path for the url on the website.', example: 'example-title'},
  'title': { description: 'The title for the blog post', example: () => faker.lorem.sentence()},
  'body': { description: 'The content for the blog post.', example: () => faker.lorem.paragraph()},
  'user_id': { description: 'The id of the user who wrote the post', example: '5634d4760066be016bf10c09'},
  'tags': {
    description: 'All the tags for the post',
    example: [tag, tag, tag],
  },
  'date_created': { description: 'Date created', example: '2015-10-31T14:47:18.000Z'},
  'date_modified': { description: 'Date modified', example: '2015-10-31T14:47:18.000Z'},
};

let comment = {
  'id': { description: 'The id', example: '5634d4760066be016bf10c09'},
  'text': { description: 'The content for the comment', example: () => faker.lorem.paragraph()},
  'user_id': { description: 'The Id for the user who posted the comment', example: '5634d4760066be016bf10c09'},
  'post_id': { description: 'The ID for the post this comment is on.', example: '5634d4760066be016bf10c09'},
  'date_created': { description: 'Date created', example: '2015-10-31T14:47:18.000Z'},
  'date_modified': { description: 'Date modified', example: '2015-10-31T14:47:18.000Z'},
};

/*******************************************
 * ERRORS
 *******************************************/

let unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      example: {
        unauthorized: {
          description: 'An array of messages stating that a user is not authorized',
          example: ['You are not authorized'],
        },
      },
    },
  },
};

let permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      example: {
        permissions: {
          example: ['You do not have permissions to perform this action.'],
          description: 'An array of messages about a user\'s permission errors',
        },
      },
    },
  },
};

let notFoundError = {
  name: 'Not found',
  status: 404,
  body: 'Not found',
};


/*******************************************
 * HEADERS
 *******************************************/
let tokenHeader = {
  key: 'Authorization',
  description: 'This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with "Bearer: "',
  example: 'Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI',
};

/*******************************************
 * USERS
 *******************************************/
let createUserBody = ob.pick(user, ['name', 'email', 'username', 'password']);
createUserBody.name.optional = true;

let createUserFieldErrorsBody = ob.omit(user, ['date_created','date_modified', 'id']);
for (let i in createUserFieldErrorsBody) {
  createUserFieldErrorsBody[i].description = ['Descriptive Errors about this field. There could be more than one since it\'s in an array'];
  createUserFieldErrorsBody[i].example = ['Error message one', 'Error message two'];
}

let createUser = {
  name: 'Create user',
  method: 'POST',
  description: 'Allows someone to create a user.',
  params: {
    body: {user: {example: createUserBody, description: 'The user'}},
  },
  headers: [ tokenHeader ],
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The user',
          example: ob.pick(user, ['id','name', 'email', 'username', 'date_created', 'date_modified']),
        },
        token: token,
      },
    },
    {
      name: 'Field Errors',
      status: 400,
      body: {
        errors: {
          example: createUserFieldErrorsBody,
        },
      },
    },
    unauthorizedError,
    permissionsError,
    notFoundError,
  ],
};

let getUser = {
  name: 'Get user',
  method: 'GET',
  params: {
    url: ob.pick(user, ['id']),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The user',
          example: ob.pick(user, ['id','name', 'username']),
        },
      },
    },
    notFoundError,
  ],
};

let deleteUser = {
  name: 'Delete User',
  method: 'DELETE',
  headers: [ tokenHeader ],
  params: {
    url: ob.pick(user, ['id']),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        deleted_id: {
          description: 'The ID of the deleted user.',
          example: '5634d4760066be016bf10c09',
        },
      },
    },
    unauthorizedError,
    permissionsError,
    notFoundError,
  ],
  headers: [ tokenHeader ],
};

let updateUserBody = ob.pick(user, ['name', 'email', 'username']);
updateUserBody.name.optional = true;
updateUserBody.email.optional = true;
updateUserBody.username.optional = true;

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  headers: [ tokenHeader ],
  params: {
    url: ob.pick(user, ['id']),
    body: updateUserBody,
  },
  responses: createUser.responses,
};

let getUserByUsername = {
  name: 'Get user by the username',
  method: 'GET',
  params: {
    query: {
      'username': {
        'description': 'When set, the user with the username will be returned',
      },
    },
  },
  responses: getUser.responses,
};

let signInFieldErrors = ob.pick(user, ['email', 'password']);
signInFieldErrors.email.description = 'An array of errors about the email address';
signInFieldErrors.password.description = 'An array of errors about the password';
signInFieldErrors.email.example = ['There is no account with this email address.'];
signInFieldErrors.password.example = ['Your password was invalid'];

let signIn = {
  name: 'Authenticate a user',
  method: 'POST',
  params: {
    body: {
      user: {
        example: ob.pick(user, ['email','password']),
      },
    },
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        token: token,
      },
    },
    {
      name: 'Field Errors',
      status: 400,
      body: {
        errors: {
          example: signInFieldErrors,
        },
      },
    },
    unauthorizedError,
  ],
};

/**********************************
 * POSTS
 **********************************/
let createPostResponse = ob.clone(post);
createPostResponse.tags = {example: [tag, tag, tag], description: 'All the tags attached to the post'};

let createPost = {
  name: 'Create post',
  method: 'POST',
  description: 'Allows someone to create a user.',
  headers: [ tokenHeader ],
  params: {
    body: {post: {example: ob.pick(post, ['title', 'body']), description: 'The post'}},
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        post: {
          description: 'The post',
          example: createPostResponse,
        },
      },
    },
    unauthorizedError,
    permissionsError,
    notFoundError,
  ],
};

let updatePostBody = ob.pick(post, ['title', 'url_path', 'body']);
updatePostBody.title.optional = true;
updatePostBody.url_path.optional = true;
updatePostBody.body.optional = true;

let updatePost = {
  name: 'Update post',
  method: 'PUT',
  headers: [ tokenHeader ],
  params: {
    url: ob.pick(post, ['id']),
    body: updatePostBody,
  },
  responses: createPost.responses,
};

let getPosts = {
  name: 'Get posts',
  method: 'GET',
  params: {
    query: {
      'url_path': {
        'description': 'When set, instead of returning all posts, only one post will be returned in the same format as /posts/:id',
      },
    },
  },
  responses: [
    {
      name: 'Success Response',
      status: 200,
      body: {
        posts: {
          description: 'The posts',
          example: [post, post, post],
        },
      },
    },
  ],
  description: '<p>Returns all posts.</p>',
};

let getPostsByTagId = {
  name: 'Get posts By tag ID',
  method: 'GET',
  params: {
    url: {
      'tag_id': {
        'description': 'The ID of the tag you want the posts for.',
      },
    },
  },
  responses: getPosts.responses,
  description: '<p>Returns all posts that have a given tag.</p>',
};

let getPostsByUserId = {
  name: 'Get posts By User ID',
  method: 'GET',
  params: {
    url: {
      'user_id': {
        'description': 'The ID of the user you want the posts for.',
      },
    },
  },
  responses: getPosts.responses,
  description: '<p>Returns all posts written by a given user</p>',
};

let getPost = {
  name: 'Get post',
  method: 'GET',
  params: {
    url: {
      'id': {
        'description': 'The ID of the post to retrieve.',
      },
    },
  },
  responses: [
    {
      name: 'Success Response',
      status: 200,
      body: {
        post: {
          description: 'The post',
          example: post,
        },
      },
    },
    notFoundError,
  ],
};

let getPostByUrlPath = {
  name: 'Get post by URL Path',
  method: 'GET',
  params: {
    query: {
      'url_path': {
        'description': 'When set, only one the post with the url_path will be returned',
      },
    },
  },
  responses: getPost.responses,
};

/******************************************
 * TAGS
 ******************************************/
let getTagByText = {
  name: 'Get tag by tag text',
  method: 'GET',
  params: {
    query: {
      'text': {
        'description': 'When set, the tag with the given text will be returned.',
      },
    },
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The tag',
          example: tag,
        },
      },
    },
    notFoundError,
  ],
};

/*******************************************
 * COMMENTS
 *******************************************/
let getCommentsByPostID = {
  name: 'Get all comments for a post',
  method: 'GET',
  params: {
    url: {post_id: {description: 'The Id of the post we want comments for'}},
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        comments: {
          description: 'The comments',
          example: [comment, comment, comment],
        },
      },
    },
    notFoundError,
  ],
};

let getComment = {
  name: 'Get comment',
  method: 'GET',
  params: {
    url: {id: {description: 'The Id of the comment we want'}},
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        comment: {
          description: 'The comment',
          example: comment,
        },
      },
    },
    notFoundError,
  ],
};

let createComment = {
  name: 'Get comment',
  method: 'GET',
  headers: [ tokenHeader ],
  params: {
    url: {post_id: {description: 'The Id of the post we want comments for'}},
    body: {
      comment: ob.pick(comment, ['text']),
    },
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        comment: {
          description: 'The comment',
          example: comment,
        },
      },
    },
    notFoundError,
    unauthorizedError,
  ],
};

/*******************************************
 * TOGGLE TAG ON POST
 *******************************************/
let toggleTagOnPost = {
  name: 'Toggle Tag on Post',
  method: 'POST',
  description: '<p>Adds a tag to a post if it doesn\'t exist. Removes it otherwise.</p>',
  headers: [ tokenHeader ],
  params: {
    body: {
      post_id: {
        description: 'The Id of the post to toggle the tag on',
        example: '5634d4760066be016bf10c09',
      },
      tag_id: {
        description: 'The Id of the tag to toggle on the post',
        example: '3634d4760046be006bf10c09',
      },
    },
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        post: {
          description: 'The modified post',
          example: post,
        }
      }
    },
    notFoundError,
    unauthorizedError,
    permissionsError,
  ],
};


/******************************************
 * EXPORT
 ******************************************/
module.exports = {
  name: 'Blog app REST API',
  description: 'Documentation for all versions of the REST API.',
  paths: {
    '/users': {
      actions: [ createUser, getUserByUsername ],
    },
    '/users/:id': {
      actions: [ getUser, updateUser, deleteUser ],
    },
    '/posts': {
      actions: [ createPost, getPosts, getPostByUrlPath ],
    },
    '/posts/:id': {
      actions: [ updatePost, getPost ],
    },
    '/tags': {
      actions: [ getTagByText ],
    },
    '/tags/:tag_id/posts': {
      actions: [getPostsByTagId],
    },
    '/users/:user_id/posts': {
      actions: [getPostsByUserId],
    },
    '/posts/:post_id/comments': {
      actions: [getCommentsByPostID, createComment],
    },
    '/comments/:id': {
      actions: [getComment],
    },
    '/sign-in': {
      actions: [signIn],
    },
    '/toggle-tag-on-post': {
      actions: [toggleTagOnPost],
    },
  },
};
