import { Box, Image, Text, VStack, Skeleton } from '@chakra-ui/react'
import { useState } from 'react'
import type { Movie } from '@interfaces/tmdb'
import { getPosterUrl } from '@services/tmdb'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const posterUrl = getPosterUrl(movie.poster_path)
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'

  return (
    <VStack gap={3} align="stretch">
      <Box 
        position="relative" 
        width="100%" 
        aspectRatio="2/3"
        overflow="hidden"
      >
        {!imageLoaded && !imageError && (
          <Skeleton height="100%" width="100%" borderRadius="md" />
        )}
        {posterUrl && !imageError && (
          <Image
            src={posterUrl}
            alt={movie.title}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="md"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            display={imageLoaded ? 'block' : 'none'}
          />
        )}
        {(imageError || !posterUrl) && imageLoaded && (
          <Box
            height="100%"
            width="100%"
            bg="gray.200"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="sm" color="gray.500">
              No Image
            </Text>
          </Box>
        )}
      </Box>
      <VStack gap={1} align="start">
        <Text fontSize="md" fontWeight="semibold" lineHeight="1.2" lineClamp={2}>
          {movie.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {releaseYear}
        </Text>
      </VStack>
    </VStack>
  )
}
