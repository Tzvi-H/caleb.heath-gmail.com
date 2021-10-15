import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      if (!action.board) {
        return state
      }

      let allCards = [];
      const { lists } = action.board
      lists.forEach(list => {
        const { cards } = list
        allCards = allCards.concat(cards)
      })
      return allCards
    }
    case types.CREATE_CARD_SUCCESS: {
      return state.concat(action.card)
    }
    case types.FETCH_CARD_SUCCESS: {
      const id = action.card._id
      if (state.find(card => card._id === id)) {
        return state
      }
      // if card already in state, do nothing, else concat
      return state.concat(action.card)
    }
    default:
      return state;
  }
}
