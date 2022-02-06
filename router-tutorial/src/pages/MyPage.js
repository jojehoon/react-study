import { Navigate } from 'react-router-dom'

const MyPage = () => {
  const isLoggedIn = false;

  if(!isLoggedIn) {
    return <Navigate to="/login" reaplce={true} />
  }

  return <div>MyPage</div>

}

export default MyPage;