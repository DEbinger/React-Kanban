// jshint esversion:6

import { ADD_CARD } from '../actions';

const initialState = {
  cards: [],
};

function cardReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_CARD:
      return Object.assign({}, state, {
        cards: [
          ...state.cards,
          {
            title: action.title,
            priority: action.priority,
            status: action.status,
            createdBy: action.createdBy,
            assignedTo: action.assignedTo
          }
        ]
      });
    default:
      return state;
  }
}

export default cardReducer;