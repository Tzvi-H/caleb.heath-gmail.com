import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARDS_SUCCESS: {
      return action.boards;
    }
    case types.CREATE_BOARD_SUCCESS: {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case types.FETCH_BOARD_SUCCESS: {
      const {lists, ...boardWithoutLists} = action.board
      console.log(boardWithoutLists)
      return boardWithoutLists
    }
    default:
      return state;
  }
}
