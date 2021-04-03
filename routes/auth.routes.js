const {Router, json} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = Router();

// /api/auth/register
router.post(
   '/register', 
   [
      check('email', 'Invalid email!').isEmail(),
      check('password', 'Passwoerd must be at least 8 characters').isLength({min: 6})
   ], async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid value!'
         })
      }

      const {email, password} = req.body;

      const candidate = await User.findOne({email});

      if (candidate) {
         return res.status(400).json({message: 'User with this email already exist!'});
      }

      const hashedPassoword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassoword});

      await user.save();
      res.status(201).json({message: 'User has been created!'});
   } catch (error) {
      res.status(500).json({message: 'Something goes wrong, try again...'});
   }
});

// /api/auth/login
router.post('/login', 
   [
      check('email', 'Enter correct email!').normalizeEmail().isEmail(),
      check('password', 'Invalid password!').exists()
   ],
   async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid value!'
         })
      }

      const {email, password} = req.body;
      const user = await User.findOne({email});

      if (!user) {
         return res.status(400).json({message: 'User with this email does not exist!'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({message: 'Invalid password!'})
      }

      const token = jwt.sign(
         {userId: user.id},
         config.get('jwtSecret'),
         {expiresIn: '1h'}
      );

      res.json({token, userId: user.id});
   } catch (error) {
      res.status(500).json({message: 'Something goes wrong, try again...'});
   }
});

module.exports = router;