const jwt = require('jsonwebtoken');
// const config = require('config');
const keys = require('../keys');

module.exports = (req, res, next) => {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
      
      if (!token) {
         console.log(401, 'No authorization! LOL');
         return res.status(401).json({message: 'No authorization!'});
      }

      // const decoded = jwt.verify(token, config.get('jwtSecret'));
      const decoded = jwt.verify(token, keys.JWT_SECRET_KEY);
      req.user = decoded;
      next();
   } catch (error) {
      console.log(401, 'LOL', error);
      res.status(401).json({message: 'No authorization!'});
   }
}