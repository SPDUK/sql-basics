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
async function findEmail(data) {
  return User.findOne({ where: { email: data.email } });
}
async function findUsers(data) {
  return User.findOne({ where: { username: data.username } });
}

router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(403).json(errors);
  }
  let { username, email, password } = req.body;
  email = email.toLowerCase();

  sq.sync().then(async () => {
    try {
      const emailTaken = await findEmail(req.body);
      if (emailTaken) {
        errors.emailtaken = 'This email is already in use';
        return res.status(409).json(errors);
      }
      const userTaken = await findUsers(req.body);
      if (userTaken) {
        errors.usernametaken = 'This username is already in use';
        return res.status(409).json(errors);
      }

      // hash the password and create a user with the hashed password
      if (!userTaken && !emailTaken) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            email = email.toLowerCase();
            User.create({
              username,
              email,
              password
            })
              .then(savedUser => res.json(savedUser))
              .catch(err => console.log(err));
          });
        });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: 'There was an error registering the user' });
    }
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
