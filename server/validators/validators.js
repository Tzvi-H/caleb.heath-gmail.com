const {check} = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateListTitleOrPosition = [check("title").not().isEmpty() || check("position").not().isEmpty()];
exports.validateCard = [check("card.title").not().isEmpty()];
