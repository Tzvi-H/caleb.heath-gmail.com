import React, { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

import ExistingLists from "./ExistingLists";
import AddList from "./AddList";

const Board = props => {
  const match = useRouteMatch('/boards/:id')
  let id;

  if (match) {
    id = useParams().id
  } else {
    const cardId = useParams().id
    const card = useSelector(store => {
      return store.cards.find(card => card._id === cardId)
    })
    console.log('CARD', card)
  }

  const dispatch = useDispatch();
  
  const board = useSelector(store => store.boards).filter(({_id}) => _id === id)[0]

  useEffect(() => {
    dispatch(actions.fetchBoard(id));
  }, [dispatch]);
 
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
          <ExistingLists boardId={id} />
          <AddList />
        </div>
      </main>
    </>
  )
};

export default Board;

