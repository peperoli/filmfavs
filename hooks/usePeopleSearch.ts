import { useQuery } from '@tanstack/react-query'
import { PeopleSearchPage } from '../types/types'
import { useDebounce } from './useDebounce'

const fetchPerson = async function (searchQuery?: string): Promise<PeopleSearchPage> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  searchQuery = searchQuery && encodeURI(searchQuery)

  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${searchQuery}`
  )

  const data = await response.json()

  return data
}

export function usePeopleSearch(searchQuery?: string) {
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  return useQuery(['peopleSearch', debouncedSearchQuery], () => fetchPerson(searchQuery), {
    enabled: !!searchQuery,
  })
}
