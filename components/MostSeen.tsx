'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../hooks/useRatedMovies'
import { useAccount } from '../hooks/useAccount'
import React from 'react'
import { ActorsChart } from './ActorsChart'

export const MostSeen = () => {
  const { data: ratedMovies } = useRatedMovies()
  const { data: account } = useAccount()
  return (
    <main>
      {account?.username}
      {ratedMovies && <ActorsChart ratedMovies={ratedMovies} />}
      {ratedMovies && <PopularityChart data={ratedMovies} />}
    </main>
  )
}
