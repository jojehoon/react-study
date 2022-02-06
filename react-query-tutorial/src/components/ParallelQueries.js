import { useQuery } from 'react-query'
import axios from 'axios'

const fetchHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/Friends')
}

const ParallelQueries = () => {
  const {data: heroes } = useQuery('heroes', fetchHeroes)
  const {data: friends } = useQuery('friends', fetchFriends)

  return <h2>ParallelQueries</h2>
}

export {
  ParallelQueries
}