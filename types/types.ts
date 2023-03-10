
export type RatedMovie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string
  popularity: number
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  rating: number
}

type RatedMoviesPage = {
  page: number
  results: RatedMovie[]
  total_pages: number
  total_results: number
} 