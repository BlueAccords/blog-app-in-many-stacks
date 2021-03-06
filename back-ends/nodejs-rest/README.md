# Blog App In NodeJS + REST

A blog API written in NodeJS v4.2 and REST.


### Setup

1. Make sure you have an `NODE_ENV` environment variable set on your machine and have it set to 'development'.

2. Install your packages by running `npm install`.

3. Make sure you will need to have MongoDB installed.

4. To get seed data run. `npm run seed`

### Conventions
ESLint will handle most of the style and conventions of the project.

### Development

1. Start your mongodb server

2. use `npm start` to run the server.

	- Nodemon will update changes automatically.

	- Check the console for errors.

### Testing:

Tests are written using mocha. You can run tests with the following:

  	npm run test

A sample Postman collection is provided [here](../api-resources/rest/blog-app-rest.json.postman_collection) that you can import and use for testing the API. You will need to create/use a postman environment called 'auto-token' and use the sign-in endpoint via postman. This will set your token via a 'test' for all future requests that need it. See [environments](https://www.getpostman.com/docs/environments) and [tests](https://www.getpostman.com/docs/writing_tests) for more info.

 
### Documentation

You may view the REST API documentation that this back-end should conform to [here](https://rawgit.com/chiedolabs/blog-app-in-many-stacks/master/back-ends/api-resources/rest/build/index.html).
