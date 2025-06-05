import axios from 'axios'
import type { TMDBResponse, DiscoverMoviesParams } from '../types/tmdb'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// You'll need to add your TMDB API key here
const API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? 'your_api_key_here'

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const discoverMovies = async (params: Omit<DiscoverMoviesParams, 'api_key'>): Promise<TMDBResponse> => {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      ...params,
      sort_by: 'popularity.desc',
    },
  })
  return response.data
}

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return ''
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getPosterUrl = (path: string | null): string => {
  return getImageUrl(path, 'w500')
}
