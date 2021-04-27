const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const Card = require('../models/Card');

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
   try {
      const cards = await Card.find({
         owner: req.user.userId
      });

      res.json(cards)
   } catch (error) {
      res.status(500).json({
         message: 'Something goes wrong, try again...'
      });
   }
})

module.exports = router;