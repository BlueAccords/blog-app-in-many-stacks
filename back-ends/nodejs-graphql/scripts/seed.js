'use strict';
/*
 * Only to be used in development
 */
require('dotenv').load();
if(process.env.NODE_ENV === 'development') {
  let config   = require('../config/application');
  let mongoose = require('mongoose');
  let bcrypt     = require('bcrypt');
  let User      = require('../app/models/User');

  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);

  // User seeds
  User.remove({})
  .then(function(){
    bcrypt.hash('testtest', 8, function(err, hash) {
      let user = new User({
        _id: '5634d4760066be016bf10c9a',
        name: 'Bruce Wayne',
        email: 'test@test.com',
        password: hash,
      });

      return user.save();
    });
  })
  .then(function(){
    bcrypt.hash('testtest', 8, function(err, hash) {
      let user = new User({
        _id: '5634d4750066be016bf10c9a',
        name: 'Kyle Townsbeginning',
        email: 'kyle@begin.com',
        password: hash,
      });

      return user.save();
    });
  })
  .then(function(){
    bcrypt.hash('testtest', 8, function(err, hash) {
      let user = new User({
        _id: '5634d4750066be016bf10c9r',
        name: 'King Bobby',
        email: 'bobby@googly.com',
        password: hash,
      });

      return user.save();
    });
  })

  .then(function(){
    console.log('Consider the seeds planted!');
    process.exit();
  });
}
