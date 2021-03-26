const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {registerValidators, loginValidators} = require('../utils/validators');
const jwt = require('jsonwebtoken');
const keys = require('../keys/index');

const router = Router();

router.post('/register', registerValidators, async (req, res) => {
   try {
      const {
         email,
         password,
         name
      } = req.body;

      const errors = validationResult(req);
      const candidate = await User.findOne({email});

      if (candidate && !errors.isEmpty()) {
         return res.status(400).json({
            message: 'User with this email already exist!'
         });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
         email,
         password: hashedPassword,
         name
      });

      await user.save();
      res.status(201).json({message: 'User has been created!'});
   } catch (error) {
      res.status(500).json({
         message: 'Something goes wrong, try again...'
      })
   }
});

router.post('/login', loginValidators, async (req, res) => {
   try {
      const {
         email,
         password
      } = req.body;

      const errors = validationResult(req);
      const candidate = await User.findOne({email});

      if (candidate && !errors.isEmpty()) {
         return res.status(400).json({
            message: 'User with this email does not exist!'
         });
      }

      if (!candidate) {
         return res.status(400).json({message: 'User with this email does not exist!'})
      }
      
      const isMatch = await bcrypt.compare(password, candidate.password)
      
      if (!isMatch) {
         return res.status(400).json({message: 'Invalid password!'});
      }

      const token = jwt.sign(
         {userId: user.id},
         keys.JWT_SECRET_KEY,
         {expiresIn: '24h'}
      );

      res.json({token, userId: user.id})
   } catch (error) {
      res.status(500).json({
         message: 'Something goes wrong, try again...'
      })
   }
});

module.exports = router;