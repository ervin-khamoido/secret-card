const {Router} = require('express');
const { validationResult } = require('express-validator');
const { createCardValidators } = require('../utils/validators');
const Card = require('../models/Card');
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/', createCardValidators, async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid value!'
         })
      }

      const {title, message, author, timeBeforeRemove, isForOneReader, password, owner} = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const card = new Card({
         title,
         message,
         author,
         timeBeforeRemove,
         isForOneReader,
         owner,
         password: hashedPassword
      });

      await card.save();
      res.status(201).json({message: 'Secret card has been created!', status: 201});
   } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something goes wrong, try again...'})
   }
})

module.exports = router;