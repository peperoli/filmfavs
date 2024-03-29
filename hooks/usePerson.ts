import { useQuery } from '@tanstack/react-query';
import { Person } from '../types/TMDB';

const fetchPerson = function fetchPersonDetails(personId: number): Promise<Person> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  return fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&append_to_response=movie_credits`).then((res) => res.json());
}

export function usePerson(personId: number) {
  return useQuery(['person', personId], () => fetchPerson(personId), { enabled: !!personId });
}