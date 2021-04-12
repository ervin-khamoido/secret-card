const {Router} = require('express');
const {searchCardValidators} = require('../utils/validators');
const {validationResult} = require();
const {Card} = require('../models/Card');

const router = Router();

router.post('/', searchCardValidators, async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'ID is invalid!'
         })
      }

      const {card_id} = req.body;
      const potentialCard = await Card.findOne({cardId: card_id});

      if (!potentialCard) {
         res.status(500).json({message: 'Card is not found!'})
      }

      res.status(201).json({potentialCard});
   } catch (error) {
      res.status(500).json({message: 'Something goes wrong, try again...'});
   }
});

module.exports = router;