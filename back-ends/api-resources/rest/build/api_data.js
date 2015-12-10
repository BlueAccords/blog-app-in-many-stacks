define({ "api": [  {    "type": "post",    "url": "/sign-in",    "title": "Authenticate a user",    "name": "Authenticate_a_user",    "group": "Authentication",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.password",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Authentication"  },  {    "type": "post",    "url": "/posts/:post_id/comments",    "title": "Create a comment",    "name": "Create_a_comment",    "group": "Comments",    "description": "<ul> <li>Any user that is logged in can create a comment</li> </ul> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post_id",            "description": "<p>The post id</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "comment",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "comment.text",            "description": "<p>The comment text</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Comments",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "comment",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "comment.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.text",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "get",    "url": "/comments/:id",    "title": "Delete comment",    "name": "Delete_comment",    "group": "Comments",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The comment id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Comments",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "deleted_id",            "description": "<p>The ID of the deleted resource.</p> "          }        ]      }    }  },  {    "type": "get",    "url": "/posts/:post_id/comments",    "title": "Get comments by post",    "name": "Get_comments_by_post",    "group": "Comments",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post_id",            "description": "<p>The post id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Comments",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object[]</p> ",            "optional": false,            "field": "comments",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "comments.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comments.text",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comments.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comments.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "put",    "url": "/comments/:id",    "title": "Update comment",    "name": "Update_comment",    "group": "Comments",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The comment id</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "comment",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "comment.text",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Comments",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "comment",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "comment.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.text",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "comment.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "post",    "url": "/posts",    "title": "Create post",    "name": "Create_post",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "post",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post.title",            "description": "<p>The title of the post</p> "          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "post.body",            "description": "<p>The post content</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "post",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "post.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_modified",            "description": ""          }        ]      }    },    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    }  },  {    "type": "delete",    "url": "/posts/:id",    "title": "Delete post",    "name": "Delete_post",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The post ID</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "deleted_id",            "description": "<p>The ID of the deleted resource.</p> "          }        ]      }    }  },  {    "type": "get",    "url": "/tag/:tag_id/posts",    "title": "Get posts by tag",    "name": "Get_all_posts_by_tag",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "tag_id",            "description": "<p>The tag's id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object[]</p> ",            "optional": false,            "field": "posts",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "posts.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "get",    "url": "/user/:user_id/posts",    "title": "Get posts by user",    "name": "Get_all_posts_by_user",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_id",            "description": "<p>The user's id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object[]</p> ",            "optional": false,            "field": "posts",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "posts.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "get",    "url": "/posts/:id",    "title": "Get post",    "name": "Get_post",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The post id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "post",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "post.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "get",    "url": "/posts",    "title": "Get all posts",    "name": "Get_posts",    "description": "<p>Get all posts</p> ",    "group": "Posts",    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object[]</p> ",            "optional": false,            "field": "posts",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "posts.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "posts.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "put",    "url": "/posts/:id",    "title": "Update post",    "name": "Update_post",    "group": "Posts",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The post ID</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "post",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "post.title",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "post.body",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Posts",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "post",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "post.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.title",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.body",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "post.date_modified",            "description": ""          }        ]      }    }  },  {    "type": "post",    "url": "/posts/:post_id/tags",    "title": "Create a tag",    "name": "Create_a_tag",    "group": "Tags",    "description": "<ul> <li>Any user that is logged in can create a tag</li> </ul> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post_id",            "description": "<p>The post id</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "tag",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "tag.text",            "description": "<p>The tag text</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Tags",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "tag",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "tag.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "tag.text",            "description": ""          }        ]      }    }  },  {    "type": "get",    "url": "/tags/:id",    "title": "Delete tag",    "name": "Delete_tag",    "group": "Tags",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The tag id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Tags",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "deleted_id",            "description": "<p>The ID of the deleted resource.</p> "          }        ]      }    }  },  {    "type": "get",    "url": "/posts/:post_id/tags",    "title": "Get tags by post",    "name": "Get_tags_by_post",    "group": "Tags",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post_id",            "description": "<p>The post id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Tags",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object[]</p> ",            "optional": false,            "field": "tags",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "tags.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "tags.text",            "description": ""          }        ]      }    }  },  {    "type": "put",    "url": "/tags/:id",    "title": "Update tag",    "name": "Update_tag",    "group": "Tags",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The tag id</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "tag",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "tag.text",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "Tags",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "tag",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "tag.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "tag.text",            "description": ""          }        ]      }    }  },  {    "type": "post",    "url": "/user",    "title": "Create user",    "name": "Create_user",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user.name",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.password",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "user.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.name",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_modified",            "description": ""          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "token",            "description": "<p>The user's jwt token</p> "          }        ]      }    }  },  {    "type": "delete",    "url": "/user/:id",    "title": "Delete user",    "name": "Delete_user",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The user's id</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "User",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "deleted_id",            "description": "<p>The ID of the deleted resource.</p> "          }        ]      }    }  },  {    "type": "get",    "url": "/user/:id",    "title": "Get user",    "name": "Get_user",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The user ID</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "User",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "user.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.name",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_modified",            "description": ""          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "token",            "description": "<p>The user's jwt token</p> "          }        ]      }    }  },  {    "type": "put",    "url": "/user/:id",    "title": "Update user",    "name": "updateUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>The user ID</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user.name",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Parameter",            "type": "<p>string</p> ",            "optional": false,            "field": "user.password",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/apidocs.js",    "groupTitle": "User",    "header": {      "fields": {        "Authentication Headers": [          {            "group": "Authentication Headers",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Value will be in the following format 'Bearer: tokenvalue'. This token will be used to ensure the user has permissions to access a requested resource. Site admins can access any resource.</p> "          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Object</p> ",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "user.id",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.name",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_created",            "description": ""          },          {            "group": "Success 200",            "type": "<p>string</p> ",            "optional": false,            "field": "user.date_modified",            "description": ""          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "token",            "description": "<p>The user's jwt token</p> "          }        ]      }    }  }] });