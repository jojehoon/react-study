import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import MyPage from './pages/MyPage'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/profile/:username" element={ <Profile /> } />
        </Route>
        <Route path="/articles" element={ <Articles /> }>
          <Route path=":id" element={ <Article />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </div>
  )
}

export default App;