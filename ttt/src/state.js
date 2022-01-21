import { useReducer } from 'react'

const initialState = {
  board: Array(9).fill(null),
  value: 'X',
  message: 'Start Program'
}

const reducer = (state, action) => {
  switch ({ type }) {
    case SET_BOARD:
      return {...state, board: action.board};
    case SET_MESSAGE:
      return ;
    case SET_VALUE:
      return {...state, value: action.value};
    default:
      throw new Error('error')
  }
}