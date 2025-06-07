import { useReducer } from 'react'
import type { Movie } from '@interfaces/tmdb'

export interface MovieBrowserState {
  selectedYear: string
  movies: Movie[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalResults: number
  hasSearched: boolean
}

export type MovieBrowserAction =
  | { type: 'SET_SELECTED_YEAR'; payload: string }
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: { movies: Movie[]; page: number; totalPages: number; totalResults: number } }
  | { type: 'SEARCH_ERROR'; payload: string }
  | { type: 'RESET_SEARCH' }
  | { type: 'SET_PAGE'; payload: number }

const initialState: MovieBrowserState = {
  selectedYear: '',
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  hasSearched: false,
}

function movieBrowserReducer(state: MovieBrowserState, action: MovieBrowserAction): MovieBrowserState {
  switch (action.type) {
    case 'SET_SELECTED_YEAR':
      return {
        ...state,
        selectedYear: action.payload,
        error: null, // Clear any previous errors when user changes year
      }

    case 'SEARCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
        hasSearched: true,
        error: null,
      }

    case 'SEARCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        movies: [],
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
      }

    case 'RESET_SEARCH':
      return {
        ...state,
        movies: [],
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        hasSearched: false,
        error: null,
      }

    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      }

    default:
      return state
  }
}

export function useMovieBrowserReducer() {
  const [state, dispatch] = useReducer(movieBrowserReducer, initialState)

  const actions = {
    setSelectedYear: (year: string) => dispatch({ type: 'SET_SELECTED_YEAR', payload: year }),
    searchStart: () => dispatch({ type: 'SEARCH_START' }),
    searchSuccess: (data: { movies: Movie[]; page: number; totalPages: number; totalResults: number }) =>
      dispatch({ type: 'SEARCH_SUCCESS', payload: data }),
    searchError: (error: string) => dispatch({ type: 'SEARCH_ERROR', payload: error }),
    resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
  }

  return [state, actions] as const
}
