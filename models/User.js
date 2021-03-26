const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   cards: [
      {
         type: Types.ObjectId,
         ref: 'Card'
      }
   ]
});

module.exports = model('User', userSchema);