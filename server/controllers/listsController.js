const Board = require("../models/board");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const addListToBoard = (req, res, next) => {
  const list = req.list;
  const boardId = req.body.boardId;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id }, // adds list to the lists array in board
  }).then(() => {
    res.status(201)
    next();
  });
};

const sendList = (req, res, next) => {
  // res.status(201).json(req.list)
  res.json(req.list)
}

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.findById(req.body.boardId)
      .then(board => {
        if (!board) {
          return res.status(404).json({
            message: "board id doesn't exist"
          })
        }
        
        const newList = {
          title: req.body.list.title,
          boardId: req.body.boardId,
          //position,
        }
        List.create(newList).then(list => {
          req.list = list
          next()
        }).catch(e => console.log(e))
      })
      .catch(e => {
        console.log(e)
        res.status(404).json({
          message: "board id is invalid"
        })
      })

  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const updatedProperties = {};
    if (req.body.title) { updatedProperties.title = req.body.title };
    if (req.body.position) { updatedProperties.position = req.body.position };
    List
      .findByIdAndUpdate(req.params.id, updatedProperties,  { new: true })
      .then(list => {
        if (!list) {
          return res.status(404).json({
            message: "list doesn't exist"
          })
        } 
        res.status(200)
        req.list = list
        next()
      })
      .catch(e => {
        console.log(e)
        res.status(404).json({msg: "invalid id"})
      })
  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
}

exports.createList = createList;
exports.sendList = sendList;
exports.addListToBoard = addListToBoard;
exports.updateList = updateList
