const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.get('/*', authMiddleware, async (req, res) => {
   try {

   } catch (error) {
      console.log('OPAAA', error);
      res.status(500).json({
         message: 'OPAAAA'
      });
   }
})

module.exports = router;