import { useQueries } from '@tanstack/react-query'
import { Movie } from '../types/TMDB'

const fetchMovieById = async (movieId: number): Promise<Movie> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  ).then(response => response.json())

  return data
}

export function useMovies(movieIds: number[]) {
  const movieQueries = useQueries({
    queries: movieIds.map(item => ({
      queryKey: ['movie', item],
      queryFn: () => fetchMovieById(item),
      queryOptions: {
        enabled: !!item,
        cacheTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    })),
  })

  return movieQueries
}
