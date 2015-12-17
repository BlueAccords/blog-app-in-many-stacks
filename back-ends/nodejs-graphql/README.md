# blog-backend-api

The Blog Backend API.

### Loose coventions
Eslint should handle the majority of conventions but please also [read this](https://gist.github.com/chiedojohn/50f5cf4e900523e24586)

## Setup
Copy .env.example to .env and populate all necessary values.

Install your packages.

  npm install

You will need to have mongodb installed.

## Development

  use `npm start` to run the server.

  The dev server won't start unless mongodb is running.

  Whenever you make a change to any of the Graphql schema, you need to run the following before pushing your changes otherwise, the client won't know of the new schema:

    npm run update-schema

  To get seed data, run:

    npm run seed

  If you have issues, drop your database first.

A sample Postman collection is provided at the `blog-app-in-many-stacks/back-ends/api-resources/graphql` directory.
