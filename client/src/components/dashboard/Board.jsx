import React, { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

import ExistingLists from "./ExistingLists";
import AddList from "./AddList";

const Board = props => {
  const match = useRouteMatch('/boards/:id')
  let boardId;
  const id = useParams().id

  const cards = useSelector(store => {
    return store.cards
  })
 
  if (match) {
    boardId = id 
  } else {
    const cardId = id
    const card = cards.find(card => card._id === cardId)
    
    if (card) {
      boardId = card.boardId
    }
  }

  const dispatch = useDispatch();
  
  const board = useSelector(store => store.boards).filter(({_id}) => _id === boardId)[0]

  useEffect(() => {
    if (boardId) {
      dispatch(actions.fetchBoard(boardId));
    }
  }, [boardId]);
 
  if (!board) {
    return null
  }

  return (
    <>
      <header>
        <ul>
          <li id="title">{board ? board.title : ""} </li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <ExistingLists boardId={boardId} />
          <AddList />
        </div>
      </main>
    </>
  )
};

export default Board;

