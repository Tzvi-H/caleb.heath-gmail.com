const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  description: String,
  position: Number,
  archived: Boolean,
  // createdAt: Date,
  // updatedAt: Date,
  dueDate: Date,
  completed: Boolean,
  commentsCount: Number,
  labels: [
    {
      type: String
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Action'
    }
  ],
}, {timestamps: true})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

/*
{
  "_id": 9,
  "title": "My new card",
  "description": "",
  "labels": [],
  "listId": 13,
  "position": 65535.0,
  "archived": false,
  "createdAt": "2020-10-08T17:54:55.285Z",
  "updatedAt": "2020-10-08T17:54:55.285Z",
  "dueDate": null,
  "completed": false,
  "boardId": 1,
  "comments": [],
  "commentsCount": 0
  "actions": [
    {
      "_id": 49,
      "description": " added this card to My list",
      "createdAt": "2020-10-08T17:54:55.319Z",
      "updatedAt": "2020-10-08T17:54:55.319Z",
      "card_id": 9
    }
  ]
}

*/