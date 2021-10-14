import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/CardActions";


const AddCard = ({listId, showAddCard, clearAddCard, isActiveList}) => {
  const dispatch = useDispatch();

  const [ newTitle, setNewTitle ] = useState("")

  const handleTextAreaChange = e => setNewTitle(e.target.value)
  
  const handleSubmitCard = e => {
    if (newTitle.trim() === "") {
      return
    }

    const newCard = {
      listId,
      card: {
        title: newTitle
      }
    }

    dispatch(actions.createCard(newCard, handleClearAddCard))
  }

  const handleAddCardToggle = (e) => {
    showAddCard(listId)
  }

  const handleClearAddCard = (e) => {
    setNewTitle("")
    clearAddCard()
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
      <div className={`add-dropdown add-bottom ${ isActiveList ? 'active-card' : ''}`}>
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" onChange={handleTextAreaChange} value={newTitle}></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleSubmitCard}>Add</a>
        <i className="x-icon icon" onClick={handleClearAddCard}></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom" onClick={handleAddCardToggle}>
        Add a card...
      </div>
    </>
  )
}

export default AddCard