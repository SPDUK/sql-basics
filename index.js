require('dotenv').config();

const express = require('express');

const faker = require('faker');
const app = express();
var Sequelize = require('sequelize');

var sq = new Sequelize('sqlbasics', process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const User = sq.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
sq.sync()
  .then(() =>
    User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    }).catch(err => console.log(err))
  )
  .then(jane => {
    console.log(jane.toJSON());
  })
  .catch(err => console.log(err));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
