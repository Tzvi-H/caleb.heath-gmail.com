import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

import List from "./List"
/*
state activeList = null or listId
handleAddCardClick(listId)
*/
const ExistingLists = props => {
  const [ activeList, setActiveList ] = useState(null)
  const dispatch = useDispatch();
  const id = useParams().id

  const lists = useSelector(store => store.lists)

  useEffect(() => {
    dispatch(actions.fetchBoard(id));
  }, [dispatch]);

  const showAddCard = listId => {
    setActiveList(listId)
  }

  const clearAddCard = () => {
    setActiveList(null)
  }
 
  return (
    <div id="existing-lists" className="existing-lists">
      {
        lists.map(list => 
          <List 
            key={list._id} 
            id={list._id}
            title={list.title}
            clearAddCard={clearAddCard}
            showAddCard={showAddCard}
            isActiveList={activeList === list._id}
          />
        )
      }
    </div>
  )
};

export default ExistingLists;

