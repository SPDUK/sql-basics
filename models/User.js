const sq = require('./sq');
const Sequelize = require('sequelize');

// Automatically includes ID, createdAt, updatedAt
const User = sq.define('users', {
  // Username between 1 and 80 chars, must be unique in DB and not null [string]
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  // Email between 1 and 150 chars, must be unique in DB and not null [String]
  email: {
    type: Sequelize.STRING,
    email: true,
    allowNull: false,
    unique: true
  },
  // Password between 1 and 150 chars, must be unique in DB and not null [String]
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = User;
