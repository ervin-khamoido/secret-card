const {body} = require('express-validator');

exports.registerValidators = [
   body('email', 'Invalid email!')
      .normalizeEmail()
      .isEmail(),
   body('password', 'Password must be at least 6 characters')
      .isLength({
         min: 6,
         max: 64
      })
      .isAlphanumeric()
      .trim(),
   body('name', 'Name must be at least 2 characters')
      .isLength({
         min: 2,
         max: 64
      })
      .trim()
];

exports.loginValidators = [
   body('email', 'Invalid email!')
      .normalizeEmail()
      .isEmail(),
   body('password', 'Password must be at least 6 characters')
      .isLength({
         min: 6,
         max: 64
      })
      .isAlphanumeric()
      .trim()
];

exports.cardValidators = [
   body('title', 'Minimum name length 1 characters!')
      .isLength({
         min: 3,
         max: 64
      })
      .trim(),
   body('text', 'Minimum name length 1 characters!')
      .isLength({
         min: 1,
         max: 255
      })
      .trim(),
   body('author', 'If the value will be empty it will have the value "Anonymous"')
      .trim()
]

exports.searchCardValidators = [
   body('card_id', 'Card ID is invalid!')
      .isAlphanumeric()
      .trim()
]

exports.createCardValidators = [
   body('title', 'Title is invalid!')
      .isLength({
         min: 1,
         max: 150
      })
      .trim(),
   body('message', 'Your message is invalid!')
      .isLength({
         min: 1,
         max: 2500
      })
      .trim(),
   body('author', 'Author\'s name is invalid!')
      .isLength({
         min: 1,
         max: 50
      })
      .trim(),
   body('password', 'Password is invalid!')
      .isLength({
         min: 6
      })
      .trim(),
   body('timeBeforeRemove', 'Value is invalid!')
      .isNumeric()
      .trim()
]