const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  createdAt: Date,
  updatedAt: Date,
  position: Number
})

const List = mongoose.model('List', ListSchema);

module.exports = List;

/*

{
  "_id": 10,
  "title": "My list",
  "boardId": 1,
  "createdAt": "2020-10-06T23:40:26.606Z",
  "updatedAt": "2020-10-06T23:40:26.606Z",
  "position": 65535.0
}

*?