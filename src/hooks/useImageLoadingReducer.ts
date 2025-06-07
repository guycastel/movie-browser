import { useReducer } from 'react'

export interface ImageLoadingState {
  loaded: boolean
  error: boolean
}

export type ImageLoadingAction =
  | { type: 'LOADING_START' }
  | { type: 'LOADING_SUCCESS' }
  | { type: 'LOADING_ERROR' }
  | { type: 'RESET' }

const initialState: ImageLoadingState = {
  loaded: false,
  error: false,
}

function imageLoadingReducer(state: ImageLoadingState, action: ImageLoadingAction): ImageLoadingState {
  switch (action.type) {
    case 'LOADING_START':
      return {
        loaded: false,
        error: false,
      }

    case 'LOADING_SUCCESS':
      return {
        loaded: true,
        error: false,
      }

    case 'LOADING_ERROR':
      return {
        loaded: false,
        error: true,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export function useImageLoadingReducer() {
  const [state, dispatch] = useReducer(imageLoadingReducer, initialState)

  const actions = {
    startLoading: () => dispatch({ type: 'LOADING_START' }),
    loadSuccess: () => dispatch({ type: 'LOADING_SUCCESS' }),
    loadError: () => dispatch({ type: 'LOADING_ERROR' }),
    reset: () => dispatch({ type: 'RESET' }),
  }

  return [state, actions] as const
}
