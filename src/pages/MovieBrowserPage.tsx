import {
  Box,
  Container,
  VStack,
  HStack,
  Button,
  Text,
  Grid,
  Spinner,
  IconButton,
  Input,
} from '@chakra-ui/react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { MovieCard } from '@components/MovieCard'
import { Pagination } from '@components/Pagination'
import { discoverMovies } from '@services/tmdb'
import useTheme from '@hooks/useTheme'
// import { useMovieBrowserReducer } from '@hooks/useMovieBrowserReducer'
import { useMovieBrowserReducerImmer as useMovieBrowserReducer } from '@hooks/useMovieBrowserReducerImmer'
import type { TMDBResponse } from '@interfaces/tmdb'
// import { StateManagementDemo } from '../demos/StateManagementDemo'
import { EnhancedStateManagementDemo } from '../demos/EnhancedStateManagementDemo'
import { ImmerPerformanceDemo } from '../demos/ImmerPerformanceDemo'

function MovieBrowserPage() {
  const [state, actions] = useMovieBrowserReducer()
  const { isDarkMode, toggleColorMode } = useTheme()

  const ITEMS_PER_PAGE = 12

  const handleSearch = async (page: number = 1) => {
    if (!state.selectedYear) return

    actions.searchStart()

    try {
      const response: TMDBResponse = await discoverMovies({
        page,
        primary_release_year: parseInt(state.selectedYear),
      })

      actions.searchSuccess({
        movies: response.results,
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
      })
    } catch {
      actions.searchError('Failed to fetch movies. Please try again.')
    }
  }

  const handlePageChange = (page: number) => {
    handleSearch(page)
  }

  const handleGoClick = () => {
    actions.setPage(1)
    handleSearch(1)
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header with theme toggle */}
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Movie Browser
          </Text>
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="outline"
            size="md"
            colorPalette="gray"
            bg={isDarkMode ? 'gray.700' : 'white'}
            borderColor={isDarkMode ? 'gray.600' : 'gray.200'}
            color={isDarkMode ? 'gray.100' : 'gray.700'}
            _hover={{
              bg: isDarkMode ? 'gray.600' : 'gray.50',
            }}
          >
            {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </IconButton>
        </HStack>

        {/* Development Demo - Remove in production */}
        {import.meta.env.DEV && (
          <VStack gap={6}>
            <EnhancedStateManagementDemo />
            <ImmerPerformanceDemo />
          </VStack>
        )}

        {/* Search Controls */}
        <Box p={6} borderWidth={1} borderRadius="md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (state.selectedYear && !state.loading) {
                handleGoClick()
              }
            }}
          >
            <HStack gap={4} align="end" flexWrap="wrap">
              <VStack gap={2} align="start">
                <Text fontSize="sm" color={isDarkMode ? 'gray.300' : 'gray.600'}>
                  Year:
                </Text>
                <Input
                  type="number"
                  width="200px"
                  placeholder="Type a year"
                  value={state.selectedYear}
                  onChange={(e) => actions.setSelectedYear(e.target.value)}
                  min={1880}
                  max={new Date().getFullYear()}
                  minLength={4}
                  maxLength={4}
                />
              </VStack>
              <Button
                type="submit"
                disabled={!state.selectedYear || state.loading}
                colorPalette="blue"
                size="md"
              >
                Go!
              </Button>
            </HStack>
          </form>
        </Box>

        {/* Loading Spinner */}
        {state.loading && (
          <Box display="flex" justifyContent="center" py={8}>
            <VStack gap={4}>
              <Spinner size="xl" color="blue.500" />
              <Text>Loading movies...</Text>
            </VStack>
          </Box>
        )}

        {/* Error Message */}
        {state.error && (
          <Box p={4} bg="red.100" borderRadius="md" border="1px solid" borderColor="red.300">
            <Text color="red.700">{state.error}</Text>
          </Box>
        )}

        {/* Movies Grid */}
        {state.hasSearched && !state.loading && !state.error && state.movies.length > 0 && (
          <VStack gap={6} align="stretch">
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
              gap={6}
            >
              {state.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" py={4}>
              <Pagination
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                totalResults={state.totalResults}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </Box>
          </VStack>
        )}

        {/* No Results */}
        {state.hasSearched && !state.loading && !state.error && state.movies.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text fontSize="lg" color="gray.500">
              No movies found for the year {state.selectedYear}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default MovieBrowserPage
