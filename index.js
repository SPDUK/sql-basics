require('dotenv').config();
const routes = require('./routes/index');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
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

app.listen(process.env.PORT || 3000, () =>
  console.log('Example app listening on port 3000!')
);
