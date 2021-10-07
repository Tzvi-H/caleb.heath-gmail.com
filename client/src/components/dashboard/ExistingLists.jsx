import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/BoardActions";

import List from "./List"

const ExistingLists = props => {
  const dispatch = useDispatch();
  const id = useParams().id

  const lists = useSelector(store => store.lists)

  useEffect(() => {
    dispatch(actions.fetchBoard(id));
  }, [dispatch]);
 
  return (
    <div id="existing-lists" className="existing-lists">
      {
        lists.map(list => 
          <List 
            key={list._id} 
            id={list._id}
            title={list.title}
          />
        )
      }
    </div>
  )
};

export default ExistingLists;

