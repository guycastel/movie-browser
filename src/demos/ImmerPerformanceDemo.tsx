import { useState, useCallback, useMemo } from 'react'
import { produce } from 'immer'
import { Box, VStack, HStack, Text, Button, Code, Badge, Stat } from '@chakra-ui/react'
import useTheme from '@hooks/useTheme'

interface ComplexState {
  users: Array<{
    id: number
    name: string
    profile: {
      settings: {
        notifications: boolean
        theme: string
        preferences: {
          language: string
          timezone: string
          features: string[]
        }
      }
      activity: {
        lastSeen: Date
        loginCount: number
        favoriteMovies: number[]
      }
    }
  }>
  metadata: {
    totalUsers: number
    lastUpdated: Date
    version: string
  }
}

/**
 * Demo showing technical benefits of Immer beyond developer experience
 */
export const ImmerPerformanceDemo: React.FC = () => {
  const { isDarkMode } = useTheme()
  
  // Create complex nested state
  const initialState: ComplexState = useMemo(() => ({
    users: Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      profile: {
        settings: {
          notifications: true,
          theme: 'light',
          preferences: {
            language: 'en',
            timezone: 'UTC',
            features: ['feature1', 'feature2', 'feature3']
          }
        },
        activity: {
          lastSeen: new Date(),
          loginCount: Math.floor(Math.random() * 100),
          favoriteMovies: Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000))
        }
      }
    })),
    metadata: {
      totalUsers: 1000,
      lastUpdated: new Date(),
      version: '1.0.0'
    }
  }), [])

  const [state, setState] = useState(initialState)
  const [manualSpreadTimes, setManualSpreadTimes] = useState<number[]>([])
  const [immerTimes, setImmerTimes] = useState<number[]>([])

  // Manual spread operator approach - LOTS of code, easy to make mistakes
  const updateWithSpread = useCallback(() => {
    const start = performance.now()
    
    setState(prevState => ({
      ...prevState,
      users: prevState.users.map(user => 
        user.id === 42 
          ? {
              ...user,
              profile: {
                ...user.profile,
                settings: {
                  ...user.profile.settings,
                  preferences: {
                    ...user.profile.settings.preferences,
                    features: [...user.profile.settings.preferences.features, 'newFeature']
                  }
                },
                activity: {
                  ...user.profile.activity,
                  loginCount: user.profile.activity.loginCount + 1
                }
              }
            }
          : user
      ),
      metadata: {
        ...prevState.metadata,
        lastUpdated: new Date(),
        totalUsers: prevState.metadata.totalUsers
      }
    }))
    
    const end = performance.now()
    const time = end - start
    setManualSpreadTimes(prev => [...prev.slice(-9), time])
  }, [])

  // Immer approach - cleaner AND more performant for complex updates
  const updateWithImmer = useCallback(() => {
    const start = performance.now()
    
    setState(prevState => produce(prevState, draft => {
      const user = draft.users.find(u => u.id === 42)
      if (user) {
        user.profile.settings.preferences.features.push('newFeature')
        user.profile.activity.loginCount += 1
      }
      draft.metadata.lastUpdated = new Date()
    }))
    
    const end = performance.now()
    const time = end - start
    setImmerTimes(prev => [...prev.slice(-9), time])
  }, [])

  const avgManualTime = manualSpreadTimes.length > 0 
    ? manualSpreadTimes.reduce((a, b) => a + b, 0) / manualSpreadTimes.length 
    : 0

  const avgImmerTime = immerTimes.length > 0 
    ? immerTimes.reduce((a, b) => a + b, 0) / immerTimes.length 
    : 0

  const user42 = state.users.find(u => u.id === 42)

  return (
    <Box p={6} borderWidth={1} borderRadius="md" bg={isDarkMode ? "gray.800" : "gray.50"}>
      <VStack gap={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Immer: Technical Benefits Beyond Developer Experience
        </Text>

        <Box p={4} bg={isDarkMode ? "blue.900" : "blue.50"} borderRadius="md">
          <VStack gap={3} align="stretch">
            <Text fontSize="lg" fontWeight="semibold">
              🎯 Technical Benefits of Immer:
            </Text>
            <VStack gap={1} align="start" fontSize="sm">
              <Text>• <strong>Structural Sharing:</strong> Only changed parts of state create new objects</Text>
              <Text>• <strong>Memory Efficiency:</strong> Unchanged nested objects are reused</Text>
              <Text>• <strong>Performance:</strong> Fewer object creations in complex updates</Text>
              <Text>• <strong>Type Safety:</strong> Better TypeScript inference for nested mutations</Text>
              <Text>• <strong>Immutability Guarantee:</strong> Impossible to accidentally mutate</Text>
              <Text>• <strong>Bundle Size:</strong> Only ~14KB, pays for itself in complex apps</Text>
            </VStack>
          </VStack>
        </Box>

        <HStack gap={4} align="start">
          {/* Manual Spread Stats */}
          <Box flex={1} p={4} borderWidth={1} borderRadius="md">
            <VStack gap={3}>
              <Badge colorPalette="red">Manual Spread</Badge>
              <Stat.Root>
                <Stat.Label>Avg Update Time</Stat.Label>
                <Stat.ValueText>{avgManualTime.toFixed(3)}ms</Stat.ValueText>
              </Stat.Root>
              <Button size="sm" onClick={updateWithSpread} colorPalette="red">
                Update Nested State (Manual)
              </Button>
              <Text fontSize="xs" color="gray.500">
                Lines of code: ~25 (error-prone)
              </Text>
            </VStack>
          </Box>

          {/* Immer Stats */}
          <Box flex={1} p={4} borderWidth={1} borderRadius="md">
            <VStack gap={3}>
              <Badge colorPalette="green">With Immer</Badge>
              <Stat.Root>
                <Stat.Label>Avg Update Time</Stat.Label>
                <Stat.ValueText>{avgImmerTime.toFixed(3)}ms</Stat.ValueText>
              </Stat.Root>
              <Button size="sm" onClick={updateWithImmer} colorPalette="green">
                Update Nested State (Immer)
              </Button>
              <Text fontSize="xs" color="gray.500">
                Lines of code: ~7 (intuitive)
              </Text>
            </VStack>
          </Box>
        </HStack>

        {/* Current State Display */}
        <Box p={4} borderWidth={1} borderRadius="md">
          <VStack gap={3} align="stretch">
            <Text fontSize="md" fontWeight="semibold">
              Current State (User #42):
            </Text>
            <Code p={2} fontSize="xs">
              {JSON.stringify({
                id: user42?.id,
                loginCount: user42?.profile.activity.loginCount,
                featuresCount: user42?.profile.settings.preferences.features.length,
                lastFeature: user42?.profile.settings.preferences.features.slice(-1)[0]
              }, null, 2)}
            </Code>
          </VStack>
        </Box>

        {/* Performance Comparison */}
        {manualSpreadTimes.length > 0 && immerTimes.length > 0 && (
          <Box p={4} bg={isDarkMode ? "green.900" : "green.50"} borderRadius="md">
            <VStack gap={2}>
              <Text fontSize="md" fontWeight="semibold">
                📊 Performance Analysis:
              </Text>
              <Text fontSize="sm">
                {avgImmerTime < avgManualTime 
                  ? `🚀 Immer is ${((avgManualTime - avgImmerTime) / avgManualTime * 100).toFixed(1)}% faster!`
                  : `⚡ Manual approach is ${((avgImmerTime - avgManualTime) / avgImmerTime * 100).toFixed(1)}% faster`
                }
              </Text>
              <Text fontSize="xs" color={isDarkMode ? "green.200" : "green.700"}>
                Note: Immer's benefits compound with state complexity. In real apps with deep nesting,
                Immer often outperforms manual spread due to structural sharing and fewer object allocations.
              </Text>
            </VStack>
          </Box>
        )}

        <Box p={4} bg={isDarkMode ? "gray.700" : "gray.100"} borderRadius="md">
          <Text fontSize="sm" color={isDarkMode ? "gray.300" : "gray.600"}>
            💡 <strong>Key Insight:</strong> Immer isn't just about developer experience. It provides 
            structural sharing, memory efficiency, and prevents common immutability bugs. The more complex 
            your state, the more technical benefits you get.
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
