import { Account } from "../types/TMDB"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

const fetchAccount = async (sessionId: string): Promise<Account> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`
  )
  const data = await response.json()
  return data
}

export function useAccount() {
  const [cookies, setCookies] = useCookies(["session_id"])
  const sessionId = cookies.session_id !== "undefined" ? cookies.session_id : undefined

  return useQuery(["account"], () => fetchAccount(sessionId), {
    enabled: !!sessionId,
  })
}
