const Card = require("../models/card");
const HttpError = require("../models/httpError");

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

exports.getCard = getCard;