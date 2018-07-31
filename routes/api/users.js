const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// models
const User = require('../../models/User');
// validation
const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');

require('dotenv').config({ path: 'variables.env' });

const sq = require('../../models/sq');

const router = express.Router();

router.get('/', (req, res) => {
  sq.sync().then(() => {
    User.findOne().then(user => {
      res.json(user);
    });
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  sq.sync().then(() => {
    // eslint-disable-next-line
    let { username, email, password } = req.body;
    email = email.toLowerCase();
    // find an email that matches user input email, if it exists show an error message
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          errors.userexists = 'A user with that email already exists';
          return res.status(409).json(errors);
        }

        // encrypt the password before creating the new user using that password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            email = email.toLowerCase();
            User.create({
              username,
              email,
              password
            }).then(savedUser => res.json(savedUser));
          });
        });
      })
      .catch(err => res.status(401).json(err));
  });
});

// @route POST api/users/login
// @desc Register user
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // sync to DB then check if any email currently exists, if not return with an error
  sq.sync().then(() => {
    const { email, password } = req.body;
    User.findOne({ where: { email } }).then(user => {
      if (!user) {
        errors.email = 'Incorrect email / password combination';
        return res.status(400).json(errors);
      }

      // compare the password to the input password
      bcrypt
        .compare(password, user.dataValues.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.dataValues.id,
              username: user.dataValues.username
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: '60d' },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            errors.password = 'Incorrect email / password combination';
            return res.status(409).json(errors);
          }
        })
        .catch(err => res.status(400).json(err));
    });
  });
});

module.exports = router;
