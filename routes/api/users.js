const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const validateRegister = require('../../validation/register');

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
    const { username, email, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          errors.userexists = 'A user with that username already exists';
          return res.status(400).json(errors);
        }
        User.create({
          username,
          email,
          password
        }).then(savedUser => res.json(savedUser));
      })
      .catch(err => console.log(err));
  });
});
// hook for after register, after the user clicks register

User.hook('beforeCreate', user =>
  bcrypt
    .hash(user.dataValues.password, 10)
    .then(hash => {
      user.dataValues.password = hash;
    })
    .catch(err => {
      throw new Error();
    })
);

module.exports = router;
