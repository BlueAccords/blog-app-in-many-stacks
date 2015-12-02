'use strict';

require('babel-core/register');

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let routes = require('./routes/index');
let config = require('./config');
let app = express();

let db = mongoose.connection;
mongoose.connect(config.database);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('DB is working properly.');});

app.set('secretKey', config.secret);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, (err) => {
  if (err) {console.log(err);}
  else {console.log('View your app on port: 3000...');}
});
