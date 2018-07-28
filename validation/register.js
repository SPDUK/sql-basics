const R = require('ramda');
const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  // TODO : Make some way to limit usernames so they can't add spaces, use regex or something

  data.username = !R.isEmpty(data.username) ? data.username : '';
  data.email = !R.isEmpty(data.email) ? data.email : '';
  data.password = !R.isEmpty(data.password) ? data.password : '';
  data.password2 = !R.isEmpty(data.password2) ? data.password2 : '';

  if (!/^[a-zA-Z0-9]*$/.test(data.username)) {
    errors.username =
      'Username must only include letters and numbers with no spaces';
  }
  // username
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Username field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isLength(data.email, { min: 3, max: 160 })) {
    errors.email = 'Email must be less than 160 characters';
  }

  // password
  if (!Validator.isLength(data.password, { min: 6, max: 160 })) {
    errors.password = 'Password must be between 6 and 160 characters';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // confirm password
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password field is required';
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 160 })) {
    errors.password2 = 'Password must be between 6 and 160 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: R.isEmpty(errors)
  };
};
