import Box from './box'

const Board = ({onClick, value}) => {
  const style = {
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  }

  return (
    <div style={style}>
      {[...Array(9)].map((_, pos) => <Box key={pos} name={pos} onClick={() => onClick(pos)} value={value[pos]} />)}
    </div>
  )
}

export default Board