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
  const [state, dispath] = useReducer(reducer, )
  // const [board, setBoard] = useState(Array(9).fill(null))
  // const [value, setValue] = useState('X')
  // const [message, setMessage] = useState('게임을 시작하세요')


  const resetBoard = () => {
    // setBoard(Array(9).fill(null))
    // setValue('X')
    dispatch('SET_BOARD', board: Array(9).fill(null))
    dispatch('SET_VALUE', value: 'X')
  }

  const showResult = () => {
    const result = state.value === 'X'
      ? 'You\'r win'
      : 'You\'r loose';
    alert(result)
  }

  const isClicked = (name) => {
    return !!state.board[name]
  }

  const updateBoard = (name) => {
    const boardCopied = state.board;
    boardCopied[name] = state.value;
    dispatch('SET_BOARD',   board: boardCopied)
    dispatch('SET_MESSAGE', message: `${state.value}님의 차례`)
    // setBoard(boardCopied)
    // setMessage(message)
  }

  const changeTurn = () => {
    const currentPlayer = state.value === 'X' ? 'O' : 'X';
    setValue(currentPlayer)
  }

  const onClick = (name) => {
    if(isClicked(name)) return alert('이미 클릭했습니다')

    changeTurn(value)
    updateBoard(name)
    
    if (isWin(board)) return showResult(value);
  }

  return (
    <div>
      <div>{ message }</div>
      <div style={style}>
        {
          board.map((item, idx) => <BoardItem name={idx} key={idx} board={board} onClick={onClick} />)
        }
      </div>
    </div>
  )
}

export default Board;