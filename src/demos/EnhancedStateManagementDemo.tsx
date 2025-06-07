import { Box, VStack, HStack, Text, Button, Code, Badge, Tabs, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useMovieBrowserReducer } from '@hooks/useMovieBrowserReducer'
import { useMovieBrowserReducerImmer } from '@hooks/useMovieBrowserReducerImmer'
import { useImageLoadingReducer } from '@hooks/useImageLoadingReducer'
import useTheme from '@hooks/useTheme'

/**
 * Enhanced demo component with practical examples and scenarios
 */
export const EnhancedStateManagementDemo: React.FC = () => {
  const { isDarkMode } = useTheme()
  const [movieState, movieActions] = useMovieBrowserReducer()
  const [movieStateImmer, movieActionsImmer] = useMovieBrowserReducerImmer()
  const [imageState, imageActions] = useImageLoadingReducer()
  const [customYear, setCustomYear] = useState('')

  // Simulate a realistic search flow
  const simulateSearchFlow = async () => {
    movieActions.searchStart()
    await new Promise(resolve => setTimeout(resolve, 1000))
    movieActions.searchSuccess({
      movies: [
        { id: 1, title: 'Demo Movie 1', release_date: '2023-01-01', poster_path: null, overview: 'Demo', vote_average: 8.5 },
        { id: 2, title: 'Demo Movie 2', release_date: '2023-06-15', poster_path: null, overview: 'Demo', vote_average: 7.2 }
      ],
      page: 1,
      totalPages: 5,
      totalResults: 42
    })
  }

  // Simulate image loading flow
  const simulateImageFlow = async () => {
    imageActions.startLoading()
    await new Promise(resolve => setTimeout(resolve, 800))
    Math.random() > 0.3 ? imageActions.loadSuccess() : imageActions.loadError()
  }

  return (
    <Box p={6} borderWidth={1} borderRadius="md" bg={isDarkMode ? "gray.800" : "gray.50"}>
      <VStack gap={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          🧪 State Management Laboratory
        </Text>

        <Tabs.Root defaultValue="basic" variant="enclosed">
          <Tabs.List>
            <Tabs.Trigger value="basic">Basic Patterns</Tabs.Trigger>
            <Tabs.Trigger value="realistic">Realistic Scenarios</Tabs.Trigger>
            <Tabs.Trigger value="comparison">Performance Comparison</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="basic">
            <VStack gap={4} align="stretch">
              {/* Basic useReducer Demo */}
              <Box p={4} borderWidth={1} borderRadius="md">
                <VStack gap={3} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">useReducer Pattern</Text>
                    <Badge colorPalette="blue">Active Implementation</Badge>
                  </HStack>
                  
                  <Code p={3} fontSize="xs" maxH="200px" overflowY="auto">
                    {JSON.stringify(movieState, null, 2)}
                  </Code>

                  <HStack gap={2} flexWrap="wrap">
                    <Input
                      placeholder="Enter year"
                      value={customYear}
                      onChange={(e) => setCustomYear(e.target.value)}
                      width="120px"
                      size="sm"
                    />
                    <Button size="sm" onClick={() => movieActions.setSelectedYear(customYear)}>
                      Set Year
                    </Button>
                    <Button size="sm" onClick={simulateSearchFlow} disabled={movieState.loading}>
                      {movieState.loading ? 'Searching...' : 'Simulate Search'}
                    </Button>
                    <Button size="sm" onClick={movieActions.resetSearch} variant="outline">
                      Reset
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              {/* Image Loading State Machine */}
              <Box p={4} borderWidth={1} borderRadius="md">
                <VStack gap={3} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">Image Loading State Machine</Text>
                    <Badge colorPalette="purple">State Machine</Badge>
                  </HStack>
                  
                  <Code p={3} fontSize="sm">
                    Current State: {JSON.stringify(imageState)}
                  </Code>

                  <HStack gap={2} flexWrap="wrap">
                    <Button size="sm" onClick={simulateImageFlow}>
                      Simulate Image Load
                    </Button>
                    <Button size="sm" onClick={imageActions.loadSuccess} variant="outline">
                      Force Success
                    </Button>
                    <Button size="sm" onClick={imageActions.loadError} variant="outline">
                      Force Error
                    </Button>
                    <Button size="sm" onClick={imageActions.reset} variant="ghost">
                      Reset
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="realistic">
            <VStack gap={4} align="stretch">
              <Box p={4} borderWidth={1} borderRadius="md">
                <VStack gap={3} align="stretch">
                  <Text fontSize="lg" fontWeight="semibold">🎬 Realistic Movie Search Scenario</Text>
                  
                  <Text fontSize="sm" color={isDarkMode ? "gray.300" : "gray.600"}>
                    This demonstrates how the state flows in a real user interaction:
                  </Text>

                  <HStack gap={2} flexWrap="wrap">
                    <Button 
                      onClick={() => {
                        movieActions.setSelectedYear('2023')
                        setTimeout(simulateSearchFlow, 500)
                      }}
                      colorPalette="green"
                    >
                      🎯 Complete Search Flow
                    </Button>
                    <Button 
                      onClick={() => {
                        movieActions.setSelectedYear('1999')
                        setTimeout(() => movieActions.searchError('Network timeout'), 1000)
                      }}
                      colorPalette="red"
                      variant="outline"
                    >
                      ❌ Simulate Error
                    </Button>
                  </HStack>

                  <Code p={3} fontSize="xs" maxH="150px" overflowY="auto">
                    Search Status: {movieState.loading ? '🔄 Loading...' : 
                                   movieState.error ? `❌ ${movieState.error}` : 
                                   movieState.hasSearched ? `✅ Found ${movieState.movies.length} movies` : 
                                   '⏳ Ready to search'}
                  </Code>
                </VStack>
              </Box>

              <Box p={4} borderWidth={1} borderRadius="md">
                <VStack gap={3} align="stretch">
                  <Text fontSize="lg" fontWeight="semibold">🎨 Immer Advanced Features</Text>
                  
                  <Code p={3} fontSize="xs" maxH="150px" overflowY="auto">
                    {JSON.stringify({
                      filters: movieStateImmer.filters,
                      searchHistory: movieStateImmer.searchHistory.map(h => ({ 
                        year: h.year, 
                        results: h.resultsCount,
                        time: h.timestamp.toLocaleTimeString()
                      }))
                    }, null, 2)}
                  </Code>

                  <HStack gap={2} flexWrap="wrap">
                    <Button size="sm" onClick={() => movieActionsImmer.setFilterGenre('Action')}>
                      🎬 Filter: Action
                    </Button>
                    <Button size="sm" onClick={() => movieActionsImmer.setFilterMinRating(8.0)}>
                      ⭐ Min Rating: 8.0
                    </Button>
                    <Button size="sm" onClick={() => movieActionsImmer.addToHistory('2023', Math.floor(Math.random() * 200))}>
                      📝 Add History Entry
                    </Button>
                    <Button size="sm" onClick={movieActionsImmer.clearHistory} variant="outline">
                      🗑️ Clear History
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="comparison">
            <VStack gap={4} align="stretch">
              <Box p={4} borderWidth={1} borderRadius="md">
                <VStack gap={3} align="stretch">
                  <Text fontSize="lg" fontWeight="semibold">📊 Performance & Developer Experience</Text>
                  
                  <VStack gap={2} align="start">
                    <Text fontSize="sm"><strong>useReducer Benefits:</strong></Text>
                    <Text fontSize="xs" color={isDarkMode ? "gray.300" : "gray.600"}>
                      ✅ Atomic updates prevent inconsistent state<br/>
                      ✅ Predictable state transitions<br/>
                      ✅ Better debugging with action types<br/>
                      ✅ Easier testing of state logic
                    </Text>
                    
                    <Text fontSize="sm" mt={2}><strong>Immer Advantages:</strong></Text>
                    <Text fontSize="xs" color={isDarkMode ? "gray.300" : "gray.600"}>
                      ✅ Intuitive nested object updates<br/>
                      ✅ Structural sharing for performance<br/>
                      ✅ Complex array operations made simple<br/>
                      ✅ Maintains immutability automatically
                    </Text>
                  </VStack>

                  <Text fontSize="xs" fontStyle="italic" color={isDarkMode ? "gray.400" : "gray.500"}>
                    💡 In this project, useReducer provides the perfect balance of power and simplicity.
                    Immer becomes more valuable with deeply nested state structures.
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  )
}
