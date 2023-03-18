import { useQuery } from "@tanstack/react-query"
import { useSession } from "./useSession"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { RatedMovie } from "@/types/types"

const fetchRatedMovies = async (sessionId?: string): Promise<RatedMovie[]> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/account/peperoli/rated/movies?api_key=${apiKey}&session_id=${sessionId}`
  ).then(response => response.json())

  const totalPages = response.total_pages || 1
  const queries = [`api_key=${apiKey}`, `session_id=${sessionId}`]

  const fetchPages = Array.from({ length: totalPages }).map((_, index) =>
    fetch(
      `https://api.themoviedb.org/3/account/peperoli/rated/movies?${queries.join("&")}&page=${
        index + 1
      }`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    ).then(response => response.json())
  )

  const data = await Promise.all(fetchPages)

  return data?.map(page => page.results).flat()
}

export function useRatedMovies() {
  const [cookies, setCookies] = useCookies(["session_id"])
  const sessionId = cookies.session_id !== "undefined" ? cookies.session_id : undefined
  const searchParams = useSearchParams()
  const request_token = searchParams.get("request_token")
  const { data: session, status } = useSession(request_token)

  useEffect(() => {
    if (status === "success" && session?.session_id) {
      setCookies("session_id", session.session_id)
    }
  }, [status])
  return useQuery(["ratedMovies"], () => fetchRatedMovies(sessionId), {
    enabled: !!sessionId,
  })
}
