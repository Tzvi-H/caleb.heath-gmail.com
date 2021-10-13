import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card };
}

export function createCard(card, callback) {
  return function(dispatch) {
    //dispatch(createListRequest());
    apiClient.createCard(card, data => {
      dispatch(createCardSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}