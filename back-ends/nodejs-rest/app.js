var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var app = express();

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {console.log('DB is working properly');});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.listen(3000, function(err){
  if (err) console.log(err);
  else console.log('View your app on port: 3000');
});
