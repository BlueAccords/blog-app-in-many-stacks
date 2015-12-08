// NEW
'use strict';

let env  = process.env.NODE_ENV;
// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
// Load dotenv
if(env === 'development' || env === 'test') {
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
let mockgoose     = require('mockgoose');

// connect to Mongo when the app initializes
// No password needed in development
if(env === 'development' || env === 'test') {
  if(env === 'test') {
    mockgoose(mongoose);
  }
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);
} else {
  mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`);
}

app.set('secretKey', config.app.secret);

//Enable all cors requests
app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Log requests to the console
app.use(morgan('dev'));
// Routes
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});
let server;
if(env === 'test') {
  server = app.listen(process.env.TEST_PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Test server running at http://%s:%s', host, port);

  });
} else {
  server = app.listen(process.env.WEB_PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
}
module.exports = server;
