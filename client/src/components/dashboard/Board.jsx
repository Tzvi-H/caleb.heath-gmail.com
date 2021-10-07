import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

import ExistingLists from "./ExistingLists";
import List from "./List"

const Board = props => {
  const dispatch = useDispatch();
  const id = useParams().id

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
        </div>
      </main>
    </>
  )
};

export default Board;

