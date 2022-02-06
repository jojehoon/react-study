import { useQuery } from 'react-query'
import axios from 'axios'

const fetchHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const onSuccess = (data) => {
  console.log('onSuccess', data);
}

const onError = (error) => {
  console.log('onError', error);
}

const useHeroesData = () => {
  return useQuery(
    'heroes',
    fetchHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        const names = data.data.map(hero => hero.name)
        return names
      }
    }
  )
}

export default useHeroesData;