'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../../hooks/useRatedMovies'

export default function Approved() {
  const { data: ratedMovies, status } = useRatedMovies()

  console.log(status)

  return (
    <main>
      {ratedMovies && (
        <PopularityChart data={ratedMovies} />
      )}
    </main>
  )
}
