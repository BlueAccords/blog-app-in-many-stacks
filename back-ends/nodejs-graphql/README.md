# Blog App In NodeJS + GraphQL

A blog API written in NodeJS and RelayJS compliant GraphQL.


## Setup
1. Install your packages with `npm install`

2. Make sure you have mongodb installed.

3. To get seed data run npm run seed

## Development

  1. use `npm start` to run the server.

  	- The dev server won't start unless mongodb is running.

## Notes
Whenever you make a change to any of the Graphql schema, you need to run the following before pushing your changes otherwise, the client won't know of the new schema:

    npm run update-schema

## Documentation
You can view the schema that this repo should conform to [here](../api-resources/graphql/schema.graphql)	. This exists purely to make sure all the graphql implementations conform to the same standards.

In a isolated project outside of this Blog app repo though, the schema.json and schema.graphql files [in the data folder](data/) would be authoritative.

## Testing

Tests are written with Mocha. You can run tests with the following:

  	npm test
  
A sample Postman collection is provided [here](../api-resources/graphql/blog-app-graphql.json.postman_collection) that you can use to test the API. You will need to create/use a postman environment called 'auto-token' and use the sign-in endpoint via postman. This will set your token via a 'test' for all future requests that need it. See [environments](https://www.getpostman.com/docs/environments) and [tests](https://www.getpostman.com/docs/writing_tests) for more info.


