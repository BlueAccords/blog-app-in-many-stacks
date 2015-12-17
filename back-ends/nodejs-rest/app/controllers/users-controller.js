'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from './../models/User';
import { generalErrorResponse } from '../utils/error-factory';

module.exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.user.email.toLowerCase(),
  })
  .then(user => {
    if (user === null) {
      res.json({
        msg: 'That user does not exist',
      });
    } else {
      bcrypt.compare(req.body.user.password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(user, config.jwt.secret, {
            expiresIn: 1440 * 60,
          });

          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            },
            token: token,
          });
        } else {
          res.json({
            msg: 'Incorrect password',
          });
        }
      });
    }
  })
};

module.exports.create = (req, res) => {
  User.find({$or: [
    {username: req.body.user.username.toLowerCase()},
    {email: req.body.user.email.toLowerCase()},
  ]})
  .then(users => {
    if (users.length === 0) {
      let user = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 8),
      });

      user.save();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return user;
    } else {
      res.json({
        msg: 'This Username or Email is already taken.',
      });
    }
  })
  .then(user => {
    let token = jwt.sign(user, config.jwt.secret, {
      expiresIn: 1440 * 60,
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  });
};

module.exports.get = (req, res, next) => {
  let the_id = req.params.id;
  return User.findById(the_id)
  .then(user => {
    if (user === null) {
      res.json({
        msg: 'This user does not exist',
      });
    } else {
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    }
  })
  .catch((err) => {
    generalErrorResponse(res, 'Something went wrong');
  });
};

module.exports.update = (req, res) => {
  let the_id = req.params.id;
  User.findOne({'_id': the_id})
  .then((user) => {
    if (req.user._id === the_id) {
      user.name = req.body.user.name || user.name;
      user.email = req.body.user.email || user.email;
      user.username = req.body.user.username || user.username;
      user.password = req.body.user.password || user.password;

      user.save();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return user;
    } else {
      res.json({
        msg: 'You are not authorized to do that.',
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
    });
  })
  .catch((err) => {
    generalErrorResponse(res, 'Something went wrong');
  });
};

module.exports.delete = (req, res) => {
  let the_id = req.params.id;

  User.findById(the_id)
  .then(user => {
    if (req.user._id === the_id) {
      user.remove();

      res.json({
        deleted_id: the_id,
      });
    } else {
      res.json({
        msg: 'You are not authorized to do that.',
      });
    }
  })
  .catch((err) => {
    generalErrorResponse(res, 'Something went wrong');
  });
};

module.exports.index = (req, res) => {
  if(req.query.username) {
    User.findOne({
      username: req.query.username,
    })
    .then(user => {
      res.json({
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      generalErrorResponse(res, 'Something went wrong');
    });
  } else {
    res.json({
      user: {
        msg: 'no user found fam',
      },
    });
  }
};
