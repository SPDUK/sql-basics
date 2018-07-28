const R = require('ramda');
const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  // TODO : Make some way to limit usernames so they can't add spaces, use regex or something

  data.email = !R.isEmpty(data.email) ? data.email : '';
  data.password = !R.isEmpty(data.password) ? data.password : '';

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

  if (/\s/g.test(data.password)) {
    errors.password = 'Password must not contain spaces';
  }

  return {
    errors,
    isValid: R.isEmpty(errors)
  };
};
