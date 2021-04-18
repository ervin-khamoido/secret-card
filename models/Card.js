const {Schema, model, Types} = require('mongoose');

const cardSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   // cardId: {
   //    type: String,
   //    // required: true,
   //    unique: true
   // },
   password: {
      type: String,
      required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   dateOfCreation: {
      type: Date,
      default: Date.now
   },
   timeBeforeRemove: {
      type: Number,
      default: 10
   },
   isForOneReader: {
      type: Boolean,
      default: true
   },
   views: {
      type: Number,
      default: 0
   },
   isViewed: {
      type: Boolean,
      default: false
   },
   owner: {
      type: Types.ObjectId,
      ref: 'User'
   },
   author: {
      type: String
   }
});

cardSchema.method('toUser', function() {
   const card = this.toObject();

   card.id = card._id;
   delete card._id;

   return card;
})

module.exports = model('Card', cardSchema);