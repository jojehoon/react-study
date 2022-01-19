import { useState } from 'react'
import BoardItem from './BoardItem'


const isWin = (board) => {
  const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const item of winList) {
    const [a, b, c] = item;

    if (board[a] !== '' && board[a] === board[b] && board[a] && board[c]) {
      return true;
    }
  }

  return false;
}

const style = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '300px',
  height: '300px',
  margin: '0 auto',
}

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [value, setValue] = useState('X')


  const resetBoard = (value) => {
    setBoard(Array(9).fill(null))
    setValue('X')
    showMessage(value)
  }

  const showMessage = (value) => {
    const message = value === 'X'
      ? 'You\'r win'
      : 'You\'r loose';
    alert(message)
  }

  const isClicked = (board, name) => {
    return !!board[name]
  }

  const updateBoard = (board, name) => {
    const boardCopied = board
    boardCopied[name] = value

    setBoard(boardCopied[name])
  }

  const changeTurn = (value) => {
    const currentPlayer = value === 'X'
      ? 'O'
      : 'X';
    
    setValue(currentPlayer)
  }

  const onClick = (name) => {

    if(isClicked(board, name)) return alert('이미 클릭했습니다')

    changeTurn(value)
    updateBoard(board, name)
    
    if (isWin(board)) return resetBoard(value);
  }

  return (
    <div style={style}>
      {
        board.map((item, idx) => <BoardItem name={idx} key={idx} board={board} onClick={onClick} />)
      }
    </div>
  )
}

export default Board;