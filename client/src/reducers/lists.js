import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const { lists } = action.board
      return lists.map(list => {
        const { cards, ...listWithoutCards } = list
        return listWithoutCards
      })
    }
    default:
      return state;
  }
}

/*
[
  {
    "cards": [],
    "_id": "615c8a06a51d9bfd67175934",
    "boardId": "615b2c8b16da3c988bc0ab1f",
    "title": "this is list 1"
  },
  {
    "cards": [],
    "_id": "615dbfd7bd9433616ae5cf6b",
    "boardId": "615b2c8b16da3c988bc0ab1f",
    "title": "this is list 2"
  }
]


[
{
  "_id": "615c8a06a51d9bfd67175934",
  "boardId": "615b2c8b16da3c988bc0ab1f",
  "title": "this is list 1"
  },
  {
  "_id": "615dbfd7bd9433616ae5cf6b",
  "boardId": "615b2c8b16da3c988bc0ab1f",
  "title": "this is list 2"
  }
],
*/
