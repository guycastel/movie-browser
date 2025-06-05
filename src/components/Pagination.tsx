import { HStack, Text, Button, VStack } from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useTheme } from '../contexts/ThemeContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalResults: number
  itemsPerPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage,
}) => {
  const { isDarkMode } = useTheme()
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalResults)

  return (
    <VStack gap={4}>
      <Text 
        fontSize="sm" 
        color={isDarkMode ? "gray.300" : "gray.600"}
      >
        Showing movies {startItem} to {endItem} out of {totalResults}
      </Text>
      <HStack gap={2}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="sm"
          variant="outline"
          colorPalette="gray"
          bg={isDarkMode ? "gray.700" : "white"}
          borderColor={isDarkMode ? "gray.600" : "gray.200"}
          color={isDarkMode ? "gray.100" : "gray.700"}
          _hover={{
            bg: isDarkMode ? "gray.600" : "gray.50"
          }}
          _disabled={{
            opacity: 0.4,
            cursor: "not-allowed"
          }}
        >
          <MdChevronLeft />
          Previous
        </Button>
        <Text 
          fontSize="sm" 
          px={2}
          color={isDarkMode ? "gray.200" : "gray.700"}
          fontWeight="medium"
        >
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
          variant="outline"
          colorPalette="gray"
          bg={isDarkMode ? "gray.700" : "white"}
          borderColor={isDarkMode ? "gray.600" : "gray.200"}
          color={isDarkMode ? "gray.100" : "gray.700"}
          _hover={{
            bg: isDarkMode ? "gray.600" : "gray.50"
          }}
          _disabled={{
            opacity: 0.4,
            cursor: "not-allowed"
          }}
        >
          Next
          <MdChevronRight />
        </Button>
      </HStack>
    </VStack>
  )
}
