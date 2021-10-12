import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/ListActions";

import Card from "./Card";

const List = ({id, title}) => {
  const dispatch = useDispatch();

  const [ newTitle, setNewTitle ] = useState(title)
  const [ isInputVisible, setIsInputVisible ] = useState(false)

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



  return (
    <div className="list-wrapper">
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
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
          {
            cards.map(card => 
              <Card 
                key={card._id}
                id={card._id}
                text={card.text}
              />
            ) 
          }
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List