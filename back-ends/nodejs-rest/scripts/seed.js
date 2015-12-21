'use strict';
//Allow the use of more es6 features within the node project, such as es6 imports, etc.
require('babel/register');
/*
 * Only to be used in development
 */
require('dotenv').load();
if(process.env.NODE_ENV === 'development') {
  let config   = require('../config/application');
  let mongoose = require('mongoose');
  let bcrypt     = require('bcrypt');

  let Comment   = require('../app/models/Comment');
  let Post      = require('../app/models/Post');
  let Tag       = require('../app/models/Tag');
  let User      = require('../app/models/User');

  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`);

  // User seeds
  User.remove({})
  .then(() => {
    let user = new User({
      _id: '5634d4760066be016bf10c9a',
      name: 'Bruce Wayne',
      email: 'test@test.com',
      username: 'test',
      // Hardcoded password to make deterministic
      password: '$2a$08$VfIdeznkm4ebLtloSHiEqO26RTkGSjRoLEI.mB/EkMPt/5jipIS1e',
    });

    return user.save();
  })
  .then(() => {
    bcrypt.hash('testtest', 8, (err, hash) => {
      let user = new User({
        _id: '5634d4750066be016bf10c9a',
        name: 'Kyle Townsbeginning',
        email: 'kyle@begin.com',
        username: 'kyle',
        password: hash,
      });

      return user.save();
    });
  })
  .then(() => {
    bcrypt.hash('testtest', 8, (err, hash) => {
      let user = new User({
        _id: '5634d4750066be016bf10c9r',
        name: 'King Bobby',
        email: 'bobby@googly.com',
        username: 'bobby',
        password: hash,
      });

      return user.save();
    });
  })

  // Tag seeds
  .then(() => Tag.remove({}))
  .then(() => {
    let tag = new Tag({
      _id: '5672c893dfad0d9fc16ae47f',
      text: 'cooking-skills',
    });
    return tag.save();
  })
  .then(() => {
    let tag = new Tag({
      _id: '5672c893dfad0d9fc16ae480',
      text: 'outdoor-skills',
    });
    return tag.save();
  })
  .then(() => {
    let tag = new Tag({
      _id: '5672c893dfad0d9fc16ae481',
      text: 'plumbing-skills',
    });
    return tag.save();
  })
  .then(() => {
    let tag = new Tag({
      _id: '5672c823dfad0d9fc16ae481',
      text: 'swag',
    });
    return tag.save();
  })

  //Post seeds
  .then(() => Post.remove({}))
  .then(() => {
    let post = new Post({
      _id: '5634d4760066be016bf10c9r',
      title: 'How to boil an egg',
      body: 'Step 1: heat up water, step 2: put the eggs in the water, step 3: boil for 10 minutes, step 4: run cold water over them',
      _author: '5634d4760066be016bf10c9a', // bruce wayne
      url_path:'how-to-boil-an-egg',
      tags: ['5672c893dfad0d9fc16ae481', '5672c893dfad0d9fc16ae47f'],
    });
    return post.save();
  })
  .then(() => {
    let post = new Post({
      _id: '5634d4760066be016bf10a8r',
      title: 'How to play basketball',
      body: 'Step 1: Dribble, step 2: Pass, step 3: Shoot, step 4: Score!',
      _author: '5634d4750066be016bf10c9a', // kyle@begin.com
      url_path:'how-to-play-basketball',
    });
    return post.save();
  })
  .then(() => {
    let post = new Post({
      _id: '5624d4760066be016bf10a8r',
      title: 'How to fix a clogged drain',
      body: 'Step 1: Buy some draino, step 2: pour it down the drain, step 3: Voila!',
      _author: '5634d4750066be016bf10c9r', // King bobby
      url_path:'how-to-fix-a-clogged-drain',
    });
    return post.save();
  })

  // Comment seeds
  .then(() => Comment.remove({}))
  .then(() => {
    let comment = new Comment({
      _id: '5634d4760067be016bf10c9e',
      _post : '5634d4760066be016bf10a8r', // how to play basketball => author: Kyle@begin.com
      _author : '5634d4760066be016bf10c9a', // commenter: bruce wayne
      text: 'Thanks Kyle for the great post, I will now master the court like Dwayne Wade',
    });
    return comment.save();
  })

  .then(() => {
    let comment = new Comment({
      _id: '5634d4760066be016bf10c9e',
      _post : '5634d4760066be016bf10c9r', // how to boil an egg => author: Bruce Wayne
      _author : '5634d4750066be016bf10c9a', // commenter: kyle@begin.com
      text: 'Thanks Bruce for the post, very helpful!',
    });
    return comment.save();
  })


  .then(() => {
    let comment = new Comment({
      _id: '5634d4760067be016bf19c9e',
      _post : '5624d4760066be016bf10a8r', // how to fix a clogged drain => author: King Bobby
      _author : '5634d4760066be016bf10c9a', // commenter: bruce wayne
      text: 'Thanks King Bobby, my drain is now flowing like the river Nile',
    });
    return comment.save();
  })

  .then(() => {
    console.log('Consider the seeds planted!');
    process.exit();
  });
}
