const { check } = require('express-validator');

exports.loginValiadion = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

exports.registerValidation = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
];
exports.workDayValidation = [
  check('day', 'Day is required')
    .not()
    .isEmpty(),
  check('from', 'From Hours is required')
    .not()
    .isEmpty(),
  check('to', 'To Hours is required')
    .not()
    .isEmpty(),
  check('description', 'Description is required')
    .not()
    .isEmpty()
];
