const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Comment requires text.'],
    minLength: 1
  },
  createdAt: Date,
  updatedAt: Date,
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

// {
//   "_id": 3,
//   "text": "This is my comment",
//   "cardId": 9,
//   "createdAt": "2020-10-08T18:23:59.803Z",
//   "updatedAt": "2020-10-08T18:23:59.803Z"
//}