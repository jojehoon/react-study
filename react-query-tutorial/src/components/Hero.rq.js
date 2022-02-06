import { useHeroData } from '../hooks/useHeroData'
import { useParams } from 'react-router-dom'

const HeroRQ = () => {
  const { heroId } = useParams()
  const { isLoading, isError, data, error } = useHeroData(heroId)

  if (isLoading) return <h2>Loading...</h2>

  if (isError) return <h2>{ error.message }</h2>

  return (
    <>
      <h2>hero details</h2>
      <div>{data?.data.name } - { data?.data.alterEgo }</div>
    </>
  )
}

export default HeroRQ