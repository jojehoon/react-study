import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

// queryKey 미사용
// const fetchHero = (heroId) => {
// queryKey 사용
const fetchHero = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const useHeroData = (heroId) => {
  // queryKey 미사용
  // return useQuery(
  //   ['hero', heroId],
  //   () => fetchHero(heroId)
  // )

  const queryClient = useQueryClient()

  // queryKey 사용
  return useQuery(
    ['hero', heroId],
    fetchHero,
    {
      initialData: () => {
        const hero = queryClient
          .getQueryData('hero')
          ?.data?.find(hero => hero.id === parseInt(heroId))
        
        if(hero) {
          return { data: hero }
        } else {
          return undefined
        }
      }
    }
  )
}

export {
  useHeroData
}