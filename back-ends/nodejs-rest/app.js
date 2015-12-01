var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./routes/index'),
    app = express();

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/blog_test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {console.log('DB is working properly');});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.get('*', function(req, res){
  res.sendStatus(404);
});

app.listen(3000, function(err){
  if (err) console.log(err);
  else console.log('View your app on port: 3000');
});
