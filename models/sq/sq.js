const Sequelize = require('sequelize');

let sq = null;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sq = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    logging: true
  });
} else {
  sq = new Sequelize(process.env.DB, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    logging: true
  });
}
module.exports = sq;
