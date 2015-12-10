// NEW
'use strict';

let env  = process.env.NODE_ENV;
// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
// Load dotenv
if(env === 'development') {
  require('dotenv').load();
}
process.chdir(__dirname);

//Allow the use of more es6 features within the node project, such as es6 imports, etc.
require('babel/register');

let express       = require('express');
let mongoose      = require('mongoose');
let cookieParser  = require('cookie-parser');
let app           = express();
let config        = require('./config');
let bodyParser    = require('body-parser');
let morgan        = require('morgan');
let cors          = require('cors');
let path          = require('path');

// connect to Mongo when the app initializes
// No password needed in development
if(env === 'development') {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);
} else if(env === 'test') {
  // Will be created in each test
} else {
  mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`);
}

// on successful connect
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

// If the connection throws an error
mongoose.connection.on('error',(err) => {
  console.log('Mongoose error: ' + err);
});

app.set('secretKey', config.app.secret);

//Enable all cors requests
app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Log requests to the console
app.use(morgan('dev'));
// Routes
app.use(express.static(__dirname + '/../apidocs/build'));
app.get('/api-documentation', (req, res) => {
  res.sendfile(path.resolve(__dirname + '/../apidocs/build/index.html'));
});
app.use(require('./app/routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});

let port;

if(env !== 'test') {
  port = process.env.WEB_PORT;
}

let server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;
