require('dotenv').config();

const express = require('express');
const faker = require('faker');
const app = express();
var Sequelize = require('sequelize');

var sq = new Sequelize('sqlbasics', process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const User = sq.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    email: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// sq.sync().then(() => {
//   User.findOne({
//     where: {
//       username: 'Megane.Franecki'
//     }
//   }).then(user => {
//     console.log(user.dataValues);
//   });
// });

// sq.sync().then(() => {
//   User.findAll().then(users => {
//     users.forEach(e => console.log(e.dataValues));
//   });
// });
// sq.sync().then(() => {
//   User.findAll().then(users => {
//     console.log(users.length);
//   });
// });

sq.sync().then(() => {
  User.findOne({
    where: {
      id: 1
    }
  }).then(user => {
    User.destroy({
      where: {
        id: user.id
      }
    });
  });
});

// sq.sync()
//   .then(() =>
//     User.create({
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//     }).catch(err => console.log(err))
//   )
//   .then(user => {
//     console.log(user.toJSON());
//   })
//   .catch(err => console.log(err));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
