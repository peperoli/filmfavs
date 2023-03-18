import { useQuery } from '@tanstack/react-query'

type Token = {
  success: boolean
  expires_at: string
  request_token: string
}

const fetchToken = async (): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    {}
  )
  const data: Token = await response.json()
  return data.request_token
}

export function useToken(clicked: boolean) {
  return useQuery(['token'], fetchToken, { enabled: !!clicked })
}
