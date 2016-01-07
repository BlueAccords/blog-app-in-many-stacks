'use strict';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { getToken } from '../utils/functions';

module.exports.create = (req, res) => {
  return User.find({$or: [
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

      return user.save()
      .then(user => {
        let token = getToken(user);

        return res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
          token: token,
        }).end();
      });
    } else {
      return res.status(400).json({
        errors: {
          email: ['This Username or Email is already taken.'],
        },
      });
    }
  });
};
module.exports.authenticate = (req, res) => {
  return User.findOne({
    email: req.body.user.email.toLowerCase(),
  })
  .then(user => {
    if (user === null) {
      return res.send({
        errors: {
          email: 'Invalid email address',
        },
      });
    } else {
      return bcrypt.compare(req.body.user.password, user.password, (err, result) => {
        if (result) {
          let token = getToken(user);

          return res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            },
            token: token,
          });
        } else {
          return res.json({
            errors: {
              password: ['Incorrect password'],
            },
          });
        }
      });
    }
  });
};

