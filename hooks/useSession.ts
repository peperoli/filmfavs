import { useQuery } from '@tanstack/react-query'

type Session = {
  session_id?: string
}

const fetchSession = async (token: string | null): Promise<Session> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const bodyData = {
    request_token: token,
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(bodyData),
    }
  )
  const data = await response.json()
  return data
}

export function useSession(token: string | null) {
  return useQuery(['session'], () => fetchSession(token), { enabled: !!token })
}
