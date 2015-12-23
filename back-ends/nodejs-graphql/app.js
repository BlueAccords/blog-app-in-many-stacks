'use strict';
let fs = require('fs');

let env  = process.env.NODE_ENV;
// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
// Load dotenv
fs.stat('.env', (err, stat) => {
  if(err === null) {
    require('dotenv').config({silent: true});
  }
});

process.chdir(__dirname);

//Allow the use of more es6 features within the node project, such as es6 imports, etc.
require('babel/register');

let express       = require('express');
let mongoose      = require('mongoose');
let app           = express();
let config        = require('./config/application');
let bodyParser    = require('body-parser');
let morgan        = require('morgan');
let cors          = require('cors');

// connect to Mongo when the app initializes
// No password needed in development
if(env === 'development') {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);
} else if(env !== 'test') {
  mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`);
}

//Enable all cors requests
app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This may need to go but allows for better postman usage of graphql requests
app.use(bodyParser.text({ type: 'application/graphql' }));

// Log requests to the console
app.use(morgan('dev'));
// Routes
app.use('/media', express.static(__dirname + '/media'));
app.use(require('./app/routes'));

let port;

if(env !== 'test') {
  port = process.env.PORT || 8000;
}

let server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;
