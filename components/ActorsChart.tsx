import { useCredits } from '../hooks/useCredits'
import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { RatedMovie } from '../types/types'

interface ActorsChartProps {
  ratedMovies: RatedMovie[]
}

export const ActorsChart: FC<ActorsChartProps> = ({ ratedMovies }) => {
  const [visibleItems, setVisibleItems] = useState(25)
  const ratedMovieIds = ratedMovies.map(item => item.id)
  const creditQueries = useCredits(ratedMovieIds)

  function calculateCastCreditCounts(movieCredits: any[]) {
    const castCreditCounts: { id: number; count: number }[] = []
    for (let index = 0; index < movieCredits.length; index++) {
      const castCredits = movieCredits[index].data?.cast || []

      for (let index = 0; index < castCredits.length; index++) {
        const castCredit = castCredits[index]
        const found = castCreditCounts.find(item => item.id === castCredit.id)        

        if (!found) {
          castCreditCounts.push({ id: castCredit.id, count: 1 })
        } else {
          found.count += 1
        }
      }
    }

    return castCreditCounts
  }

  const progress =
    (creditQueries.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100
  const castCreditCounts = useMemo(() => calculateCastCreditCounts(creditQueries), [isSuccess])

  const topActors =
    progress === 100
      ? castCreditCounts.sort((a, b) => b.count - a.count).slice(0, visibleItems)
      : null
  return (
    <section className="container">
      {progress !== 100 ? (
        <div className="flex items-center">
          <progress value={progress} max="100" />
          <p>Loading {Math.ceil(progress)}%</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {topActors?.map(item => (
              <Person key={item.id} personId={item.id} count={item.count} ratedMovieIds={ratedMovieIds} />
            ))}
            <button onClick={() => setVisibleItems(prev => (prev += 25))}>View more</button>
          </div>
        </>
      )}
    </section>
  )
}
