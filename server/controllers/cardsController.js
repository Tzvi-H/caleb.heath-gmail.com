const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const id = req.params.id 

  Card.findById(id)
    .then(card => {
      if (card) {
        res.json(card)
      } else {
        res.status(404).json({
          error: 'Card not found'  
        })
      }
    })
    .catch(e => {
      console.error(e)
      res.status(400).json({
        error: 'Invalid card id'
      })
    })
}

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.findById(req.body.listId)
      .then(list => {
        if (!list) {
          return res.status(404).json({
            message: "list id doesn't exist"
          })
        }
        const newCard = {
          title: req.body.card.title,
          listId: list._id,
          boardId: list.boardId
        }
        Card.create(newCard).then(card => {
          req.card = card
          req.list = list
          res.status(201)
          next()
        }).catch(e => console.log(e))
      })
      .catch(e => {
        console.log(e)
        res.status(404).json({
          message: "list id is invalid"
        })
      })

  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

const addCardToList = (req, res, next) => {
  const card = req.card;
  const listId = req.list._id;
  List.findByIdAndUpdate(listId, {
    $addToSet: { cards: card._id },
  }).then(() => next());
};

const sendCard = (req, res, next) => {
  res.json(req.card)
}

exports.getCard = getCard;
exports.createCard = createCard;
exports.sendCard = sendCard;
exports.addCardToList = addCardToList;