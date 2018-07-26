const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User/User');
const sq = require('../../models/sq/sq');

const router = express.Router();

router.get('api/get', (req, res) => {
  sq.sync().then(() => {
    User.findAll().then(users => res.json(users));
  });
});

module.exports = router;
