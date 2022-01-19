const BoardItem = (props) => {
  const {onClick, name, board} = props
  return (
    <button name={name} onClick={() => onClick(name)}>{board[name]}</button>
  )
}

export default BoardItem;