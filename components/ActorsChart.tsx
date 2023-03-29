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
    const castCreditCounts: { [key: number]: number } = {}

    for (let index = 0; index < movieCredits.length; index++) {
      const castCredits = movieCredits[index].data?.cast || []

      for (let index = 0; index < castCredits.length; index++) {
        const castCredit = castCredits[index]

        if (!castCreditCounts[castCredit.id]) {
          castCreditCounts[castCredit.id] = 1
        } else {
          castCreditCounts[castCredit.id] += 1
        }
      }
    }

    return Object.entries(castCreditCounts).map(([id, count]) => ({ id: Number(id), count }))
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
              <Person key={item.id} personId={item.id} ratedMovieIds={ratedMovieIds} />
            ))}
            <div className="flex justify-center">
              <button
                onClick={() => setVisibleItems(prev => (prev += 25))}
                className="flex items-center gap-2 px-3 py-1.5 border border-white bg-gray-900"
              >
                View more
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
