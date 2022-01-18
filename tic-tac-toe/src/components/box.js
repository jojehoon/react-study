const Box = ({ name, onClick, value}) => {
  const style = {
    border: "3px solid black",
    fontSize: "40px",
  }

  return (
    <button name={name} style={style} onClick={onClick}>{ value }</button>
  )
}

export default Box;