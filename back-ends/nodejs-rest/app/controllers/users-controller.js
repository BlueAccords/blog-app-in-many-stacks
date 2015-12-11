'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from './../models/User';

module.exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.email.toLowerCase(),
  })
  .then(user => {
    if (user === null) {
      res.json({
        msg: 'That user does not exist'
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(user, config.jwt.secret, {
            expiresIn: 1440 * 60
          });

          res.json({
            token: 'Bearer ' + token,
          });
        } else {
          res.json({
            msg: 'Incorrect password'
          });
        }
      });
    }
  });
};

module.exports.create = (req, res) => {
  User.find({$or: [
    {username: req.body.username.toLowerCase()},
    {email: req.body.email.toLowerCase()}
  ]})
  .then(users => {
    if (users.length === 0) {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      user.save();
      return user
    } else {
      res.json({
        msg: 'This Username or Email is already taken.',
      });
    }
  })
  .then(user => {
    let token = jwt.sign(user, config.jwt.secret, {
      expiresIn: 1440 * 60
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token: 'Bearer ' + token,
    });
  })
};

module.exports.get = (req, res) => {
  let the_id = req.params.id;

  console.log(the_id);
  console.log(req.user._id);

  User.findById(the_id)
  .then(user => {
    if (user === null) {
      res.json({
        msg: 'This user does not exist'
      })
    } else {
      res.json({
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    }
  });
};

module.exports.update = (req, res) => {
  let the_id = req.params.id;

  User.findById(the_id)
  .then(user => {
    if (req.user._id === the_id) {
      user.name = req.body.name || user.name,
      user.email = req.body.email || user.email,
      user.username = req.body.username || user.username,
      user.password = req.body.password || user.password,

      user.save()
      return user;
    } else {
      res.json({
        msg: 'You are not authorized to do that.'
      });
    }
  })
  .then(user => {
    res.json({
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
    })
  });
};

module.exports.delete = (req, res) => {
  let the_id = req.params.id;

  User.findById(the_id)
  .then(user => {
    if (req.user._id === the_id) {
      user.remove()

      res.json({
        deleted_id: the_id,
      });
    } else {
      res.json({
        msg: 'You are not authorized to do that.'
      });
    }
  });
};
