const {Router} = require('express');
const {searchCardValidators} = require('../utils/validators');
const {validationResult} = require('express-validator');
const Card = require('../models/Card');

const router = Router();

router.post('/', searchCardValidators, async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Card ID is invalid!'
         }) 
      }

      const {cardId} = req.body;

      const potentialCard = await Card.findById(cardId);

      if (!potentialCard) {
         res.status(500).json({message: 'Card is not found!'})
      }

      res.status(201).json({potentialCard});
   } catch (error) {
      console.log('error', error);
      res.status(500).json({message: 'Card is not found!'});
   }
});

module.exports = router;