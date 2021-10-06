import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

const Board = props => {
  const dispatch = useDispatch();
  const id = useParams().id

  /*
  That allows us to create an `ExistingLists` component where we can query 
  the store for the lists belonging to a particular board.
  */

  // const lists = useSelector((state) => state.lists);

  // const listWrapper = lists.map((list) => {
  //   return <div>{list}</div>
  //   //return <BoardTile key={board._id} title={board.title} id={board._id} />;
  // });

  useEffect(() => {
    dispatch(actions.fetchBoard(id));
  }, [dispatch]);
 
  return (
    <>
      <header>
        <ul>
          <li id="title">My Title</li>
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
          <div id="existing-lists" className="existing-lists">
          </div>
        </div>
      </main>
    </>
  )
};

export default Board;

