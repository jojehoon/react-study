import { useQueries } from 'react-query'
import axios from 'axios'

const fetchHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const DynamicParallel = ({ heroId }) => {
  const queryResults = useQueries(
    heroId.map(id => {
      return {
        queryKey: ['hero', id],
        queryFn: () => fetchHeroes(id),
      }
    })
  )

  console.log(queryResults);
  return <div>DynamicParallel</div>
}

export {
  DynamicParallel
}