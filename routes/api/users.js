const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const faker = require('faker');

const sq = require('../../models/sq');

const router = express.Router();

router.get('/', (req, res) => {
  sq.sync().then(() => {
    User.findOne().then(user => {
      res.json(user);
    });
  });
});

router.post('/', (req, res) => {
  console.log(req.body.username);
  sq.sync().then(() => {
    const { username, email, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          // console.log('user exists');
          // console.log(user.toJSON());
          res.json(user);
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
