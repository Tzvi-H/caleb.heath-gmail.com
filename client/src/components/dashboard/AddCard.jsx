import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/CardActions";


const AddCard = ({listId}) => {
  const dispatch = useDispatch();

  const [ newTitle, setNewTitle ] = useState("")


  const handleTextAreaChange = e => setNewTitle(e.target.value)
  
  /*
   if newtitle is an empty string
     return

    dispact a createCard action   
      createCard action want cardTitle, listId

  */
  const handleAddCard = e => {
    if (newTitle.trim() === "") {
      return
    }

    const newCard = {
      listId,
      card: {
        title: newTitle
      }
    }

    dispatch(actions.createCard(newCard))
  }

  // when adding a card (when i click elem with add-card-toggle)
  // i want to make an elem with add-dropdown visible, and hide add-card-toggle
  //
  // div with 'list-wrapper' needs add-dropdown-active class
  // and 
  // div with 'add-dropdown add-bottom' needs active-card class

  // when i click the X icon for 'add-dropdown add-bottom', remove the classes

    /* class: active-card when visible, remove when invisible */
  return (
    <>
      <div className="add-dropdown add-bottom active-card">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" onChange={handleTextAreaChange} value={newTitle}></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleAddCard}>Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom">
        Add a card...
      </div>
    </>
  )
}

export default AddCard