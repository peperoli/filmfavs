'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../../hooks/useRatedMovies'
import { useAccount } from '../../hooks/useAccount'

export default function Approved() {
  const { data: ratedMovies } = useRatedMovies()  
  const { data: account } = useAccount()
  return (
    <main>
      {account?.username}
      {ratedMovies && (
        <PopularityChart data={ratedMovies} />
      )}
    </main>
  )
}
