var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB is working properly');
});

app.use(routes);

app.listen(3000, function(err){
  if (err) console.log(err);
  else console.log('View your app on port: 3000');
});
