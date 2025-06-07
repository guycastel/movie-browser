import { useReducer } from 'react'
import { produce } from 'immer'
import type { Movie } from '@interfaces/tmdb'

export interface MovieBrowserStateImmer {
  selectedYear: string
  movies: Movie[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalResults: number
  hasSearched: boolean
  filters: {
    genre: string | null
    sortBy: string
    minRating: number
  }
  searchHistory: Array<{
    year: string
    timestamp: Date
    resultsCount: number
  }>
}

export type MovieBrowserActionImmer =
  | { type: 'SET_SELECTED_YEAR'; payload: string }
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: { movies: Movie[]; page: number; totalPages: number; totalResults: number } }
  | { type: 'SEARCH_ERROR'; payload: string }
  | { type: 'RESET_SEARCH' }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FILTER_GENRE'; payload: string | null }
  | { type: 'SET_FILTER_SORT_BY'; payload: string }
  | { type: 'SET_FILTER_MIN_RATING'; payload: number }
  | { type: 'ADD_TO_HISTORY'; payload: { year: string; resultsCount: number } }
  | { type: 'CLEAR_HISTORY' }

const initialState: MovieBrowserStateImmer = {
  selectedYear: '',
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  hasSearched: false,
  filters: {
    genre: null,
    sortBy: 'popularity.desc',
    minRating: 0,
  },
  searchHistory: [],
}

function movieBrowserReducerImmer(state: MovieBrowserStateImmer, action: MovieBrowserActionImmer): MovieBrowserStateImmer {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_SELECTED_YEAR':
        draft.selectedYear = action.payload
        draft.error = null
        break

      case 'SEARCH_START':
        draft.loading = true
        draft.error = null
        break

      case 'SEARCH_SUCCESS':
        draft.loading = false
        draft.movies = action.payload.movies
        draft.currentPage = action.payload.page
        draft.totalPages = action.payload.totalPages
        draft.totalResults = action.payload.totalResults
        draft.hasSearched = true
        draft.error = null
        break

      case 'SEARCH_ERROR':
        draft.loading = false
        draft.error = action.payload
        draft.movies = []
        draft.currentPage = 1
        draft.totalPages = 0
        draft.totalResults = 0
        break

      case 'RESET_SEARCH':
        draft.movies = []
        draft.currentPage = 1
        draft.totalPages = 0
        draft.totalResults = 0
        draft.hasSearched = false
        draft.error = null
        break

      case 'SET_PAGE':
        draft.currentPage = action.payload
        break

      case 'SET_FILTER_GENRE':
        draft.filters.genre = action.payload
        break

      case 'SET_FILTER_SORT_BY':
        draft.filters.sortBy = action.payload
        break

      case 'SET_FILTER_MIN_RATING':
        draft.filters.minRating = action.payload
        break

      case 'ADD_TO_HISTORY':
        // Immer makes it easy to work with nested arrays and objects
        draft.searchHistory.unshift({
          year: action.payload.year,
          timestamp: new Date(),
          resultsCount: action.payload.resultsCount,
        })
        // Keep only the last 10 searches
        if (draft.searchHistory.length > 10) {
          draft.searchHistory.splice(10)
        }
        break

      case 'CLEAR_HISTORY':
        draft.searchHistory = []
        break
    }
  })
}

export function useMovieBrowserReducerImmer() {
  const [state, dispatch] = useReducer(movieBrowserReducerImmer, initialState)

  const actions = {
    setSelectedYear: (year: string) => dispatch({ type: 'SET_SELECTED_YEAR', payload: year }),
    searchStart: () => dispatch({ type: 'SEARCH_START' }),
    searchSuccess: (data: { movies: Movie[]; page: number; totalPages: number; totalResults: number }) => {
      dispatch({ type: 'SEARCH_SUCCESS', payload: data })
      // Automatically add to history when search succeeds
      dispatch({ type: 'ADD_TO_HISTORY', payload: { year: state.selectedYear, resultsCount: data.totalResults } })
    },
    searchError: (error: string) => dispatch({ type: 'SEARCH_ERROR', payload: error }),
    resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
    setFilterGenre: (genre: string | null) => dispatch({ type: 'SET_FILTER_GENRE', payload: genre }),
    setFilterSortBy: (sortBy: string) => dispatch({ type: 'SET_FILTER_SORT_BY', payload: sortBy }),
    setFilterMinRating: (rating: number) => dispatch({ type: 'SET_FILTER_MIN_RATING', payload: rating }),
    addToHistory: (year: string, resultsCount: number) => 
      dispatch({ type: 'ADD_TO_HISTORY', payload: { year, resultsCount } }),
    clearHistory: () => dispatch({ type: 'CLEAR_HISTORY' }),
  }

  return [state, actions] as const
}
