const {Schema, model, Types} = require('mongoose');

const cardSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   text: {
      type: String,
      required: true
   },
   cardId: {
      type: String,
      required: true,
      unique: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   dateOfCreation: {
      type: Date,
      default: Date.now
   },
   views: {
      type: Number,
      default: 0
   },
   isViewed: {
      type: Boolean,
      require: true
   },
   owner: {
      type: Types.ObjectId,
      ref: 'User'
   }
});

cardSchema.method('toUser', function() {
   const card = this.toObject();

   card.id = card._id;
   delete card._id;

   return card;
})

module.exports = model('Card', cardSchema);