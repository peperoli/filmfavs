import { useQuery } from '@tanstack/react-query';
import { Collection } from '../types/TMDB';

async function fetchCollection(id: number): Promise<Collection> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&append_to_response=movie_credits`)
  const data = await response.json()
  return data
}

export function useCollection(id: number) {
  return useQuery(['collection', id], () => fetchCollection(id), { enabled: !!id });
}