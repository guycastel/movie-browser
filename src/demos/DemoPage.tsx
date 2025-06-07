import { Container, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { StateManagementDemo } from './StateManagementDemo'
import { MdArrowBack } from 'react-icons/md'
import useTheme from '@hooks/useTheme'

interface DemoPageProps {
  onBack?: () => void
}

export const DemoPage: React.FC<DemoPageProps> = ({ onBack }) => {
  const { isDarkMode } = useTheme()

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            State Management Demo
          </Text>
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              size="md"
              colorPalette="gray"
              bg={isDarkMode ? "gray.700" : "white"}
              borderColor={isDarkMode ? "gray.600" : "gray.200"}
              color={isDarkMode ? "gray.100" : "gray.700"}
            >
              <MdArrowBack />
              Back to App
            </Button>
          )}
        </HStack>
        
        <StateManagementDemo />
        
        <Text 
          fontSize="sm" 
          color={isDarkMode ? "gray.400" : "gray.600"}
          textAlign="center"
          fontStyle="italic"
        >
          This demo showcases the useReducer and Immer state management patterns implemented in the Movie Browser app.
        </Text>
      </VStack>
    </Container>
  )
}

export default DemoPage
