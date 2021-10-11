import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/ListActions";

const AddList = props => {
  const handleClickSpan = event => {
    setListInputVisible("selected")
  }

  const handleInput = event => {
    setNewListName(event.target.value)
  }

  const handleClickX = event => {
    resetAddList()
  }

  const resetAddList = event => {
    setListInputVisible("")
    setNewListName("")
  }
/*
And I click on the "Save" button
The page should have an empty list with the title that I put in as the last list
And there should be an "Add a List" button after the last list on the page

Note: if the input is an empty string, the form doesn't disappear when we click the "Save" button.
*/
  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()

    if (newListName === "") {
      return
    }

    const newList = {
      boardId, 
      list: {
        title: newListName
      }
    }

    dispatch(actions.createList(newList, resetAddList))
  }

  const dispatch = useDispatch();

  const boardId = useParams().id


  const [listInputVisible, setListInputVisible] = useState("")
  const [newListName, setNewListName] = useState("")

  return (             
    <div id="new-list" className={`new-list ${listInputVisible}`}>
      <span onClick={handleClickSpan}>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={newListName} onChange={handleInput}/>
      <div>
        <input type="submit" onClick={handleSubmit} className="button" value="Save" />
        <i className="x-icon icon" onClick={handleClickX}></i>
      </div>
    </div>        
  )
};

export default AddList;

