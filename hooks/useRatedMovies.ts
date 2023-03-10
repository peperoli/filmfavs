import { useQuery } from '@tanstack/react-query'
import { useSession } from './useSession'
import { useSearchParams } from 'next/navigation'

const fetchRatedMovies = async (sessionId: string, apiKey: string): Promise<any[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/peperoli/rated/movies?api_key=${apiKey}&session_id=${sessionId}`
  ).then(response => response.json())

  const totalPages = response.total_pages || 1
  const queries = [`api_key=${apiKey}`, `session_id=${sessionId}`]

  const fetchPages = Array.from({ length: totalPages }).map((_, index) =>
    fetch(
      `https://api.themoviedb.org/3/account/peperoli/rated/movies?${queries.join('&')}&page=${
        index + 1
      }`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    ).then(response => response.json())
  )

  const data = await Promise.all(fetchPages)

  return data
}

export function useRatedMovies() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const searchParams = useSearchParams()
  const request_token = searchParams.get('request_token')
  const { data: session } = useSession(request_token)
  return useQuery(['ratedMovies'], () => fetchRatedMovies(session?.session_id, apiKey), {
    enabled: !!session?.session_id,
  })
}
