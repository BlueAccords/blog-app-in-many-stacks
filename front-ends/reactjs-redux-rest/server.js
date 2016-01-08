'use strict';
let env  = process.env.NODE_ENV || 'development';
let path = require('path');
let fs = require('fs');
let express = require('express');

fs.stat('.env', (err, stat) => {
  if(err === null) {
    require('dotenv').load();
  }
});

const PORT = process.env.PORT || 4001;

let app = express();

if(env === 'development') {
  let webpack = require('webpack');
  let config = require('./webpack.config.dev');
  let compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// Allows for the use of other static resources
app.use('/static', express.static('dist/static'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  // We set padding on development for redux dev tools
  let PADDING_RIGHT;
  env === 'development' ? PADDING_RIGHT = '30%': PADDING_RIGHT = '0';
  res.render(path.join(__dirname, 'index.ejs'), {
    API_URL: process.env.API_URL || 'http://localhost:8000',
    PADDING_RIGHT,
  });
});


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at port ${PORT}`);
});
