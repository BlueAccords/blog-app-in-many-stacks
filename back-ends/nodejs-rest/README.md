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

A sample Postman collection is provided inside of the `Data/` directory.

### Documentation

To view the api documentation, open the `index.html` file inside of `apidocs/` in your browser.

Place updates made to the api in `app/apidocs.js`.

Follow the conventions in the file.

Make sure apidoc is installed globally. If not run `npm i -g apidoc`.

To update the documentation run `apidoc -i app/ -o apidocs/` and double check to make sure the docs have been updated.
