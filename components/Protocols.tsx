'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { protocols, protocolCategories, type Protocol } from '@/lib/data/protocols';
import ProtocolTimer from './ProtocolTimer';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
} from '@chakra-ui/react';
import { 
  Sun, Snowflake, Flame, Wind, Activity, Moon, 
  Utensils, Brain, RefreshCw, Check, Clock, ChevronDown, 
  Play, FileText, Info
} from 'lucide-react';

const categoryIcons: Record<string, typeof Sun> = {
  circadian: Sun,
  'cold-exposure': Snowflake,
  'heat-exposure': Flame,
  breathwork: Wind,
  movement: Activity,
  sleep: Moon,
  nutrition: Utensils,
  mindfulness: Brain,
  recovery: RefreshCw,
};

export default function Protocols() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [activeTimer, setActiveTimer] = useState<{ id: string; name: string; duration: number } | null>(null);
  const { completedTasks, toggleTask } = useStore();
  const shouldReduceMotion = useReducedMotion();

  const categories = ['all', ...Object.keys(protocolCategories)];
  const difficulties = ['all', 'foundation', 'intermediate', 'advanced'];

  const filteredProtocols = useMemo(() => {
    return protocols.filter(p => {
      const categoryMatch = activeCategory === 'all' || p.category === activeCategory;
      const difficultyMatch = activeDifficulty === 'all' || p.difficulty === activeDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [activeCategory, activeDifficulty]);

  const startTimer = (protocol: Protocol) => {
    setActiveTimer({
      id: protocol.id,
      name: protocol.title,
      duration: protocol.duration * 60 // convert to seconds
    });
  };

  const getCategoryMeta = (category: string) => {
    return protocolCategories[category as keyof typeof protocolCategories] || {
      name: category,
      icon: '📋',
      color: 'gray'
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <>
      {/* Timer Modal */}
      {activeTimer && (
        <ProtocolTimer
          protocolName={activeTimer.name}
          duration={activeTimer.duration}
          onComplete={() => {
            toggleTask(activeTimer.id);
            setActiveTimer(null);
          }}
          onClose={() => setActiveTimer(null)}
        />
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Filter Section */}
        <Box>
          {/* Category Filters */}
          <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
            Category
          </Text>
          <Flex
            gap={2}
            overflowX="auto"
            pb={2}
            mx={{ base: -4, sm: 0 }}
            px={{ base: 4, sm: 0 }}
            mb={4}
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            {categories.map((category) => {
              const meta = category !== 'all' ? getCategoryMeta(category) : null;
              return (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Filter by ${category === 'all' ? 'all protocols' : meta?.name}`}
                  aria-pressed={activeCategory === category}
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 2, sm: 2.5 }}
                  borderRadius="full"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  whiteSpace="nowrap"
                  transition="all 0.3s"
                  bg={activeCategory === category ? 'accent.500/20' : 'primary.600/50'}
                  borderWidth="1px"
                  borderColor={activeCategory === category ? 'accent.500' : 'primary.400'}
                  color={activeCategory === category ? 'accent.300' : 'whiteAlpha.600'}
                  boxShadow={activeCategory === category ? 'lg' : 'none'}
                  _hover={{
                    bg: activeCategory === category ? 'accent.500/30' : 'primary.600/70',
                    color: activeCategory === category ? 'accent.300' : 'whiteAlpha.800',
                  }}
                  _focus={{ ring: 2, ringColor: 'accent.400' }}
                >
                  {meta && <Text mr={1.5}>{meta.icon}</Text>}
                  {category === 'all' ? 'All' : meta?.name}
                </Button>
              );
            })}
          </Flex>

          {/* Difficulty Filters */}
          <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
            Difficulty
          </Text>
          <Flex gap={2} flexWrap="wrap">
            {difficulties.map((diff) => (
              <Button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                aria-pressed={activeDifficulty === diff}
                px={{ base: 3, sm: 4 }}
                py={{ base: 1.5, sm: 2 }}
                borderRadius="full"
                fontSize={{ base: 'xs', sm: 'sm' }}
                textTransform="capitalize"
                transition="all 0.3s"
                bg={activeDifficulty === diff ? 'accent.500/20' : 'transparent'}
                borderWidth="1px"
                borderColor={activeDifficulty === diff ? 'accent.500' : 'primary.400'}
                color={activeDifficulty === diff ? 'accent.300' : 'whiteAlpha.600'}
                _hover={{
                  bg: activeDifficulty === diff ? 'accent.500/30' : 'primary.600/50',
                }}
                _focus={{ ring: 2, ringColor: 'accent.400' }}
              >
                {diff === 'all' ? 'All Levels' : diff}
              </Button>
            ))}
          </Flex>
        </Box>

        {/* Results Count */}
        <Text color="whiteAlpha.500" fontSize="sm">
          Showing {filteredProtocols.length} protocol{filteredProtocols.length !== 1 ? 's' : ''}
        </Text>

        {/* Protocols List */}
        {filteredProtocols.length > 0 ? (
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 4, sm: 5 }}>
            {filteredProtocols.map((protocol, index) => {
              const IconComponent = categoryIcons[protocol.category] || FileText;
              const isCompleted = completedTasks.includes(protocol.id);
              const isExpanded = selectedProtocol === protocol.id;

              return (
                <motion.div
                  key={protocol.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.03, duration: 0.3 }}
                >
                  <Box
                    bg={isCompleted ? 'accent.500/10' : 'primary.600/50'}
                    borderWidth="1px"
                    borderColor={isCompleted ? 'accent.500/30' : 'primary.400'}
                    borderRadius="2xl"
                    overflow="hidden"
                    _hover={{ borderColor: isCompleted ? 'accent.500/50' : 'primary.300' }}
                    transition="all 0.3s"
                  >
                    {/* Header */}
                    <Button
                      onClick={() => setSelectedProtocol(isExpanded ? null : protocol.id)}
                      aria-expanded={isExpanded}
                      w="full"
                      p={{ base: 4, sm: 5 }}
                      textAlign="left"
                      bg="transparent"
                      _hover={{ bg: 'whiteAlpha.50' }}
                      transition="all 0.3s"
                      _focus={{ ring: 2, ringColor: 'accent.400' }}
                      borderRadius={0}
                      h="auto"
                    >
                      <Flex align="flex-start" justify="space-between" w="full">
                        <Flex align="flex-start" gap={3} flex={1} pr={4}>
                          <Flex
                            w={{ base: 10, sm: 12 }}
                            h={{ base: 10, sm: 12 }}
                            bg="accent.500/20"
                            borderRadius="lg"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={IconComponent} w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }} color="accent.400" />
                          </Flex>
                          <Box flex={1}>
                            <Flex align="center" gap={2} mb={1.5} flexWrap="wrap">
                              <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color={isCompleted ? 'whiteAlpha.600' : 'white'}>
                                {protocol.title}
                              </Heading>
                              {isCompleted && (
                                <Box as={Check} w={5} h={5} color="accent.400" />
                              )}
                            </Flex>
                            <Flex gap={2} mb={2} flexWrap="wrap">
                              <Badge
                                px={2}
                                py={0.5}
                                bg={`${getDifficultyColor(protocol.difficulty)}.500/20`}
                                color={`${getDifficultyColor(protocol.difficulty)}.300`}
                                borderRadius="md"
                                fontSize="xs"
                                textTransform="capitalize"
                              >
                                {protocol.difficulty}
                              </Badge>
                              <Badge
                                px={2}
                                py={0.5}
                                bg="accent.500/20"
                                color="accent.200"
                                borderRadius="md"
                                fontSize="xs"
                              >
                                {protocol.timeOfDay}
                              </Badge>
                            </Flex>
                            <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} lineClamp={2}>
                              {protocol.description}
                            </Text>
                            <Flex align="center" gap={3} mt={2}>
                              <Flex align="center" gap={1}>
                                <Box as={Clock} w={4} h={4} color="whiteAlpha.400" />
                                <Text color="whiteAlpha.400" fontSize="sm">
                                  {formatDuration(protocol.duration)}
                                </Text>
                              </Flex>
                              <Text color="accent.400" fontSize="sm" fontWeight="medium">
                                +{protocol.points} pts
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                        <Box
                          as={ChevronDown}
                          w={5}
                          h={5}
                          color="whiteAlpha.400"
                          transition="transform 0.3s"
                          transform={isExpanded ? 'rotate(180deg)' : undefined}
                          flexShrink={0}
                        />
                      </Flex>
                    </Button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          px={{ base: 4, sm: 5 }}
                          pb={{ base: 4, sm: 5 }}
                          borderTop="1px solid"
                          borderColor="primary.400/30"
                          pt={{ base: 4, sm: 5 }}
                        >
                          {/* Steps */}
                          <Box mb={5}>
                            <Heading as="h4" size="sm" color="white" mb={3}>
                              Protocol Steps
                            </Heading>
                            <Flex direction="column" gap={3}>
                              {protocol.steps.map((step, idx) => (
                                <Flex key={idx} gap={3} align="flex-start">
                                  <Flex
                                    w={7}
                                    h={7}
                                    borderRadius="full"
                                    bg="accent.500/20"
                                    align="center"
                                    justify="center"
                                    flexShrink={0}
                                  >
                                    <Text color="accent.400" fontSize="sm" fontWeight="semibold">
                                      {step.order}
                                    </Text>
                                  </Flex>
                                  <Box flex={1}>
                                    <Text color="white" fontSize="sm">
                                      {step.instruction}
                                    </Text>
                                    {step.duration && (
                                      <Text color="whiteAlpha.500" fontSize="xs" mt={0.5}>
                                        ~{step.duration < 60 ? `${step.duration}s` : `${Math.round(step.duration / 60)}m`}
                                      </Text>
                                    )}
                                    {step.tip && (
                                      <Flex align="center" gap={1.5} mt={1.5}>
                                        <Box as={Info} w={3.5} h={3.5} color="accent.400" />
                                        <Text color="accent.300" fontSize="xs" fontStyle="italic">
                                          {step.tip}
                                        </Text>
                                      </Flex>
                                    )}
                                  </Box>
                                </Flex>
                              ))}
                            </Flex>
                          </Box>

                          {/* Benefits */}
                          <Box mb={5}>
                            <Heading as="h4" size="sm" color="white" mb={3}>
                              Key Benefits
                            </Heading>
                            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
                              {protocol.benefits.map((benefit, idx) => (
                                <Flex key={idx} align="center" gap={2}>
                                  <Box as={Check} w={4} h={4} color="accent.400" flexShrink={0} />
                                  <Text color="whiteAlpha.700" fontSize="sm">
                                    {benefit}
                                  </Text>
                                </Flex>
                              ))}
                            </Grid>
                          </Box>

                          {/* Science Note */}
                          {protocol.scienceNote && (
                            <Box
                              bg="primary.700/50"
                              borderRadius="lg"
                              p={4}
                              mb={5}
                              borderLeft="3px solid"
                              borderColor="accent.500"
                            >
                              <Text color="whiteAlpha.600" fontSize="sm" fontStyle="italic">
                                💡 {protocol.scienceNote}
                              </Text>
                            </Box>
                          )}

                          {/* Contraindications */}
                          {protocol.contraindications && protocol.contraindications.length > 0 && (
                            <Box
                              bg="red.900/30"
                              borderRadius="lg"
                              p={4}
                              mb={5}
                              borderLeft="3px solid"
                              borderColor="red.500"
                            >
                              <Text color="red.300" fontSize="sm" fontWeight="medium" mb={1}>
                                ⚠️ Contraindications
                              </Text>
                              <Text color="red.200" fontSize="sm">
                                {protocol.contraindications.join(', ')}
                              </Text>
                            </Box>
                          )}

                          {/* Action Buttons */}
                          <Flex gap={3}>
                            <Button
                              onClick={() => startTimer(protocol)}
                              flex={1}
                              bgGradient="linear(to-r, accent.500, accent.600)"
                              color="white"
                              fontWeight="semibold"
                              py={3}
                              borderRadius="xl"
                              boxShadow="lg"
                              _hover={{ bgGradient: 'linear(to-r, accent.600, accent.700)' }}
                              _focus={{ ring: 2, ringColor: 'accent.400' }}
                            >
                              <Box as={Play} w={5} h={5} mr={2} />
                              Start Protocol
                            </Button>
                            <Button
                              onClick={() => toggleTask(protocol.id)}
                              px={4}
                              bg={isCompleted ? 'accent.500/20' : 'primary.700/50'}
                              borderWidth="1px"
                              borderColor={isCompleted ? 'accent.500' : 'primary.400'}
                              color={isCompleted ? 'accent.300' : 'whiteAlpha.700'}
                              borderRadius="xl"
                              _hover={{ bg: isCompleted ? 'accent.500/30' : 'primary.700/70' }}
                              _focus={{ ring: 2, ringColor: 'accent.400' }}
                            >
                              <Box as={Check} w={5} h={5} />
                            </Button>
                          </Flex>
                        </Box>
                      </motion.div>
                    )}
                  </Box>
                </motion.div>
              );
            })}
          </Grid>
        ) : (
          <Flex direction="column" align="center" justify="center" py={16}>
            <Flex
              w={20}
              h={20}
              bg="primary.600/30"
              borderRadius="full"
              align="center"
              justify="center"
              mb={4}
            >
              <Box as={FileText} w={10} h={10} color="whiteAlpha.400" />
            </Flex>
            <Text color="whiteAlpha.600" textAlign="center" mb={2} fontSize="lg">
              No protocols found
            </Text>
            <Text color="whiteAlpha.400" fontSize="sm" textAlign="center">
              Try adjusting your filters
            </Text>
          </Flex>
        )}

        {/* Custom Protocol CTA */}
        <Box
          bg="accent.500/10"
          borderWidth="1px"
          borderColor="accent.500/50"
          borderRadius="2xl"
          p={{ base: 5, sm: 6, lg: 8 }}
          textAlign="center"
        >
          <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
            Need a Custom Protocol?
          </Heading>
          <Text
            color="whiteAlpha.600"
            fontSize={{ base: 'sm', sm: 'base' }}
            mb={5}
            maxW="2xl"
            mx="auto"
          >
            Work with our longevity specialists to create a personalized plan
          </Text>
          <Button
            px={8}
            py={3}
            bg="accent.500/20"
            borderWidth="1px"
            borderColor="accent.500"
            color="accent.300"
            borderRadius="full"
            fontWeight="semibold"
            _hover={{ bg: 'accent.500/30' }}
            _focus={{ ring: 2, ringColor: 'accent.400' }}
          >
            Schedule Consultation
          </Button>
        </Box>
      </Flex>
    </>
  );
}
