const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const { validateBoard, validateList } = require("../validators/validators");


router.get('/boards',boardsController.getBoards );

router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id',boardsController.getBoard );

router.post('/lists', validateList, listsController.createList, 
  listsController.addListToBoard, listsController.sendList)

module.exports = router;