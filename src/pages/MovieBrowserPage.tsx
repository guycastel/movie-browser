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
import { useState } from 'react'
import { MovieCard } from '@components/MovieCard'
import { Pagination } from '@components/Pagination'
import { discoverMovies } from '@services/tmdb'
import useTheme from '@hooks/useTheme'
import type { Movie, TMDBResponse } from '@interfaces/tmdb'

function MovieBrowserPage() {
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  
  const { isDarkMode, toggleColorMode } = useTheme()

  const ITEMS_PER_PAGE = 12

  const handleSearch = async (page: number = 1) => {
    if (!selectedYear) return

    setLoading(true)
    setError(null)

    try {
      const response: TMDBResponse = await discoverMovies({
        page,
        primary_release_year: parseInt(selectedYear),
      })

      setMovies(response.results)
      setCurrentPage(response.page)
      setTotalPages(response.total_pages)
      setTotalResults(response.total_results)
      setHasSearched(true)
    } catch {
      setError('Failed to fetch movies. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    handleSearch(page)
  }

  const handleGoClick = () => {
    setCurrentPage(1)
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
            bg={isDarkMode ? "gray.700" : "white"}
            borderColor={isDarkMode ? "gray.600" : "gray.200"}
            color={isDarkMode ? "gray.100" : "gray.700"}
            _hover={{
              bg: isDarkMode ? "gray.600" : "gray.50"
            }}
          >
            {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </IconButton>
        </HStack>

        {/* Search Controls */}
        <Box p={6} borderWidth={1} borderRadius="md">
          <HStack gap={4} align="end" flexWrap="wrap">
            <VStack gap={2} align="start">
              <Text 
                fontSize="sm" 
                color={isDarkMode ? "gray.300" : "gray.600"}
              >
                Year:
              </Text>
              <Input
                type="number"
                width='200px'
                placeholder="Type a year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                min={1880} // First film in TMDB is from 1887
                max={new Date().getFullYear()}
                minLength={4}
                maxLength={4}
              />
            </VStack>
            <Button
              onClick={handleGoClick}
              disabled={!selectedYear || loading}
              colorPalette="blue"
              size="md"
            >
              Go!
            </Button>
          </HStack>
        </Box>

        {/* Loading Spinner */}
        {loading && (
          <Box display="flex" justifyContent="center" py={8}>
            <VStack gap={4}>
              <Spinner size="xl" color="blue.500" />
              <Text>Loading movies...</Text>
            </VStack>
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Box p={4} bg="red.100" borderRadius="md" border="1px solid" borderColor="red.300">
            <Text color="red.700">{error}</Text>
          </Box>
        )}

        {/* Movies Grid */}
        {hasSearched && !loading && !error && movies.length > 0 && (
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
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" py={4}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </Box>
          </VStack>
        )}

        {/* No Results */}
        {hasSearched && !loading && !error && movies.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text fontSize="lg" color="gray.500">
              No movies found for the year {selectedYear}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default MovieBrowserPage
