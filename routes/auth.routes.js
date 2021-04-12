const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
// const config = require('config');
const {registerValidators, loginValidators} = require('../utils/validators');
const keys = require('../keys');

const router = Router();

// /api/auth/register
router.post('/register', registerValidators, async (req, res) => {
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
router.post('/login', loginValidators, async (req, res) => {
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
         // config.get('jwtSecret'),
         keys.JWT_SECRET_KEY,
         {expiresIn: '1h'}
      );

      res.json({token, userId: user.id});
   } catch (error) {
      res.status(500).json({message: 'Something goes wrong, try again...'});
   }
});

module.exports = router;