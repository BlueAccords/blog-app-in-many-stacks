# Blog App In Rails + REST

A blog API written in NodeJS and REST.

### Setup

1. Make sure you have an `RAILS_ENV` environment variable set on your machine and have it set to 'development'.

2. Install your packages by running `bundle install`.

3. Make sure you have Mysql installed.

4. Create the database with `bundle exec rake db:create`
 
5. Migrate the database with `bundle exec rake db:migrate`

6. To get seed data run. `bundle exec rake db:seed`

7. You can override any environment variables such as the mysql port with a dotenv file if you wish. [Read more](https://github.com/bkeepers/dotenv)

### Development

1. Start your mysql server

2. use `bundle exec rails s -p 8000` to run the server.

### Testing:

Tests are written using rspec. You can run tests with the following:

  	bundle exec rspec

A sample Postman collection is provided [here](../api-resources/rest/blog-app-rest.json.postman_collection) that you can import and use for testing the API.

### Documentation

You may view the REST API documentation that this back-end should conform to [here](https://rawgit.com/chiedolabs/blog-app-in-many-stacks/master/back-ends/api-resources/rest/build/index.html).