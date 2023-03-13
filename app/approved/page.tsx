'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../../hooks/useRatedMovies'

export default function Approved() {
  const { data: ratedMovies } = useRatedMovies()
  return (
    <main>
      {ratedMovies && (
        <PopularityChart data={ratedMovies} />
      )}
    </main>
  )
}
