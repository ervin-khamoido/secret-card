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
         return res.status(401).json({message: 'No authorization!'});
      }

      // const decoded = jwt.verify(token, config.get('jwtSecret'));
      const decoded = jwt.verify(token, keys.JWT_SECRET_KEY);
      req.user = decoded;

      next();
   } catch (error) {
      res.status(401).json({message: 'No authorization!'});
   }
}