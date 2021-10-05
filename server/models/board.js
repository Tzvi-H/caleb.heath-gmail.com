const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List'
    }
  ],
  
  // createdAt: Date,
  // updatedAt: Date

}, {timestamps: true})

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;