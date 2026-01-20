'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useStore } from '@/lib/store';
import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  Button,
} from '@chakra-ui/react';
import { Flame, TrendingUp, TrendingDown, Download, Zap, Moon, Heart, Activity, Droplet, Wind } from 'lucide-react';

// Metric icons for enhanced visuals
void [Zap, Moon, Heart, Activity, Droplet, Wind]; // Used in metric items

export default function Progress() {
  const { currentStreak, longestStreak, totalPoints } = useStore();
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    { id: 'energy', name: 'Energy Level', current: 8.2, previous: 7.1, unit: '/10', trend: 'up' as const, change: '+15%', icon: Zap },
    { id: 'sleep', name: 'Sleep Quality', current: 89, previous: 76, unit: '%', trend: 'up' as const, change: '+17%', icon: Moon },
    { id: 'hrv', name: 'HRV', current: 68, previous: 54, unit: 'ms', trend: 'up' as const, change: '+26%', icon: Heart },
    { id: 'rhr', name: 'Resting HR', current: 58, previous: 64, unit: 'bpm', trend: 'down' as const, change: '-9%', icon: Activity },
    { id: 'bodyFat', name: 'Body Fat', current: 14.2, previous: 16.8, unit: '%', trend: 'down' as const, change: '-15%', icon: Droplet },
    { id: 'vo2', name: 'VO2 Max', current: 48, previous: 43, unit: 'ml/kg', trend: 'up' as const, change: '+12%', icon: Wind },
  ];

  const weeklyProgress = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 92 },
    { day: 'Wed', completion: 78 },
    { day: 'Thu', completion: 95 },
    { day: 'Fri', completion: 88 },
    { day: 'Sat', completion: 90 },
    { day: 'Sun', completion: 82 },
  ];

  const averageCompletion = Math.round(weeklyProgress.reduce((acc, day) => acc + day.completion, 0) / weeklyProgress.length);

  return (
    <Flex direction="column" gap={{ base: 5, sm: 6 }}>
      {/* Streak Card */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.4 }}
      >
        <Box
          bgGradient="linear(to-br, accent.500/15, accent.600/10)"
          borderWidth="1px"
          borderColor="accent.500/30"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative glow */}
          <Box
            position="absolute"
            top="-50%"
            right="-20%"
            w="60%"
            h="150%"
            bgGradient="radial(accent.500/20, transparent 70%)"
            pointerEvents="none"
          />
          
          <Flex justify="space-between" align="center" position="relative">
            <Box>
              <Text color="whiteAlpha.600" fontSize="sm" fontWeight="medium" mb={1}>
                Current Streak
              </Text>
              <Flex align="baseline" gap={2}>
                <Text fontSize={{ base: '4xl', sm: '5xl' }} fontWeight="bold" color="accent.400" lineHeight={1}>
                  {currentStreak || 12}
                </Text>
                <Text color="whiteAlpha.600" fontSize="lg">
                  days
                </Text>
              </Flex>
            </Box>
            <Flex
              w={{ base: 16, sm: 20 }}
              h={{ base: 16, sm: 20 }}
              bg="accent.500/20"
              borderRadius="full"
              align="center"
              justify="center"
              className="animate-pulse-glow"
            >
              <Box as={Flame} w={{ base: 8, sm: 10 }} h={{ base: 8, sm: 10 }} color="accent.400" fill="currentColor" />
            </Flex>
          </Flex>
          
          <Box mt={5} pt={5} borderTop="1px solid" borderColor="accent.500/20">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <Box>
                <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                  Longest
                </Text>
                <Text color="white" fontWeight="semibold" fontSize="lg">
                  {longestStreak || 18} days
                </Text>
              </Box>
              <Box>
                <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                  Total Days
                </Text>
                <Text color="white" fontWeight="semibold" fontSize="lg">
                  42 days
                </Text>
              </Box>
              <Box>
                <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                  Points
                </Text>
                <Text color="accent.400" fontWeight="semibold" fontSize="lg">
                  {totalPoints || 1250}
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.1, duration: 0.4 }}
      >
        <Box
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Flex justify="space-between" align="center" mb={5}>
            <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color="white">
              This Week
            </Heading>
            <Text color="accent.400" fontSize="sm" fontWeight="semibold">
              {averageCompletion}% avg
            </Text>
          </Flex>
          
          <Flex align="flex-end" justify="space-between" gap={2} h={{ base: '120px', sm: '140px' }}>
            {weeklyProgress.map((day, index) => (
              <motion.div
                key={day.day}
                style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                initial={shouldReduceMotion ? false : { opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.05, duration: 0.4 }}
              >
                <Flex flex={1} w="full" flexDir="column" justify="flex-end">
                  <Box
                    w="full"
                    bg="primary.500/30"
                    borderRadius="lg"
                    position="relative"
                    overflow="hidden"
                    h="full"
                    display="flex"
                    alignItems="flex-end"
                  >
                    <Box
                      w="full"
                      bgGradient={day.completion >= 90 ? 'linear(to-t, accent.500, accent.400)' : 'linear(to-t, accent.600/80, accent.500/80)'}
                      borderRadius="lg"
                      transition="all 0.5s ease-out"
                      h={`${day.completion}%`}
                    />
                  </Box>
                </Flex>
                <Text fontSize="xs" color="whiteAlpha.600" mt={2} fontWeight="medium">
                  {day.day}
                </Text>
              </motion.div>
            ))}
          </Flex>
        </Box>
      </motion.div>

      {/* Key Metrics */}
      <Box>
        <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color="white" mb={4}>
          Health Metrics
        </Heading>
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={{ base: 3, sm: 4 }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.2 + index * 0.05, duration: 0.3 }}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                p={{ base: 4, sm: 5 }}
                _hover={{ borderColor: 'primary.300', bg: 'primary.600/60' }}
                transition="all 0.2s"
              >
                <Flex justify="space-between" align="flex-start" mb={3}>
                  <Flex align="center" gap={2}>
                    <Flex
                      w={8}
                      h={8}
                      bg="accent.500/20"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Box as={metric.icon} w={4} h={4} color="accent.400" />
                    </Flex>
                    <Text color="white" fontWeight="medium" fontSize="sm">
                      {metric.name}
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    gap={1}
                    px={2}
                    py={1}
                    borderRadius="full"
                    bg={metric.trend === 'up' ? 'green.500/20' : 'green.500/20'}
                    color={metric.trend === 'up' ? 'green.300' : 'green.300'}
                  >
                    <Box
                      as={metric.trend === 'up' ? TrendingUp : TrendingDown}
                      w={3}
                      h={3}
                    />
                    <Text fontSize="xs" fontWeight="semibold">
                      {metric.change}
                    </Text>
                  </Flex>
                </Flex>
                
                <Flex align="baseline" gap={1}>
                  <Text fontSize={{ base: '2xl', sm: '3xl' }} fontWeight="bold" color="white" lineHeight={1}>
                    {metric.current}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.500">
                    {metric.unit}
                  </Text>
                </Flex>
                
                <Box mt={3}>
                  <Box h="4px" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                    <Box
                      h="full"
                      bgGradient="linear(to-r, accent.500, accent.400)"
                      w={`${Math.min((metric.current / (metric.current * 1.2)) * 100, 100)}%`}
                      borderRadius="full"
                    />
                  </Box>
                  <Text fontSize="xs" color="whiteAlpha.500" mt={1}>
                    was {metric.previous}{metric.unit}
                  </Text>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Grid>
      </Box>

      {/* Biological Age Card */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.5, duration: 0.4 }}
      >
        <Box
          bgGradient="linear(to-br, accent.500/10, primary.600/50)"
          borderWidth="1px"
          borderColor="accent.500/30"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color="white" mb={4}>
            Biological Age
          </Heading>
          
          <Flex justify="center" align="center" gap={{ base: 6, sm: 10 }} mb={5}>
            <Box textAlign="center">
              <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                Biological
              </Text>
              <Text fontSize={{ base: '4xl', sm: '5xl' }} fontWeight="bold" color="accent.400" lineHeight={1}>
                35
              </Text>
            </Box>
            
            <Flex direction="column" align="center" color="whiteAlpha.400">
              <Text fontSize="2xl">→</Text>
            </Flex>
            
            <Box textAlign="center">
              <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                Actual
              </Text>
              <Text fontSize={{ base: '4xl', sm: '5xl' }} fontWeight="bold" color="white" lineHeight={1}>
                42
              </Text>
            </Box>
          </Flex>
          
          <Box
            bg="accent.500/20"
            borderWidth="1px"
            borderColor="accent.500/50"
            borderRadius="xl"
            p={4}
            textAlign="center"
          >
            <Text color="accent.300" fontSize="lg" fontWeight="semibold" mb={1}>
              You&apos;ve reversed 7 years!
            </Text>
            <Text color="whiteAlpha.600" fontSize="sm">
              Based on biomarker analysis from your last bloodwork
            </Text>
          </Box>
        </Box>
      </motion.div>

      {/* Export Button */}
      <Button
        w="full"
        bg="primary.600/50"
        borderWidth="1px"
        borderColor="primary.400"
        borderRadius="xl"
        py={4}
        color="whiteAlpha.700"
        fontWeight="semibold"
        _hover={{
          color: 'white',
          borderColor: 'primary.300',
          bg: 'primary.600/70',
        }}
        _focus={{ ring: 2, ringColor: 'accent.400' }}
        transition="all 0.2s"
      >
        <Flex align="center" gap={2}>
          <Box as={Download} w={5} h={5} />
          <Text>Export Progress Report</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
