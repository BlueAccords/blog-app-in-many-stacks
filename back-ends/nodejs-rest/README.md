# Blog App In Many Stacks - RESTful-NodeJS

### Setup

1. Make sure you have an `NODE_ENV` environment variable set on your machine and have it set to 'development'.

2. Copy `.env.example` to `.env` and populate all necessary values.

3. Install your packages by running `npm install`.

4. Make sure you will need to have MongoDB installed.

5. To get seed data run. `npm run seed`

### Conventions
ESLint will handle most of the style and conventions of the project.

### Development

1. Start your mongodb server

2. use `npm start` to run the server.

	- Nodemon will update changes automatically.

	- Check the console for errors.

### Testing:

A sample Postman collection is provided [here](../api-resources/rest/blog-app-rest.json.postman_collection) that you can import and use for testing the API.

### Documentation

You may view the REST API documentation that this back-end should conform to [here](https://rawgit.com/chiedolabs/blog-app-in-many-stacks/master/back-ends/api-resources/rest/build/index.html).
