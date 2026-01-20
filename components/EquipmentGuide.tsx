'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { equipment, equipmentCategories, equipmentBundles } from '@/lib/data/equipment';
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
  ChevronDown, DollarSign, Check, ExternalLink, Star, 
  Package, ShoppingBag, Snowflake, Flame, Sun, Moon, 
  Dumbbell, RefreshCw, Wind, Droplet, Activity, Stethoscope
} from 'lucide-react';

const categoryIcons: Record<string, typeof Snowflake> = {
  'cold-exposure': Snowflake,
  'heat-exposure': Flame,
  'light-therapy': Sun,
  'sleep': Moon,
  'fitness': Dumbbell,
  'recovery': RefreshCw,
  'air-quality': Wind,
  'water': Droplet,
  'monitoring': Activity,
  'breathwork': Stethoscope,
};

export default function EquipmentGuide() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTier, setActiveTier] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'equipment' | 'bundles'>('equipment');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['all', ...Object.keys(equipmentCategories)];
  const tiers = ['all', 'essential', 'intermediate', 'premium'];

  const filteredEquipment = useMemo(() => {
    return equipment.filter(e => {
      const categoryMatch = activeCategory === 'all' || e.category === activeCategory;
      const tierMatch = activeTier === 'all' || e.tier === activeTier;
      return categoryMatch && tierMatch;
    });
  }, [activeCategory, activeTier]);

  const getCategoryMeta = (category: string) => {
    return equipmentCategories[category as keyof typeof equipmentCategories] || {
      name: category,
      icon: '📦'
    };
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'essential': return 'green';
      case 'intermediate': return 'blue';
      case 'premium': return 'purple';
      default: return 'gray';
    }
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case 'essential': return 'Budget-friendly basics';
      case 'intermediate': return 'Quality upgrades';
      case 'premium': return 'Best-in-class';
      default: return '';
    }
  };

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* View Toggle */}
      <Flex
        bg="primary.700/50"
        borderRadius="xl"
        p={1}
        w="fit-content"
      >
        <Button
          onClick={() => setViewMode('equipment')}
          px={4}
          py={2}
          borderRadius="lg"
          fontSize="sm"
          fontWeight="medium"
          bg={viewMode === 'equipment' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'equipment' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white' }}
        >
          <Box as={ShoppingBag} w={4} h={4} mr={2} />
          All Equipment
        </Button>
        <Button
          onClick={() => setViewMode('bundles')}
          px={4}
          py={2}
          borderRadius="lg"
          fontSize="sm"
          fontWeight="medium"
          bg={viewMode === 'bundles' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'bundles' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white' }}
        >
          <Box as={Package} w={4} h={4} mr={2} />
          Bundles
        </Button>
      </Flex>

      {viewMode === 'equipment' ? (
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
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              {categories.map((category) => {
                const meta = category !== 'all' ? getCategoryMeta(category) : null;
                const IconComponent = category !== 'all' ? categoryIcons[category] : null;
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
                    {IconComponent && <Box as={IconComponent} w={3.5} h={3.5} mr={1.5} />}
                    {category === 'all' ? 'All' : meta?.name}
                  </Button>
                );
              })}
            </Flex>

            <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
              Budget Tier
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
            Showing {filteredEquipment.length} item{filteredEquipment.length !== 1 ? 's' : ''}
          </Text>

          {/* Equipment Grid */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
            {filteredEquipment.map((item, index) => {
              const isExpanded = selectedEquipment === item.id;
              const categoryMeta = getCategoryMeta(item.category);
              const IconComponent = categoryIcons[item.category] || Package;

              return (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.03, duration: 0.3 }}
                >
                  <Box
                    bg="primary.600/50"
                    borderWidth="1px"
                    borderColor="primary.400"
                    borderRadius="2xl"
                    overflow="hidden"
                    transition="all 0.3s"
                    _hover={{ borderColor: 'primary.300' }}
                  >
                    {/* Header */}
                    <Button
                      onClick={() => setSelectedEquipment(isExpanded ? null : item.id)}
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
                            <Box as={IconComponent} w={6} h={6} color="accent.400" />
                          </Flex>
                          <Box flex={1}>
                            <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                              <Heading as="h3" size="sm" color="white">
                                {item.name}
                              </Heading>
                            </Flex>
                            {item.brand && (
                              <Text color="accent.300" fontSize="xs" mb={1}>
                                {item.brand}
                              </Text>
                            )}
                            <Flex gap={2} mb={2} flexWrap="wrap">
                              <Badge
                                px={2}
                                py={0.5}
                                bg={`${getTierColor(item.tier)}.500/20`}
                                color={`${getTierColor(item.tier)}.300`}
                                borderRadius="md"
                                fontSize="xs"
                                textTransform="capitalize"
                              >
                                {item.tier}
                              </Badge>
                              <Badge
                                px={2}
                                py={0.5}
                                bg="primary.700/50"
                                color="whiteAlpha.600"
                                borderRadius="md"
                                fontSize="xs"
                              >
                                {categoryMeta.name}
                              </Badge>
                            </Flex>
                            <Text color="whiteAlpha.600" fontSize="sm" lineClamp={2}>
                              {item.description}
                            </Text>
                            <Flex align="center" gap={1} mt={2}>
                              <Box as={DollarSign} w={4} h={4} color="green.400" />
                              <Text color="green.300" fontSize="sm" fontWeight="medium">
                                {item.priceRange}
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
                      >
                        <Box
                          px={{ base: 4, sm: 5 }}
                          pb={{ base: 4, sm: 5 }}
                          borderTop="1px solid"
                          borderColor="primary.400/30"
                          pt={{ base: 4, sm: 5 }}
                        >
                          {/* Benefits */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              Benefits
                            </Heading>
                            <Flex direction="column" gap={1.5}>
                              {item.benefits.map((benefit, idx) => (
                                <Flex key={idx} align="center" gap={2}>
                                  <Box as={Check} w={4} h={4} color="accent.400" flexShrink={0} />
                                  <Text color="whiteAlpha.700" fontSize="sm">{benefit}</Text>
                                </Flex>
                              ))}
                            </Flex>
                          </Box>

                          {/* Features */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              Key Features
                            </Heading>
                            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
                              {item.features.map((feature, idx) => (
                                <Flex key={idx} align="center" gap={2}>
                                  <Box as={Star} w={3} h={3} color="yellow.400" flexShrink={0} />
                                  <Text color="whiteAlpha.600" fontSize="sm">{feature}</Text>
                                </Flex>
                              ))}
                            </Grid>
                          </Box>

                          {/* Use Cases */}
                          <Box mb={5}>
                            <Heading as="h4" size="xs" color="white" mb={2}>
                              Best For
                            </Heading>
                            <Flex gap={2} flexWrap="wrap">
                              {item.useCases.map((useCase, idx) => (
                                <Badge
                                  key={idx}
                                  px={3}
                                  py={1}
                                  bg="primary.700/50"
                                  color="whiteAlpha.700"
                                  borderRadius="full"
                                  fontSize="xs"
                                >
                                  {useCase}
                                </Badge>
                              ))}
                            </Flex>
                          </Box>

                          {/* Related Protocols */}
                          {item.relatedProtocols.length > 0 && (
                            <Box mb={5}>
                              <Heading as="h4" size="xs" color="white" mb={2}>
                                Related Protocols
                              </Heading>
                              <Flex gap={2} flexWrap="wrap">
                                {item.relatedProtocols.map((protocolId) => (
                                  <Badge
                                    key={protocolId}
                                    px={3}
                                    py={1}
                                    bg="accent.500/20"
                                    color="accent.300"
                                    borderRadius="full"
                                    fontSize="xs"
                                  >
                                    {protocolId.replace(/-/g, ' ')}
                                  </Badge>
                                ))}
                              </Flex>
                            </Box>
                          )}

                          {/* Purchase CTA */}
                          <a
                            href={item.purchaseLink || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'block', width: '100%' }}
                          >
                            <Button
                              w="full"
                              bgGradient="linear(to-r, accent.500, accent.600)"
                              color="white"
                              fontWeight="semibold"
                              py={3}
                              borderRadius="xl"
                              boxShadow="lg"
                              _hover={{ bgGradient: 'linear(to-r, accent.600, accent.700)' }}
                              _focus={{ ring: 2, ringColor: 'accent.400' }}
                            >
                              <Box as={ExternalLink} w={4} h={4} mr={2} />
                              View Product
                            </Button>
                          </a>
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
        /* Bundles View */
        <Grid templateColumns={{ base: '1fr' }} gap={6}>
          {equipmentBundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.1 }}
            >
              <Box
                bg="primary.600/50"
                borderWidth="2px"
                borderColor={bundle.tier === 'premium' ? 'purple.500/50' : bundle.tier === 'intermediate' ? 'blue.500/50' : 'green.500/50'}
                borderRadius="2xl"
                p={{ base: 5, sm: 6, lg: 8 }}
                position="relative"
                overflow="hidden"
              >
                {/* Decorative gradient */}
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="40%"
                  h="40%"
                  bgGradient={
                    bundle.tier === 'premium' 
                      ? 'radial(purple.500/20, transparent)' 
                      : bundle.tier === 'intermediate' 
                      ? 'radial(blue.500/20, transparent)' 
                      : 'radial(green.500/20, transparent)'
                  }
                  pointerEvents="none"
                />

                <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
                  {/* Bundle Info */}
                  <Box flex={1}>
                    <Flex align="center" gap={3} mb={3}>
                      <Flex
                        w={14}
                        h={14}
                        bg="accent.500/20"
                        borderRadius="xl"
                        align="center"
                        justify="center"
                      >
                        <Box as={Package} w={7} h={7} color="accent.400" />
                      </Flex>
                      <Box>
                        <Heading as="h3" size="lg" color="white">
                          {bundle.name}
                        </Heading>
                        <Flex gap={2} mt={1}>
                          <Badge
                            px={2}
                            py={0.5}
                            bg={`${getTierColor(bundle.tier)}.500/20`}
                            color={`${getTierColor(bundle.tier)}.300`}
                            borderRadius="md"
                            fontSize="xs"
                            textTransform="capitalize"
                          >
                            {bundle.tier}
                          </Badge>
                          <Badge
                            px={2}
                            py={0.5}
                            bg="green.500/20"
                            color="green.300"
                            borderRadius="md"
                            fontSize="xs"
                          >
                            {bundle.totalBudget}
                          </Badge>
                        </Flex>
                      </Box>
                    </Flex>

                    <Text color="whiteAlpha.600" fontSize="base" mb={4}>
                      {bundle.description}
                    </Text>

                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={1}>
                      {getTierDescription(bundle.tier)}
                    </Text>
                  </Box>

                  {/* Equipment List */}
                  <Box flex={1}>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={3}>
                      INCLUDED ({bundle.equipment.length} ITEMS)
                    </Text>
                    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
                      {bundle.equipment.map((equipmentId) => {
                        const item = equipment.find(e => e.id === equipmentId);
                        if (!item) return null;
                        const IconComponent = categoryIcons[item.category] || Package;
                        return (
                          <Flex
                            key={equipmentId}
                            align="center"
                            gap={2}
                            bg="primary.700/50"
                            borderRadius="lg"
                            px={3}
                            py={2}
                          >
                            <Box as={IconComponent} w={4} h={4} color="accent.400" />
                            <Text color="white" fontSize="sm" fontWeight="medium" lineClamp={1}>
                              {item.name}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Grid>
                  </Box>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </Grid>
      )}

      {/* Consultation CTA */}
      <Box
        bg="accent.500/10"
        borderWidth="1px"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, lg: 8 }}
        textAlign="center"
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
          Need Personalized Recommendations?
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={5}
          maxW="2xl"
          mx="auto"
        >
          Our experts can help you choose the right equipment based on your goals, space, and budget
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
          Get Expert Advice
        </Button>
      </Box>
    </Flex>
  );
}
