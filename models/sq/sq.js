const Sequelize = require('sequelize');

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
module.exports = sq;
