const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const validateRegister = require('../../validation/register');

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
    let { username, email, password } = req.body;
    User.findOne({ where: { email } }).then(user => {
      if (user) {
        errors.userexists = 'A user with that email already exists';
        return res.status(400).json(errors);
      }
      console.log(password);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          User.create({
            username,
            email,
            password
          }).then(savedUser => res.json(savedUser));
        });
      });
    });
  });
});

// @route POST api/users/login
// @desc Register user
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  sq.sync().then(() => {
    const { email, password } = req.body;
    User.findOne({ where: { email } }).then(user => {
      if (!user) {
        errors.email = 'Incorrect email / password combination';
        return res.status(400).json(errors);
      }

      bcrypt
        .compare(password, user.dataValues.password)
        .then(isMatch => {
          console.log(password);
          console.log(user.dataValues.password);
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
            errors.password = 'ismatch failed';
            return res.status(400).json(errors);
          }
        })
        .catch(err => res.status(400).json(err));
    });
  });
});

module.exports = router;
