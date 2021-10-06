import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      let allCards = [];
      const { lists } = action.board
      lists.forEach(list => {
        const { cards } = list
        allCards = allCards.concat(cards)
      })
      return allCards
    }
    default:
      return state;
  }
}
