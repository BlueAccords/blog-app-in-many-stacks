# Blog App In Many Stacks - RESTful-NodeJS

### Setup

Make sure you have an `NODE_ENV` environment variable set on your machine and have it set to 'development'.

Copy `.env.example` to `.env` and populate all necessary values.

Install your packages by running `npm install`.

You will need to have MongoDB installed.

### Conventions
ESLint will handle most of the style and conventions of the project.

### Development

use `npm start` to run the server.

Nodemon will update changes automatically.

Check the console for errors.

A sample Postman collection is provided at the `blog-app-in-many-stacks/back-ends/api-resources/rest` directory.

To get seed data run. `npm run seed`

### Documentation

To view the api documentation, start the app and visit /api-documentation.

The api documentation style is with apidocs.js. Please be sure to follow the apidocs.js standards when editing controllers.

To update the documentation run `npm run update-docs`
