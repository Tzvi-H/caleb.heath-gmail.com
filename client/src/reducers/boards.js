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
      if (!action.board) {
        return state
      }

      const filteredState = state.filter(b => b._id !== action.board._id)
      const {lists, ...boardWithoutLists} = action.board
      return filteredState.concat(boardWithoutLists)
      // this also *appears* to work
      // return [boardWithoutLists]
    }
    default:
      return state;
  }
}
