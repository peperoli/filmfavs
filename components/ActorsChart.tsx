import { useCredits } from '../hooks/useCredits'
import React, { FC } from 'react'
import { Person } from './Person'
import { RatedMovie } from '../types/types'

interface ActorsChartProps {
  ratedMovies: RatedMovie[]
}

export const ActorsChart: FC<ActorsChartProps> = ({ ratedMovies }) => {
  const movieIds = ratedMovies.map(item => item.id)
  const creditQueries = useCredits(movieIds)
  const castCreditCounts: { id: number; count: number }[] = []
  for (let index = 0; index < creditQueries.length; index++) {
    const castCredits = creditQueries[index].data?.cast || []

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

  const progress =
    (creditQueries.filter(item => item.status === 'success').length / movieIds.length) * 100
  const topActors =
    progress === 100 ? castCreditCounts.sort((a, b) => b.count - a.count).slice(0, 50) : null
  return (
    <section className="container">
      <h2>Most Seen Actors</h2>
      {progress !== 100 ? (
        <div className="flex items-center">
          <progress value={progress} max="100" />
          <p>Loading {Math.ceil(progress)}%</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          {topActors?.map(item => (
            <Person key={item.id} personId={item.id} count={item.count} />
          ))}
        </div>
      )}
    </section>
  )
}
