import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import {  ReactQueryDevtools } from 'react-query/devtools'
import Home from './components/Home'
import Heroes from './components/Heroes'
import HeroesRQ from './components/Heroes.rq'
import HeroRQ from './components/Hero.rq'
import { ParallelQueries } from './components/ParallelQueries'
import { DynamicParallel } from './components/DynamicParallel'
import { DependentQueries } from './components/DependentQueries'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/heroes">Heroes</Link></li>
              <li><Link to="/heroes-rq">Heroes RQ</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rq-dependent-queries" element={ <DependentQueries email="vishwas@example.com" /> } />
            <Route path="/rq-dynamic-parallel" element={ <DynamicParallel heroId={[1, 3]} /> } />
            <Route path="/rq-parallel" element={ <ParallelQueries />} />
            <Route path="/heroes" element={ <Heroes /> } />
            <Route path="/heroes-rq" element={ <HeroesRQ /> } />
            <Route path="/heroes-rq/:heroId" element={ <HeroRQ /> } />
            <Route path="/" element={ <Home /> } />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
