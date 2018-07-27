const R = require('ramda');
const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.username = !R.isEmpty(data.username) ? data.username : '';
  data.email = !R.isEmpty(data.email) ? data.email : '';
  data.password = !R.isEmpty(data.password) ? data.password : '';
  data.password2 = !R.isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = 'Password must be between 6 and 100 characters';
  }
  if (!Validator.isLength(data.username, { min: 1, max: 40 })) {
    errors.username = 'Username must be between 1 and 40 characters';
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 100 })) {
    errors.password2 = 'Password must be between 6 and 100 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Usernme field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password field is required';
  }

  return {
    errors,
    isValid: R.isEmpty(errors)
  };
};
