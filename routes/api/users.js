const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const faker = require('faker');
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
          return res.status(400).json();
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

module.exports = router;
