import { Box, VStack, HStack, Text, Button, Code, Badge } from '@chakra-ui/react'
import { useMovieBrowserReducer } from '@hooks/useMovieBrowserReducer'
import { useMovieBrowserReducerImmer } from '@hooks/useMovieBrowserReducerImmer'
import { useImageLoadingReducer } from '@hooks/useImageLoadingReducer'
import useTheme from '@hooks/useTheme'

/**
 * Demo component showcasing the different state management approaches
 * This component is for demonstration purposes only
 */
export const StateManagementDemo: React.FC = () => {
  const { isDarkMode } = useTheme()
  const [movieState, movieActions] = useMovieBrowserReducer()
  const [movieStateImmer, movieActionsImmer] = useMovieBrowserReducerImmer()
  const [imageState, imageActions] = useImageLoadingReducer()

  return (
    <Box p={6} borderWidth={1} borderRadius="md" bg={isDarkMode ? "gray.800" : "gray.50"}>
      <VStack gap={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          State Management Approaches Demo
        </Text>

        {/* useReducer Demo */}
        <Box p={4} borderWidth={1} borderRadius="md">
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                useReducer - Movie Browser State
              </Text>
              <Badge colorPalette="blue">Current Implementation</Badge>
            </HStack>
            
            <Code p={2} fontSize="sm">
              {JSON.stringify({
                selectedYear: movieState.selectedYear,
                moviesCount: movieState.movies.length,
                loading: movieState.loading,
                error: movieState.error,
                pagination: {
                  currentPage: movieState.currentPage,
                  totalPages: movieState.totalPages,
                }
              }, null, 2)}
            </Code>

            <HStack gap={2} flexWrap="wrap">
              <Button size="sm" onClick={() => movieActions.setSelectedYear('2023')}>
                Set Year 2023
              </Button>
              <Button size="sm" onClick={movieActions.searchStart}>
                Start Loading
              </Button>
              <Button size="sm" onClick={() => movieActions.searchError('Demo error')}>
                Trigger Error
              </Button>
              <Button size="sm" onClick={movieActions.resetSearch}>
                Reset
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Immer Demo */}
        <Box p={4} borderWidth={1} borderRadius="md">
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                useReducer + Immer - Enhanced State
              </Text>
              <Badge colorPalette="green">With Immer</Badge>
            </HStack>
            
            <Code p={2} fontSize="sm">
              {JSON.stringify({
                selectedYear: movieStateImmer.selectedYear,
                moviesCount: movieStateImmer.movies.length,
                filters: movieStateImmer.filters,
                searchHistory: movieStateImmer.searchHistory.length > 0 
                  ? `${movieStateImmer.searchHistory.length} searches`
                  : 'No history'
              }, null, 2)}
            </Code>

            <HStack gap={2} flexWrap="wrap">
              <Button size="sm" onClick={() => movieActionsImmer.setSelectedYear('2024')}>
                Set Year 2024
              </Button>
              <Button size="sm" onClick={() => movieActionsImmer.setFilterGenre('Action')}>
                Filter: Action
              </Button>
              <Button size="sm" onClick={() => movieActionsImmer.setFilterMinRating(7.5)}>
                Min Rating: 7.5
              </Button>
              <Button size="sm" onClick={() => movieActionsImmer.addToHistory('2023', 150)}>
                Add to History
              </Button>
              <Button size="sm" onClick={movieActionsImmer.clearHistory}>
                Clear History
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Image Loading State Demo */}
        <Box p={4} borderWidth={1} borderRadius="md">
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                Image Loading State Machine
              </Text>
              <Badge colorPalette="purple">State Machine</Badge>
            </HStack>
            
            <Code p={2} fontSize="sm">
              {JSON.stringify(imageState, null, 2)}
            </Code>

            <HStack gap={2} flexWrap="wrap">
              <Button size="sm" onClick={imageActions.startLoading}>
                Start Loading
              </Button>
              <Button size="sm" onClick={imageActions.loadSuccess}>
                Load Success
              </Button>
              <Button size="sm" onClick={imageActions.loadError}>
                Load Error
              </Button>
              <Button size="sm" onClick={imageActions.reset}>
                Reset
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box p={4} bg={isDarkMode ? "gray.700" : "gray.100"} borderRadius="md">
          <Text fontSize="sm" color={isDarkMode ? "gray.300" : "gray.600"}>
            💡 <strong>Benefits demonstrated:</strong> Atomic state updates, predictable transitions, 
            type safety, easier testing, and better debugging capabilities. The Immer version shows 
            how complex nested state can be managed intuitively while maintaining immutability.
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
