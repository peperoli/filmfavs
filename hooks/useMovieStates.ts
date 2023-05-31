import { AccountStates } from "../types/TMDB"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

const fetchMovieStates = async (movieId: number, sessionId: string): Promise<AccountStates> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=${apiKey}&session_id=${sessionId}`
  )
  const data = await response.json()
  return data
}

export function useMovieStates(movieId: number) {
  const [cookies] = useCookies(["session_id"])
  const sessionId = cookies.session_id !== "undefined" ? cookies.session_id : undefined

  return useQuery(["movie-states", movieId], () => fetchMovieStates(movieId, sessionId), {
    enabled: !!sessionId,
  })
}
