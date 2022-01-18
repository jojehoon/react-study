const Message = ({ value }) => {
  const style = {
    width: "300px",
    margin: "0 auto",
    display: "grid",
    fontSize: "40px",
    fontWeight: "800",
    textAlign:'center' 
  };
  
  return (
    <h1 name={'msg'} style={style}>{value}</h1>
  )
}

export default Message