'use client'

import { useRatedMovies } from '../../hooks/useRatedMovies'

export default function Home() {
  const { data: ratedMovies } = useRatedMovies()
  return (
    <main>
      <pre>{JSON.stringify(ratedMovies.map(page => page.results).flat().map(item => item.title), null, 2)}</pre>
    </main>
  )
}