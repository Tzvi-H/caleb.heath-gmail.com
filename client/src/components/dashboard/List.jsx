import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/ListActions";

import Card from "./Card";
import AddCard from "./AddCard";

const List = ({id, title}) => {
  const dispatch = useDispatch();

  const [ newTitle, setNewTitle ] = useState(title)
  const [ isInputVisible, setIsInputVisible ] = useState(false)
  const [ addCardVisible, setAddCardVisible ] = useState(false)
  
  const cards = useSelector(store => store.cards).filter(({listId}) => id === listId)

  const handleInput = e => setNewTitle(e.target.value)
  const handleClickP = e => setIsInputVisible(true)

  const handleBlur = e => {
    setIsInputVisible(false)

    if (newTitle.trim() === "") {
      return
    }

    const updatedListProperties = {
      title: newTitle
    }
    dispatch(actions.updateList(id, updatedListProperties)) 
  }


  // when adding a card (when i click elem with add-card-toggle)
  // i want to make an elem with add-dropdown visible, and hide add-card-toggle
  //
  // div with 'list-wrapper' needs add-dropdown-active class
  // and 
  // div with 'add-dropdown add-bottom' needs active-card class

  // when i click the X icon for 'add-dropdown add-bottom', remove the classes

  return (
    <div className={`list-wrapper ${addCardVisible ? 'add-dropdown-active' : ''}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {
              isInputVisible ? 
              <input
                type="text"
                className="list-title"
                value={newTitle}
                autoFocus={true}
                onChange={handleInput}
                onBlur={handleBlur}
                // onKeyDown={e => console.log(e)}
              /> 
              :
              <p className="list-title" onClick={handleClickP}>{title}</p>
            }
          </div>
          {/* <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div> */}
          <div id="cards-container" data-id="list-1-cards">
          {
            cards.map(card => 
              <Card 
                key={card._id}
                id={card._id}
                title={card.title}
              />
            ) 
          }
          </div>
          <AddCard listId={id} setAddCardVisible={setAddCardVisible} addCardVisible={addCardVisible}/>
        </div>
      </div>
    </div>
  )
}

export default List