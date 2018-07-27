const Sequelize = require('sequelize');

const sq = new Sequelize('sqlbasics', process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  // to stop deprication warning in console
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sq;
