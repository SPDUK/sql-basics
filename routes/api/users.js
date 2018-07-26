const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User/User');
const faker = require('faker');

const sq = require('../../models/sq/sq');

const router = express.Router();

router.get('/', (req, res) => {
  sq.sync().then(() => {
    User.findOne().then(user => {
      res.json(user);
    });
  });
});

module.exports = router;
