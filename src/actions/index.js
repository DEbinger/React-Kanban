// jshint esversion:6

export const ADD_CARD = 'ADD_CARD';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const DELETE_CARD = 'DELETE_CARD';

export function addCard(title, createdBy, status, assignedTo, priority) {
  return {
    type: ADD_CARD,
    title,
    createdBy,
    status,
    assignedTo,
    priority
  };
}

export function updateStatus(id, status) {
  return {
    type: UPDATE_STATUS,
    id,
    status
  };
}

export function deleteCard(id) {
  return {
    type: DELETE_CARD,
    id
  };
}