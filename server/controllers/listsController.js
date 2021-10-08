const Board = require("../models/board");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
/*

const addCardToList = (req, res, next) => {
  const card = req.card;
  const listId = req.list._id;
  List.findByIdAndUpdate(listId, {
    $addToSet: { cards: card._id },
  }).then(() => next());
};
*/
const addListToBoard = (req, res, next) => {
  const list = req.list;
  const boardId = req.body.boardId;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id }, // adds list to the lists array in board
  }).then(() => {
    next();
  });
};

const sendList = (req, res, next) => {
  res.status(201).json(req.list)
}

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // Board.findById(req.body.boardId)
    //   .then(board => {
    //     if (!board) {
    //       return res.status(404).json({
    //         message: "board id doesn't exist"
    //       })
    //     } 
        
        const newList = {
          title: req.body.list.title,
          boardId: req.body.boardId,
          //position,
        }
        List.create(newList).then(list => {
          req.list = list
          next()
        }).catch(e => console.log(e))
      // })
      // .catch(e => {
      //   console.log(e)
      //   res.status(404).json({
      //     message: "board id is invalid"
      //   })
      // })

  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.json({msg: "success"})
  } else {
    res.json({msg: "failed validation"})
  }
}

exports.createList = createList;

exports.sendList = sendList;
exports.addListToBoard = addListToBoard;
exports.updateList = updateList
