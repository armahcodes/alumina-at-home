'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { supplements, supplementStacks, supplementCategories } from '@/lib/data/supplements';
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
  Check, ChevronDown, Clock, DollarSign, AlertTriangle, 
  Info, Beaker, Layers, Package, Sun, Heart, Fish, Sparkles,
  Zap, Battery, Grape, Recycle, Cherry, RefreshCw, Flame,
  Dumbbell, Moon, Coffee, Flower2, Brain, Lightbulb, Leaf,
  Citrus, HeartPulse, Ban, Pill,
  type LucideIcon
} from 'lucide-react';

// Icon mapping for supplement icons
const supplementIcons: Record<string, LucideIcon> = {
  'Sun': Sun,
  'Heart': Heart,
  'Fish': Fish,
  'Sparkles': Sparkles,
  'Zap': Zap,
  'Battery': Battery,
  'Grape': Grape,
  'Recycle': Recycle,
  'Cherry': Cherry,
  'RefreshCw': RefreshCw,
  'Flame': Flame,
  'Dumbbell': Dumbbell,
  'Moon': Moon,
  'Coffee': Coffee,
  'Flower': Flower2,
  'Brain': Brain,
  'Lightbulb': Lightbulb,
  'Leaf': Leaf,
  'Citrus': Citrus,
  'HeartPulse': HeartPulse,
};

const getSupplementIcon = (iconName: string): LucideIcon => {
  return supplementIcons[iconName] || Pill;
};

export default function Supplements() {
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTier, setActiveTier] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'supplements' | 'stacks'>('supplements');
  const { supplements: takenSupplements, toggleSupplement } = useStore();
  const shouldReduceMotion = useReducedMotion();

  const categories = ['all', ...Object.keys(supplementCategories)];
  const tiers = ['all', 'essential', 'intermediate', 'advanced'];

  const filteredSupplements = useMemo(() => {
    return supplements.filter(s => {
      const categoryMatch = activeCategory === 'all' || s.category === activeCategory;
      const tierMatch = activeTier === 'all' || s.tier === activeTier;
      return categoryMatch && tierMatch;
    });
  }, [activeCategory, activeTier]);

  const getCategoryMeta = (category: string) => {
    return supplementCategories[category as keyof typeof supplementCategories] || {
      name: category,
      color: 'gray'
    };
  };

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'strong': return 'green';
      case 'moderate': return 'yellow';
      case 'emerging': return 'orange';
      default: return 'gray';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'essential': return 'blue';
      case 'intermediate': return 'purple';
      case 'advanced': return 'pink';
      default: return 'gray';
    }
  };

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* View Toggle */}
      <Flex
        bg="primary.700/50"
        borderRadius="xl"
        p={1}
        w={{ base: 'full', sm: 'fit-content' }}
      >
        <Button
          onClick={() => setViewMode('supplements')}
          flex={{ base: 1, sm: 'initial' }}
          px={{ base: 3, sm: 4 }}
          py={2}
          minH="44px"
          borderRadius="lg"
          fontSize={{ base: 'xs', sm: 'sm' }}
          fontWeight="medium"
          bg={viewMode === 'supplements' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'supplements' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white', bg: viewMode === 'supplements' ? 'accent.500/30' : 'whiteAlpha.50' }}
          _active={{ transform: 'scale(0.98)' }}
          transition="all 0.2s"
        >
          <Box as={Beaker} w={4} h={4} mr={2} />
          Supplements
        </Button>
        <Button
          onClick={() => setViewMode('stacks')}
          flex={{ base: 1, sm: 'initial' }}
          px={{ base: 3, sm: 4 }}
          py={2}
          minH="44px"
          borderRadius="lg"
          fontSize={{ base: 'xs', sm: 'sm' }}
          fontWeight="medium"
          bg={viewMode === 'stacks' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'stacks' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white', bg: viewMode === 'stacks' ? 'accent.500/30' : 'whiteAlpha.50' }}
          _active={{ transform: 'scale(0.98)' }}
          transition="all 0.2s"
        >
          <Box as={Layers} w={4} h={4} mr={2} />
          Stacks
        </Button>
      </Flex>

      {viewMode === 'supplements' ? (
        <>
          {/* Filters */}
          <Box>
            <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
              Category
            </Text>
            <Flex
              gap={2}
              overflowX="auto"
              pb={2}
              mb={4}
              mx={{ base: -4, sm: 0 }}
              px={{ base: 4, sm: 0 }}
              className="hide-scrollbar"
            >
              {categories.map((category) => {
                const meta = category !== 'all' ? getCategoryMeta(category) : null;
                return (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    px={3}
                    py={2}
                    borderRadius="full"
                    fontSize="xs"
                    whiteSpace="nowrap"
                    bg={activeCategory === category ? 'accent.500/20' : 'primary.600/50'}
                    borderWidth="1px"
                    borderColor={activeCategory === category ? 'accent.500' : 'primary.400'}
                    color={activeCategory === category ? 'accent.300' : 'whiteAlpha.600'}
                    _hover={{ bg: activeCategory === category ? 'accent.500/30' : 'primary.600/70' }}
                    _focus={{ ring: 2, ringColor: 'accent.400' }}
                  >
                    {category === 'all' ? 'All' : meta?.name}
                  </Button>
                );
              })}
            </Flex>

            <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
              Tier
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {tiers.map((tier) => (
                <Button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  aria-pressed={activeTier === tier}
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  fontSize="xs"
                  textTransform="capitalize"
                  bg={activeTier === tier ? 'accent.500/20' : 'transparent'}
                  borderWidth="1px"
                  borderColor={activeTier === tier ? 'accent.500' : 'primary.400'}
                  color={activeTier === tier ? 'accent.300' : 'whiteAlpha.600'}
                  _hover={{ bg: activeTier === tier ? 'accent.500/30' : 'primary.600/50' }}
                  _focus={{ ring: 2, ringColor: 'accent.400' }}
                >
                  {tier === 'all' ? 'All Tiers' : tier}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Results Count */}
          <Text color="whiteAlpha.500" fontSize="sm">
            Showing {filteredSupplements.length} supplement{filteredSupplements.length !== 1 ? 's' : ''}
          </Text>

          {/* Supplements Grid */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
            {filteredSupplements.map((supplement, index) => {
              const isTaken = takenSupplements.includes(supplement.id);
              const isExpanded = selectedSupplement === supplement.id;
              // Category for potential future use

              return (
                <motion.div
                  key={supplement.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.03, duration: 0.3 }}
                >
                  <Box
                    bg={isTaken ? 'accent.500/10' : 'primary.600/50'}
                    borderWidth="1px"
                    borderColor={isTaken ? 'accent.500/30' : 'primary.400'}
                    borderRadius="2xl"
                    overflow="hidden"
                    transition="all 0.3s"
                    _hover={{ borderColor: isTaken ? 'accent.500/50' : 'primary.300' }}
                  >
                    {/* Header */}
                    <Button
                      onClick={() => setSelectedSupplement(isExpanded ? null : supplement.id)}
                      aria-expanded={isExpanded}
                      w="full"
                      p={{ base: 4, sm: 5 }}
                      textAlign="left"
                      bg="transparent"
                      _hover={{ bg: 'whiteAlpha.50' }}
                      _focus={{ ring: 2, ringColor: 'accent.400' }}
                      borderRadius={0}
                      h="auto"
                    >
                      <Flex align="flex-start" justify="space-between" w="full">
                        <Flex align="flex-start" gap={3} flex={1} pr={4}>
                          <Flex
                            w={12}
                            h={12}
                            bg="accent.500/20"
                            borderRadius="lg"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={getSupplementIcon(supplement.icon)} w={6} h={6} color="accent.400" />
                          </Flex>
                          <Box flex={1}>
                            <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                              <Heading as="h3" size="sm" color={isTaken ? 'whiteAlpha.600' : 'white'}>
                                {supplement.name}
                              </Heading>
                              {isTaken && <Box as={Check} w={4} h={4} color="accent.400" />}
                            </Flex>
                            <Flex gap={2} mb={2} flexWrap="wrap">
                              <Badge
                                px={2}
                                py={0.5}
                                bg={`${getTierColor(supplement.tier)}.500/20`}
                                color={`${getTierColor(supplement.tier)}.300`}
                                borderRadius="md"
                                fontSize="xs"
                                textTransform="capitalize"
                              >
                                {supplement.tier}
                              </Badge>
                              <Badge
                                px={2}
                                py={0.5}
                                bg={`${getEvidenceColor(supplement.evidenceLevel)}.500/20`}
                                color={`${getEvidenceColor(supplement.evidenceLevel)}.300`}
                                borderRadius="md"
                                fontSize="xs"
                              >
                                {supplement.evidenceLevel} evidence
                              </Badge>
                            </Flex>
                            <Text color="whiteAlpha.600" fontSize="sm" lineClamp={2}>
                              {supplement.description}
                            </Text>
                            <Flex align="center" gap={3} mt={2}>
                              <Flex align="center" gap={1}>
                                <Box as={DollarSign} w={3.5} h={3.5} color="whiteAlpha.400" />
                                <Text color="whiteAlpha.400" fontSize="xs">
                                  {supplement.monthlyBudget}
                                </Text>
                              </Flex>
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
                      >
                        <Box
                          px={{ base: 4, sm: 5 }}
                          pb={{ base: 4, sm: 5 }}
                          borderTop="1px solid"
                          borderColor="primary.400/30"
                          pt={{ base: 4, sm: 5 }}
                        >
                          {/* Dosage */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              Dosage
                            </Heading>
                            <Box bg="primary.700/50" borderRadius="lg" p={3}>
                              <Text color="accent.300" fontWeight="semibold" fontSize="lg">
                                {supplement.dosage.amount}
                              </Text>
                              <Text color="whiteAlpha.600" fontSize="sm">
                                {supplement.dosage.frequency} • Best taken {supplement.dosage.timing.replace('-', ' ')}
                              </Text>
                              {supplement.dosage.notes && (
                                <Text color="whiteAlpha.500" fontSize="xs" mt={2} fontStyle="italic">
                                  {supplement.dosage.notes}
                                </Text>
                              )}
                            </Box>
                          </Box>

                          {/* Benefits */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              Benefits
                            </Heading>
                            <Flex direction="column" gap={1.5}>
                              {supplement.benefits.map((benefit, idx) => (
                                <Flex key={idx} align="center" gap={2}>
                                  <Box as={Check} w={4} h={4} color="accent.400" flexShrink={0} />
                                  <Text color="whiteAlpha.700" fontSize="sm">{benefit}</Text>
                                </Flex>
                              ))}
                            </Flex>
                          </Box>

                          {/* Mechanisms */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              How It Works
                            </Heading>
                            <Flex direction="column" gap={1.5}>
                              {supplement.mechanisms.map((mechanism, idx) => (
                                <Flex key={idx} align="flex-start" gap={2}>
                                  <Box as={Info} w={4} h={4} color="blue.400" mt={0.5} flexShrink={0} />
                                  <Text color="whiteAlpha.600" fontSize="sm">{mechanism}</Text>
                                </Flex>
                              ))}
                            </Flex>
                          </Box>

                          {/* Interactions & Side Effects */}
                          {(supplement.interactions?.length || supplement.sideEffects?.length) && (
                            <Box
                              bg="yellow.900/30"
                              borderRadius="lg"
                              p={4}
                              mb={5}
                              borderLeft="3px solid"
                              borderColor="yellow.500"
                            >
                              {supplement.interactions && supplement.interactions.length > 0 && (
                                <Box mb={supplement.sideEffects?.length ? 3 : 0}>
                                  <Flex align="center" gap={1.5} mb={1}>
                                    <Box as={AlertTriangle} w={4} h={4} color="yellow.400" />
                                    <Text color="yellow.300" fontSize="sm" fontWeight="medium">
                                      Interactions
                                    </Text>
                                  </Flex>
                                  <Text color="yellow.200" fontSize="sm">
                                    {supplement.interactions.join(', ')}
                                  </Text>
                                </Box>
                              )}
                              {supplement.sideEffects && supplement.sideEffects.length > 0 && (
                                <Box>
                                  <Text color="yellow.300" fontSize="sm" fontWeight="medium" mb={1}>
                                    Side Effects
                                  </Text>
                                  <Text color="yellow.200" fontSize="sm">
                                    {supplement.sideEffects.join(', ')}
                                  </Text>
                                </Box>
                              )}
                            </Box>
                          )}

                          {/* Contraindications */}
                          {supplement.contraindications && supplement.contraindications.length > 0 && (
                            <Box
                              bg="red.900/30"
                              borderRadius="lg"
                              p={4}
                              mb={5}
                              borderLeft="3px solid"
                              borderColor="red.500"
                            >
                              <Flex align="center" gap={1.5} mb={1}>
                                <Box as={Ban} w={4} h={4} color="red.400" />
                                <Text color="red.300" fontSize="sm" fontWeight="medium">
                                  Contraindications
                                </Text>
                              </Flex>
                              <Text color="red.200" fontSize="sm">
                                {supplement.contraindications.join(', ')}
                              </Text>
                            </Box>
                          )}

                          {/* Stacks Well With */}
                          {supplement.stacksWith && supplement.stacksWith.length > 0 && (
                            <Box mb={5}>
                              <Heading as="h4" size="xs" color="white" mb={2}>
                                Stacks Well With
                              </Heading>
                              <Flex gap={2} flexWrap="wrap">
                                {supplement.stacksWith.map((stackId) => {
                                  const stackSupplement = supplements.find(s => s.id === stackId);
                                  return stackSupplement ? (
                                    <Badge
                                      key={stackId}
                                      px={3}
                                      py={1}
                                      bg="accent.500/20"
                                      color="accent.300"
                                      borderRadius="full"
                                      fontSize="xs"
                                    >
                                      <Flex align="center" gap={1}>
                                        <Box as={getSupplementIcon(stackSupplement.icon)} w={3} h={3} />
                                        {stackSupplement.name}
                                      </Flex>
                                    </Badge>
                                  ) : null;
                                })}
                              </Flex>
                            </Box>
                          )}

                          {/* Action Button */}
                          <Button
                            onClick={() => toggleSupplement(supplement.id)}
                            w="full"
                            bgGradient={isTaken ? undefined : 'linear(to-r, accent.500, accent.600)'}
                            bg={isTaken ? 'accent.500/20' : undefined}
                            borderWidth={isTaken ? '1px' : 0}
                            borderColor="accent.500"
                            color={isTaken ? 'accent.300' : 'white'}
                            fontWeight="semibold"
                            py={3}
                            borderRadius="xl"
                            boxShadow={isTaken ? 'none' : 'lg'}
                            _hover={{
                              bgGradient: isTaken ? undefined : 'linear(to-r, accent.600, accent.700)',
                              bg: isTaken ? 'accent.500/30' : undefined
                            }}
                            _focus={{ ring: 2, ringColor: 'accent.400' }}
                          >
                            <Box as={isTaken ? Check : Clock} w={5} h={5} mr={2} />
                            {isTaken ? 'Taken Today' : 'Mark as Taken'}
                          </Button>
                        </Box>
                      </motion.div>
                    )}
                  </Box>
                </motion.div>
              );
            })}
          </Grid>
        </>
      ) : (
        /* Stacks View */
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
          {supplementStacks.map((stack, index) => (
            <motion.div
              key={stack.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.05 }}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 6 }}
                _hover={{ borderColor: 'primary.300' }}
                transition="all 0.3s"
              >
                <Flex align="center" gap={3} mb={3}>
                  <Flex
                    w={12}
                    h={12}
                    bg="accent.500/20"
                    borderRadius="lg"
                    align="center"
                    justify="center"
                  >
                    <Box as={Package} w={6} h={6} color="accent.400" />
                  </Flex>
                  <Box flex={1}>
                    <Heading as="h3" size="md" color="white">
                      {stack.name}
                    </Heading>
                    <Flex gap={2} mt={1}>
                      <Badge
                        px={2}
                        py={0.5}
                        bg={`${getTierColor(stack.tier)}.500/20`}
                        color={`${getTierColor(stack.tier)}.300`}
                        borderRadius="md"
                        fontSize="xs"
                        textTransform="capitalize"
                      >
                        {stack.tier}
                      </Badge>
                      <Badge
                        px={2}
                        py={0.5}
                        bg="green.500/20"
                        color="green.300"
                        borderRadius="md"
                        fontSize="xs"
                      >
                        {stack.monthlyBudget}
                      </Badge>
                    </Flex>
                  </Box>
                </Flex>

                <Text color="whiteAlpha.600" fontSize="sm" mb={4}>
                  {stack.description}
                </Text>

                <Box>
                  <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={2}>
                    INCLUDES
                  </Text>
                  <Flex direction="column" gap={2}>
                    {stack.supplements.map((item) => {
                      const supp = supplements.find(s => s.id === item.supplementId);
                      if (!supp) return null;
                      return (
                        <Flex
                          key={item.supplementId}
                          align="center"
                          justify="space-between"
                          bg="primary.700/50"
                          borderRadius="lg"
                          px={3}
                          py={2}
                        >
                          <Flex align="center" gap={2}>
                            <Box as={getSupplementIcon(supp.icon)} w={4} h={4} color="accent.400" />
                            <Text color="white" fontSize="sm" fontWeight="medium">
                              {supp.name}
                            </Text>
                          </Flex>
                          <Flex align="center" gap={2}>
                            <Text color="whiteAlpha.500" fontSize="xs">
                              {item.timing}
                            </Text>
                            <Badge
                              px={2}
                              py={0.5}
                              bg={item.priority === 'required' ? 'accent.500/20' : item.priority === 'recommended' ? 'blue.500/20' : 'whiteAlpha.100'}
                              color={item.priority === 'required' ? 'accent.300' : item.priority === 'recommended' ? 'blue.300' : 'whiteAlpha.500'}
                              borderRadius="md"
                              fontSize="10px"
                              textTransform="capitalize"
                            >
                              {item.priority}
                            </Badge>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Grid>
      )}

      {/* Disclaimer */}
      <Box
        bg="yellow.900/20"
        borderWidth="1px"
        borderColor="yellow.500/30"
        borderRadius="xl"
        p={4}
      >
        <Flex align="flex-start" gap={3}>
          <Box as={AlertTriangle} w={5} h={5} color="yellow.400" flexShrink={0} mt={0.5} />
          <Box>
            <Text color="yellow.300" fontSize="sm" fontWeight="medium" mb={1}>
              Important Disclaimer
            </Text>
            <Text color="yellow.200/70" fontSize="xs">
              This information is for educational purposes only and is not medical advice. 
              Consult a healthcare provider before starting any supplement regimen, especially 
              if you have health conditions or take medications.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
