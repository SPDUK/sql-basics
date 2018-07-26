require('dotenv').config();

const express = require('express');
const faker = require('faker');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const sq = require('./models/sq/sq');
const User = require('./models/User/User');

// sq.sync()
//   .then(() =>
//     User.create({
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//     })
//   )
//   .then(user => {
//     console.log(user.toJSON());
//   })
//   .catch(err => console.log(err.message));

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
//   User.findOne({
//     where: {
//       id: 1
//     }
//   }).then(user => {
//     User.destroy({
//       where: {
//         id: user.id
//       }
//     });
//   });
// });

// sq.sync().then(() => {
//   User.destroy({
//     where: {
//       id: 4
//     }
//   });
// });

app.listen(3000, () => console.log('Example app listening on port 3000!'));
