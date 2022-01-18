const Refresh = ({ value, onClick }) => {
  const style = {
    width: "250px",
    margin: "0 auto",
    display: "grid",
    fontSize: "40px",
    fontWeight: "800",
  }

  return (
    <button name={'btn'} style={style} onClick={onClick}>{value}</button>
  )
}

export default Refresh;