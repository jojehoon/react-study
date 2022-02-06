import { useQuery } from 'react-query'
// import useHeroesData from '../hooks/useHeroesData'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HeroesRQ = () => {

  const fetchHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
  }
  
  const onSuccess = (data) => {
    console.log('onSuccess', data);
  }
  
  const onError = (error) => {
    console.log('onError', error);
  }

  // const { isLoading, isError, isFetching, data, error, refetch } = useHeroesData()
  const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
    'heroes',
    fetchHeroes,
    {
      onSuccess,
      onError,
      // select: (data) => {
      //   const names = data.data.map(hero => hero.name)
      //   return names
      // }
    }
  )

  
  console.log(`isLoading: ${isLoading}, isFetching: ${isFetching}`);

  if (isLoading || isFetching) return <h2>Loading...</h2>
  if (isError)   return <h2>{ error.message }</h2>

  return (
    <>
      <h2>HeroesRQ</h2>
      { /* <button onClick={ refetch }>Fetch Heroes</button> */ }
      {
        (data?.data.map(hero => 
          <div key={ hero.id }>
            <Link to={`/heroes-rq/${hero.id}`}>{ hero.name }</Link>
          </div>
        ))
        // (data?.map(name => <div key={ name }>{ name }</div>))
      }
    </>
    
  )
}

export default HeroesRQ

