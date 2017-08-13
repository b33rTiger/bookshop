"use strict";

export function booksReducers(state={
  books:
    [{
    _id:0,
    title:"sanity",
    description:"How to remain sane in this helter skelter world !",
    price:"10.99"
    },
    {
    _id:1,
    title:"Happy",
    description:"How to remain Happy in this helter skelter world !",
    price:"11.99"
    },
    {
    _id:2,
    title:"Courage",
    description:"How to remain courageous in this helter skelter world !",
    price:"12.99"
    }]
}, action){
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...state.books]};
    break;

    case "POST_BOOK":
    let books = state.books.concat(action.payload);
    return {books:[...state.books, ...action.payload]};
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book._id == action.payload;
      }
    )
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate = [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    )
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state
}
