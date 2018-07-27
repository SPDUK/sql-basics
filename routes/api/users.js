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
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (user) {
          // console.log('user exists');
          // console.log(user.toJSON());
          res.json(user);
        }
        User.create({
          username: req.body.username,
          email: 'username@email.com',
          password: 'longpassword8888'
        }).then(user => res.json(user));
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
