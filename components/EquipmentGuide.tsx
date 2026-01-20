'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
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
  Dumbbell, RefreshCw, Wind, Droplet, Activity, Stethoscope,
  type LucideIcon
} from 'lucide-react';

// Category icons mapping
const categoryIcons: Record<string, LucideIcon> = {
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

// Unsplash images for categories
const categoryImages: Record<string, string> = {
  'cold-exposure': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  'heat-exposure': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80',
  'light-therapy': 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&q=80',
  'sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&q=80',
  'fitness': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  'recovery': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
  'air-quality': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80',
  'water': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
  'monitoring': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80',
  'breathwork': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
};

// Bundle images
const bundleImages: Record<string, string> = {
  'starter': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
  'intermediate': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  'premium': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
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
      icon: 'Package'
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

  const getCategoryImage = (category: string): string => {
    return categoryImages[category] || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80';
  };

  return (
    <Flex direction="column" gap={{ base: 5, sm: 6, md: 8 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={{ base: 2, sm: 4 }}>
        <Heading as="h1" size={{ base: 'lg', sm: 'xl' }} color="white" mb={2}>
          Equipment Guide
        </Heading>
        <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'md' }} maxW="lg" mx="auto">
          Curated tools for optimal home longevity environment
        </Text>
      </Box>

      {/* View Toggle */}
      <Flex
        bg="primary.700/50"
        borderRadius="xl"
        p={1}
        w="full"
        maxW={{ sm: 'fit-content' }}
        mx={{ sm: 'auto', md: 0 }}
      >
        <Button
          onClick={() => setViewMode('equipment')}
          flex={1}
          px={{ base: 4, sm: 5 }}
          py={2.5}
          minH="48px"
          borderRadius="lg"
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="medium"
          bg={viewMode === 'equipment' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'equipment' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white', bg: viewMode === 'equipment' ? 'accent.500/30' : 'whiteAlpha.50' }}
          _active={{ transform: 'scale(0.98)' }}
          transition="all 0.2s"
          gap={2}
        >
          <Box as={ShoppingBag} w={4} h={4} />
          Equipment
        </Button>
        <Button
          onClick={() => setViewMode('bundles')}
          flex={1}
          px={{ base: 4, sm: 5 }}
          py={2.5}
          minH="48px"
          borderRadius="lg"
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="medium"
          bg={viewMode === 'bundles' ? 'accent.500/20' : 'transparent'}
          color={viewMode === 'bundles' ? 'accent.300' : 'whiteAlpha.600'}
          _hover={{ color: 'white', bg: viewMode === 'bundles' ? 'accent.500/30' : 'whiteAlpha.50' }}
          _active={{ transform: 'scale(0.98)' }}
          transition="all 0.2s"
          gap={2}
        >
          <Box as={Package} w={4} h={4} />
          Bundles
        </Button>
      </Flex>

      <AnimatePresence mode="wait">
        {viewMode === 'equipment' ? (
          <motion.div
            key="equipment"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Flex direction="column" gap={{ base: 5, sm: 6 }}>
              {/* Filters */}
              <Box
                bg="primary.700/30"
                borderRadius="xl"
                p={{ base: 4, sm: 5 }}
                borderWidth="1px"
                borderColor="primary.600"
              >
                <Text color="white" fontSize="sm" mb={3} fontWeight="semibold">
                  Filter by Category
                </Text>
                <Flex
                  gap={2}
                  overflowX="auto"
                  pb={3}
                  mb={4}
                  mx={{ base: -4, sm: 0 }}
                  px={{ base: 4, sm: 0 }}
                  className="hide-scrollbar"
                  css={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                  }}
                >
                  {categories.map((category) => {
                    const meta = category !== 'all' ? getCategoryMeta(category) : null;
                    const IconComponent = category !== 'all' ? categoryIcons[category] : null;
                    const isActive = activeCategory === category;
                    return (
                      <Button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={isActive}
                        px={3}
                        py={2}
                        minH="40px"
                        borderRadius="full"
                        fontSize="xs"
                        whiteSpace="nowrap"
                        bg={isActive ? 'accent.500/20' : 'primary.600/50'}
                        borderWidth="1px"
                        borderColor={isActive ? 'accent.500' : 'transparent'}
                        color={isActive ? 'accent.300' : 'whiteAlpha.700'}
                        _hover={{ bg: isActive ? 'accent.500/30' : 'primary.600/70', color: 'white' }}
                        _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: '2px' }}
                        transition="all 0.2s"
                        gap={1.5}
                      >
                        {IconComponent && <Box as={IconComponent} w={3.5} h={3.5} />}
                        {category === 'all' ? 'All' : meta?.name}
                      </Button>
                    );
                  })}
                </Flex>

                <Text color="white" fontSize="sm" mb={3} fontWeight="semibold">
                  Budget Tier
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {tiers.map((tier) => {
                    const isActive = activeTier === tier;
                    return (
                      <Button
                        key={tier}
                        onClick={() => setActiveTier(tier)}
                        aria-pressed={isActive}
                        px={4}
                        py={2}
                        minH="40px"
                        borderRadius="full"
                        fontSize="xs"
                        textTransform="capitalize"
                        bg={isActive ? `${getTierColor(tier)}.500/20` : 'transparent'}
                        borderWidth="1px"
                        borderColor={isActive ? `${getTierColor(tier)}.500` : 'primary.500'}
                        color={isActive ? `${getTierColor(tier)}.300` : 'whiteAlpha.600'}
                        _hover={{ bg: isActive ? `${getTierColor(tier)}.500/30` : 'primary.600/50', color: 'white' }}
                        _focus={{ ring: 2, ringColor: `${getTierColor(tier)}.400` }}
                        transition="all 0.2s"
                      >
                        {tier === 'all' ? 'All Tiers' : tier}
                      </Button>
                    );
                  })}
                </Flex>
              </Box>

              {/* Results Count */}
              <Text color="whiteAlpha.500" fontSize="sm" fontWeight="medium">
                Showing {filteredEquipment.length} item{filteredEquipment.length !== 1 ? 's' : ''}
              </Text>

              {/* Equipment Grid */}
              <Grid 
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
                gap={{ base: 4, sm: 5 }}
              >
                {filteredEquipment.map((item, index) => {
                  const isExpanded = selectedEquipment === item.id;
                  const categoryMeta = getCategoryMeta(item.category);
                  const IconComponent = categoryIcons[item.category] || Package;
                  const imageUrl = getCategoryImage(item.category);

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
                        borderColor={isExpanded ? 'accent.500/50' : 'primary.400'}
                        borderRadius="2xl"
                        overflow="hidden"
                        transition="all 0.3s"
                        _hover={{ borderColor: 'accent.500/30', boxShadow: 'lg' }}
                      >
                        {/* Card Header with Image */}
                        <Box position="relative" h={{ base: '120px', sm: '140px' }} overflow="hidden">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                          />
                          <Box
                            position="absolute"
                            inset={0}
                            bgGradient="linear(to-b, transparent 20%, rgba(7, 18, 16, 0.9) 100%)"
                          />
                          
                          {/* Category & Tier Badges */}
                          <Flex position="absolute" top={3} left={3} gap={2}>
                            <Badge
                              px={2}
                              py={1}
                              bg={`${getTierColor(item.tier)}.500/90`}
                              color="white"
                              borderRadius="md"
                              fontSize="10px"
                              fontWeight="bold"
                              textTransform="uppercase"
                            >
                              {item.tier}
                            </Badge>
                          </Flex>

                          {/* Price */}
                          <Flex position="absolute" top={3} right={3}>
                            <Badge
                              px={2}
                              py={1}
                              bg="green.500/90"
                              color="white"
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="semibold"
                            >
                              <Flex align="center" gap={0.5}>
                                <Box as={DollarSign} w={3} h={3} />
                                {item.priceRange}
                              </Flex>
                            </Badge>
                          </Flex>

                          {/* Category Icon */}
                          <Flex
                            position="absolute"
                            bottom={3}
                            left={3}
                            w={10}
                            h={10}
                            bg="accent.500/20"
                            backdropFilter="blur(8px)"
                            borderRadius="lg"
                            align="center"
                            justify="center"
                          >
                            <Box as={IconComponent} w={5} h={5} color="accent.400" />
                          </Flex>
                        </Box>

                        {/* Card Content */}
                        <Box p={{ base: 4, sm: 5 }}>
                          <Flex align="center" gap={2} mb={1}>
                            <Heading as="h3" size="sm" color="white" lineClamp={1}>
                              {item.name}
                            </Heading>
                          </Flex>
                          
                          {item.brand && (
                            <Text color="accent.300" fontSize="xs" mb={2}>
                              {item.brand}
                            </Text>
                          )}

                          <Badge
                            px={2}
                            py={0.5}
                            bg="primary.700/50"
                            color="whiteAlpha.600"
                            borderRadius="md"
                            fontSize="10px"
                            mb={2}
                          >
                            {categoryMeta.name}
                          </Badge>
                          
                          <Text color="whiteAlpha.600" fontSize="sm" lineClamp={2} mb={3}>
                            {item.description}
                          </Text>

                          {/* Expand/Collapse Button */}
                          <Button
                            onClick={() => setSelectedEquipment(isExpanded ? null : item.id)}
                            aria-expanded={isExpanded}
                            w="full"
                            py={2.5}
                            bg={isExpanded ? 'accent.500/20' : 'primary.700/50'}
                            borderWidth="1px"
                            borderColor={isExpanded ? 'accent.500' : 'primary.500'}
                            color={isExpanded ? 'accent.300' : 'whiteAlpha.700'}
                            borderRadius="lg"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ bg: isExpanded ? 'accent.500/30' : 'primary.700/70' }}
                            _focus={{ ring: 2, ringColor: 'accent.400' }}
                            transition="all 0.2s"
                            gap={2}
                          >
                            {isExpanded ? 'Show Less' : 'View Details'}
                            <Box
                              as={ChevronDown}
                              w={4}
                              h={4}
                              transition="transform 0.3s"
                              transform={isExpanded ? 'rotate(180deg)' : undefined}
                            />
                          </Button>
                        </Box>

                        {/* Expanded Content */}
                        <AnimatePresence>
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
                                {/* Benefits */}
                                <Box mb={5}>
                                  <Heading as="h4" size="xs" color="white" mb={3}>
                                    Benefits
                                  </Heading>
                                  <Flex direction="column" gap={2}>
                                    {item.benefits.map((benefit, idx) => (
                                      <Flex key={idx} align="flex-start" gap={2}>
                                        <Box 
                                          as={Check} 
                                          w={4} 
                                          h={4} 
                                          color="accent.400" 
                                          flexShrink={0} 
                                          mt={0.5}
                                        />
                                        <Text color="whiteAlpha.700" fontSize="sm">{benefit}</Text>
                                      </Flex>
                                    ))}
                                  </Flex>
                                </Box>

                                {/* Features */}
                                <Box mb={5}>
                                  <Heading as="h4" size="xs" color="white" mb={3}>
                                    Key Features
                                  </Heading>
                                  <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
                                    {item.features.map((feature, idx) => (
                                      <Flex key={idx} align="flex-start" gap={2}>
                                        <Box 
                                          as={Star} 
                                          w={3} 
                                          h={3} 
                                          color="yellow.400" 
                                          flexShrink={0} 
                                          mt={1}
                                        />
                                        <Text color="whiteAlpha.600" fontSize="sm">{feature}</Text>
                                      </Flex>
                                    ))}
                                  </Grid>
                                </Box>

                                {/* Use Cases */}
                                <Box mb={5}>
                                  <Heading as="h4" size="xs" color="white" mb={3}>
                                    Best For
                                  </Heading>
                                  <Flex gap={2} flexWrap="wrap">
                                    {item.useCases.map((useCase, idx) => (
                                      <Badge
                                        key={idx}
                                        px={3}
                                        py={1.5}
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
                                    <Heading as="h4" size="xs" color="white" mb={3}>
                                      Related Protocols
                                    </Heading>
                                    <Flex gap={2} flexWrap="wrap">
                                      {item.relatedProtocols.map((protocolId) => (
                                        <Badge
                                          key={protocolId}
                                          px={3}
                                          py={1.5}
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
                                    minH="48px"
                                    borderRadius="xl"
                                    boxShadow="0 4px 20px rgba(239, 194, 179, 0.3)"
                                    _hover={{ 
                                      bgGradient: 'linear(to-r, accent.600, accent.700)',
                                      boxShadow: '0 6px 24px rgba(239, 194, 179, 0.4)',
                                      transform: 'translateY(-1px)'
                                    }}
                                    _focus={{ ring: 2, ringColor: 'accent.400' }}
                                    _active={{ transform: 'translateY(0)' }}
                                    transition="all 0.2s"
                                    gap={2}
                                  >
                                    <Box as={ExternalLink} w={4} h={4} />
                                    View Product
                                  </Button>
                                </a>
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Box>
                    </motion.div>
                  );
                })}
              </Grid>
            </Flex>
          </motion.div>
        ) : (
          <motion.div
            key="bundles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Bundles View */}
            <Grid templateColumns={{ base: '1fr' }} gap={{ base: 5, sm: 6 }}>
              {equipmentBundles.map((bundle, index) => {
                const tierColor = getTierColor(bundle.tier);
                const bundleImage = bundleImages[bundle.tier] || bundleImages['starter'];
                
                return (
                  <motion.div
                    key={bundle.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.1 }}
                  >
                    <Box
                      bg="primary.600/50"
                      borderWidth="2px"
                      borderColor={`${tierColor}.500/50`}
                      borderRadius="2xl"
                      overflow="hidden"
                      position="relative"
                    >
                      {/* Bundle Header with Image */}
                      <Box position="relative" h={{ base: '160px', sm: '180px', md: '200px' }}>
                        <Image
                          src={bundleImage}
                          alt={bundle.name}
                          fill
                          sizes="100vw"
                          style={{ objectFit: 'cover' }}
                        />
                        <Box
                          position="absolute"
                          inset={0}
                          bgGradient={`linear(to-b, transparent 10%, rgba(7, 18, 16, 0.95) 90%)`}
                        />
                        
                        {/* Bundle Title Overlay */}
                        <Flex
                          position="absolute"
                          bottom={0}
                          left={0}
                          right={0}
                          p={{ base: 4, sm: 5, md: 6 }}
                          direction="column"
                        >
                          <Flex align="center" gap={3} mb={2}>
                            <Flex
                              w={{ base: 12, sm: 14 }}
                              h={{ base: 12, sm: 14 }}
                              bg="accent.500/20"
                              backdropFilter="blur(8px)"
                              borderRadius="xl"
                              align="center"
                              justify="center"
                            >
                              <Box as={Package} w={{ base: 6, sm: 7 }} h={{ base: 6, sm: 7 }} color="accent.400" />
                            </Flex>
                            <Box>
                              <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
                                {bundle.name}
                              </Heading>
                              <Flex gap={2} mt={1}>
                                <Badge
                                  px={2}
                                  py={0.5}
                                  bg={`${tierColor}.500`}
                                  color="white"
                                  borderRadius="md"
                                  fontSize="10px"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                >
                                  {bundle.tier}
                                </Badge>
                                <Badge
                                  px={2}
                                  py={0.5}
                                  bg="green.500"
                                  color="white"
                                  borderRadius="md"
                                  fontSize="xs"
                                  fontWeight="semibold"
                                >
                                  {bundle.totalBudget}
                                </Badge>
                              </Flex>
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>

                      {/* Bundle Content */}
                      <Box p={{ base: 4, sm: 5, md: 6 }}>
                        <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'md' }} mb={2}>
                          {bundle.description}
                        </Text>

                        <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" mb={4}>
                          {getTierDescription(bundle.tier)}
                        </Text>

                        {/* Equipment List */}
                        <Box>
                          <Text color="whiteAlpha.500" fontSize="xs" fontWeight="bold" letterSpacing="wide" mb={3}>
                            INCLUDED ITEMS ({bundle.equipment.length})
                          </Text>
                          <Grid 
                            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
                            gap={2}
                          >
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
                                  py={2.5}
                                  minH="44px"
                                  transition="all 0.2s"
                                  _hover={{ bg: 'primary.700' }}
                                >
                                  <Box as={IconComponent} w={4} h={4} color="accent.400" flexShrink={0} />
                                  <Text color="white" fontSize="sm" fontWeight="medium" lineClamp={1}>
                                    {item.name}
                                  </Text>
                                </Flex>
                              );
                            })}
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                );
              })}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation CTA */}
      <Box
        bg="accent.500/10"
        borderWidth="1px"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, md: 8 }}
        textAlign="center"
        mt={{ base: 2, sm: 4 }}
      >
        <Flex
          w={{ base: 12, sm: 14 }}
          h={{ base: 12, sm: 14 }}
          bg="accent.500/20"
          borderRadius="xl"
          align="center"
          justify="center"
          mx="auto"
          mb={4}
        >
          <Box as={Stethoscope} w={{ base: 6, sm: 7 }} h={{ base: 6, sm: 7 }} color="accent.400" />
        </Flex>
        
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
          Need Personalized Recommendations?
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={5}
          maxW="xl"
          mx="auto"
        >
          Our experts can help you choose the right equipment based on your goals, space, and budget
        </Text>
        <Button
          px={{ base: 6, sm: 8 }}
          py={3}
          minH="48px"
          bg="accent.500/20"
          borderWidth="1px"
          borderColor="accent.500"
          color="accent.300"
          borderRadius="full"
          fontWeight="semibold"
          _hover={{ bg: 'accent.500/30', transform: 'translateY(-1px)' }}
          _focus={{ ring: 2, ringColor: 'accent.400' }}
          _active={{ transform: 'translateY(0)' }}
          transition="all 0.2s"
        >
          Get Expert Advice
        </Button>
      </Box>
    </Flex>
  );
}
