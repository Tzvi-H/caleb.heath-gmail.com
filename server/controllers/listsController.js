const Board = require("../models/board");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

/*
1. if not valid board_id => return 404
2. create a new list in the database with all the required fields
3. return the list in json format with a 201 status code
*/

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.findById(req.body.boardId)
      .then(board => {
        if (!board) {
          return res.status(404).json({
            message: "board id is doesn't exist"
          })
          
          const newList = {
            "title": req.body.list.title,
            "boardId": req.body.boardId,
            "createdAt": new Date(),
            "updatedAt": "2020-10-06T23:40:26.606Z",
            "position": 65535.0
          }
          List.create()
        }
        res.json(board)
      })
      .catch(e => {
        console.log(e)
        res.status(404).json({
          message: "board id is invalid"
        })
      })
    // Board.create(req.body.board)
    //   .then((board) => {
    //     Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
    //       (board) => res.json({ board })
    //     );
    //   })
    //   .catch((err) =>
    //     next(new HttpError("Creating board failed, please try again", 500))
    //   );
  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

exports.createList = createList;
