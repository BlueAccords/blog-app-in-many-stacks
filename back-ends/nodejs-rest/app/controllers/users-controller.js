'use strict';

import bcrypt from 'bcrypt';
import User from './../models/User';
import { getToken } from '../utils/functions';
import { generalErrorResponse, permissionsErrorResponse, unauthorizedErrorResponse } from '../utils/error-factory';

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
          return res.status(400).json({
            errors: {
              password: ['Incorrect password.'],
            },
          });
        }
      });
    }
  });
};

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
        date_created: new Date(),
        date_modified: new Date(),
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
            date_created: user.date_created,
            date_modified: user.date_modified,
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

module.exports.get = (req, res, next) => {
  let the_id = req.params.id;
  return User.findById(the_id)
  .then(user => {
    if (user === null) {
      return res.sendStatus(404);
    } else {
      return res.json({
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
    return generalErrorResponse(res);
  });
};

module.exports.update = (req, res) => {
  let the_id = req.params.id;

  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  if (String(req.currentUser._id) !== the_id) {
    return permissionsErrorResponse(res);
  }

  return User.findOne({'_id': the_id})
  .then((user) => {
    user.name = req.body.user.name || user.name;
    user.email = req.body.user.email || user.email;
    user.username = req.body.user.username || user.username;
    user.date_modified = new Date();
    user.date_created = user.date_created || new Date();
    user.password = user.password;
    // if request password is set, update the password (apply hashing to password as)
    if (req.body.user.password && req.body.user.password.length > 0) { user.password = bcrypt.hashSync(req.body.user.password, 8); }

    return user.save();
  })
  .then(user => {
    let token = getToken(user);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        date_modified: user.date_modified,
        date_created: user.date_created,
      },
      token: token,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res, err);
  });
};

module.exports.delete = (req, res) => {
  let the_id = req.params.id;

  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  if (String(req.currentUser._id) !== the_id) {
    return permissionsErrorResponse(res);
  }

  return User.findById(the_id)
  .then(user => {
    if (String(req.currentUser._id) === the_id) {
      return user.remove();
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(() => {
    return res.json({
      deleted_id: the_id,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.index = (req, res) => {
  if(req.query.username) {
    return User.findOne({
      username: req.query.username,
    })
    .then(user => {
      if(user) {
        return res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((err) => {
      return generalErrorResponse(res);
    });
  } else {
    return res.sendStatus(404);
  }
};
