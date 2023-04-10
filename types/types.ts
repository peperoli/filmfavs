export type Account = {
  avatar: {
    gravatar: {
      hash: string
    }
  }
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export type Person = {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string | null
  popularity: number
  profile_path: string | null
} & WithMovieCredits

export type MovieCredits = {
  id: number
  cast: Person[]
  crew: Person[]
}

export type PersonMovieCredit = {
  credit_id: string
  release_date: string
  vote_count: number
  video: boolean
  adult: boolean
  vote_average: number
  title: string
  genre_ids: number[]
  original_language: string
  original_title: string
  popularity: number
  id: number
  backdrop_path: string | null
  overview: string
  poster_path: string | null
  character?: string
  department?: string
  job?: string
}

type WithMovieCredits = {
  movie_credits?: {
    cast: PersonMovieCredit[]
    crew: PersonMovieCredit[]
  }
}

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

export interface PeopleSearchPage {
  page: number
  results: PeopleSearchResult[]
  total_pages: number
  total_results: number
}

export interface PeopleSearchResult {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  known_for: KnownFor[]
}

export interface KnownFor {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}
