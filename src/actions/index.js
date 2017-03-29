// jshint esversion:6

export const ADD_CARD = 'ADD_CARD';

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