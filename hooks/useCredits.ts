import { useQueries } from '@tanstack/react-query'
import { MovieCredits } from '../types/types'

const fetchCreditsById = async (movieId: number): Promise<MovieCredits> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  ).then(response => response.json())

  return data
}

export function useCredits(movieIds: number[]) {
  const creditQueries = useQueries({
    queries: movieIds.map(item => ({
      queryKey: ['credits', item],
      queryFn: () => fetchCreditsById(item),
      queryOptions: {
        enabled: !!item,
        cacheTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    })),
  })

  return creditQueries
}
