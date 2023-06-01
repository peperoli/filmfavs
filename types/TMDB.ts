export interface Account {
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

export interface AccountStates {
  id: number
  favorite: boolean
  rated: {
    value: number
  }
  watchlist: boolean
}

export interface Person {
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
  movie_credits?: {
    cast: PersonMovieCredit[]
    crew: PersonMovieCredit[]
  }
}

export interface MovieCredits {
  id: number
  cast: Person[]
  crew: Person[]
}

export interface PersonMovieCredit {
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

export interface Movie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: Collection | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Collection {
  id: number
  name: string
  overview: string
  poster_path: null
  backdrop_path: string
  parts: Part[]
}

export interface Part {
  adult: boolean
  backdrop_path: null
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
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: null | string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface RatedMovie {
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

interface RatedMoviesPage {
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
  media_interface: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}
