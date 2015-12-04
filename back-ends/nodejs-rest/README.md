# Nodejs-Rest API Guide

### Important:
Routes with no stars means the route is public.

1 star ( * ) beside a route means you must be authorized with a token.

3 stars ( *** ) beside a route means you must be authorized with a token AND be the user you are trying to send a request to.

| Route                                        | Request type | Result                                                                                                                                                                                                   |
| -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                          | `POST`       | Login. If successful, a token is passed which can be stored and used to access other parts of the api (non-public routes).                                                                               |
| `/sign-up`                                   | `POST`       | Create a new user. Takes `fName`, `lName`, `email`, `username`, `password`.                                                                                                                              |
| `/user` *                                    | `GET`        | This route will return the current user.                                                                                                                                                                 |
| `/user/:username` *                          | `GET`        | If current user === :username display user info (like `/user`) else redirect to the users posts                                                                                                          |
| `/user/:username` ***                        | `PUT`        | Update a user's info.                                                                                                                                                                                    |
| `/user/:username` ***                        | `DELETE`     | Delete a user.                                                                                                                                                                                           |
| `/user/:username/posts` *                    | `GET`        | View a list of a users post.                                                                                                                                                                             |
| `/user/:username/posts` ***                  | `POST`       | Create a new post.                                                                                                                                                                                       |
| `/user/:username/posts/:postname` *          | `GET`        | Returns a specific post from a user. :postname is found via the post title. If the post title contains spaces, uses dash ( - ) to separate words.                                                        |
| `/user/:username/posts/:postname` *          | `POST`       | Create a new comment on a post. The name of the post which the comment will be submitted to is the value of `:postname`.                                                                                 |
| `/user/:username/posts/:postname` ***        | `PUT`        | Update an individual post.                                                                                                                                                                               |
| `/user/:username/posts/:postname` ***        | `DELETE`     | Delete an individual post.                                                                                                                                                                               |
| `/user/:username/posts/:postname/comments` * | `GET`        | View the list of comments for an individual post.                                                                                                                                                        |
| `/tags/:name`                                | `GET`        | View a list of posts (just their titles, which is what is used to link to an individual post in the url. wink wink.) that contains instances of a tag. The name of the tag is the value given to `:name` |
