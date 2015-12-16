Rails-starter
=============

##Local Setup
- Make sure you have an environment variable set up on your host machine which sets RAILS_ENV to development.
- Create an .env file with the following contents within your application directory (Update the port, username and password in accordance with your local database setup)

        #MYSQL
        MYSQL_DATABASE=YOURAPPNAME_development
        MYSQL_USER=root
        MYSQL_PASS=root
        MYSQL_HOSTNAME=127.0.0.1
        MYSQL_PORT=8889
        SECRET_KEY_BASE=MAKE_SOMETHING_UP

##LOCAL API DOCS
- blog-app-in-many-stacks/back-ends/api-resources/rest/build/index.html 

##Running the rails server

`bundle exec rails s -p 8000`

##Important Dependencies
- RABL (Creates JSON views)
