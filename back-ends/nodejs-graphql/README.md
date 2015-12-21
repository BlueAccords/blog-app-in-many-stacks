# blog-backend-api

The Blog Backend API.

### Loose coventions
Eslint should handle the majority of conventions but please also [read this](https://gist.github.com/chiedojohn/50f5cf4e900523e24586)

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
A sample Postman collection is provided [here](../api-resources/graphql/blog-app-graphql.json.postman_collection) that you can use to test the API.
