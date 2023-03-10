import { useQuery } from '@tanstack/react-query'

const fetchActors = async (): Promise<any[]> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${token}`, {
  headers: {
      'Content-Type': 'application/json,charset=UTF-8',
    }
  })
  const data = await response.json()
  return data
}

export function useActors() {
  return useQuery(['actors'], () => fetchActors())
}