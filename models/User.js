const sq = require('./sq');
const Sequelize = require('sequelize');

// Automatically includes ID, createdAt, updatedAt
const User = sq.define('users', {
  // Username between 1 and 80 chars, must be unique in DB and not null [string]
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 80],
        msg: 'Your Username must be between 1 and 80 characters long'
      }
    }
  },
  // Email between 1 and 150 chars, must be unique in DB and not null [String]
  email: {
    type: Sequelize.STRING,
    email: true,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 150],
        msg: 'Your Email must be between 1 and 150 characters long'
      }
    }
  },
  // Password between 1 and 150 chars, must be unique in DB and not null [String]
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 180],
        msg: 'Your Password must be between 1 and 180 characters long'
      }
    }
  }
});

module.exports = User;
