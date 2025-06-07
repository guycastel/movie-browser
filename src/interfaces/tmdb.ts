export interface Movie {
  id: number
  title: string
  release_date: string
  poster_path: string | null
  overview: string
  vote_average: number
}

export interface TMDBResponse {
  page: number
  total_pages: number
  total_results: number
  results: Movie[]
}

export interface DiscoverMoviesParams {
  api_key: string
  page?: number
  primary_release_year?: number
  sort_by?: string
}
