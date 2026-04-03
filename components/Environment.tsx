'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Link,
} from '@chakra-ui/react';
import { Check, TrendingUp, AlertTriangle, X, ExternalLink, Lightbulb, Bed, UtensilsCrossed, Bath, Laptop } from 'lucide-react';

interface Optimization {
  id: string;
  title: string;
  current: string;
  optimal: string;
  status: 'optimized' | 'good' | 'needs-improvement';
  priority: 'high' | 'medium' | 'low';
  description: string;
  action: string;
  detailedSteps?: string[];
  products?: Array<{ name: string; price: string; link: string }>;
}

export default function Environment() {
  const router = useRouter();
  const [activeRoom, setActiveRoom] = useState('bedroom');
  const [completedOptimizations, setCompletedOptimizations] = useState<string[]>([]);
  const [showDetailModal, setShowDetailModal] = useState<Optimization | null>(null);

  const rooms = {
    bedroom: {
      name: 'Bedroom Optimization',
      icon: Bed,
      optimizations: [
        {
          id: 'bedroom-temp',
          title: 'Temperature Control',
          current: '72°F',
          optimal: '65-68°F',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Lower temperature improves deep sleep and melatonin production',
          action: 'Adjust thermostat 1 hour before bedtime',
          detailedSteps: [
            'Set thermostat to 65-68°F starting 1 hour before bed',
            'Use breathable bedding (cotton or linen)',
            'Consider a cooling mattress pad if needed',
            'Keep bedroom door slightly open for air circulation'
          ],
          products: [
            { name: 'Smart Thermostat', price: '$120-250', link: 'https://amazon.com' },
            { name: 'Cooling Mattress Pad', price: '$80-200', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'bedroom-light',
          title: 'Light Exposure',
          current: 'Blue light present',
          optimal: 'Amber/red only',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Blue light suppresses melatonin and disrupts circadian rhythm',
          action: 'Install amber bulbs or use blue light blocking',
          detailedSteps: [
            'Replace bedroom bulbs with amber/red LED bulbs',
            'Install blackout curtains or blinds',
            'Use blue light blocking glasses 2-3 hours before bed',
            'Enable night mode on all devices'
          ],
          products: [
            { name: 'Amber LED Bulbs', price: '$15-30', link: 'https://amazon.com' },
            { name: 'Blackout Curtains', price: '$40-100', link: 'https://amazon.com' },
            { name: 'Blue Light Glasses', price: '$20-50', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'bedroom-air',
          title: 'Air Quality',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good' as const,
          priority: 'medium' as const,
          description: 'Clean air supports respiratory health and recovery',
          action: 'Consider air purifier with HEPA filter',
          detailedSteps: [
            'Install HEPA air purifier (200+ CADR rating)',
            'Change filters every 3-6 months',
            'Open windows for fresh air daily (weather permitting)',
            'Remove dust weekly with damp cloth'
          ],
          products: [
            { name: 'HEPA Air Purifier', price: '$150-400', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'bedroom-emf',
          title: 'EMF Exposure',
          current: 'Devices nearby',
          optimal: 'Airplane mode',
          status: 'needs-improvement' as const,
          priority: 'medium' as const,
          description: 'Electromagnetic fields may impact sleep quality',
          action: 'Keep devices 3ft away, use airplane mode',
          detailedSteps: [
            'Place phone on airplane mode or power off',
            'Keep devices at least 3 feet from bed',
            'Unplug WiFi router at night (optional)',
            'Use battery-powered alarm clock instead of phone'
          ],
          products: [
            { name: 'Battery Alarm Clock', price: '$15-40', link: 'https://amazon.com' }
          ]
        },
      ]
    },
    kitchen: {
      name: 'Kitchen Optimization',
      icon: UtensilsCrossed,
      optimizations: [
        {
          id: 'kitchen-water',
          title: 'Water Quality',
          current: 'Tap water',
          optimal: 'Filtered + mineralized',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Mineralized water supports cellular function and hydration',
          action: 'Install reverse osmosis + remineralization system',
          detailedSteps: [
            'Install reverse osmosis system under sink',
            'Add remineralization filter to add back essential minerals',
            'Test water quality quarterly',
            'Replace filters on schedule (typically 6-12 months)'
          ],
          products: [
            { name: 'RO System + Remineralization', price: '$200-500', link: 'https://amazon.com' },
            { name: 'Water Quality Test Kit', price: '$20-40', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'kitchen-cookware',
          title: 'Cookware',
          current: 'Non-stick',
          optimal: 'Cast iron, stainless',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Avoid PFAS and harmful chemicals in food preparation',
          action: 'Replace with cast iron or stainless steel',
          detailedSteps: [
            'Replace non-stick pans with cast iron or stainless steel',
            'Season cast iron properly before use',
            'Use stainless steel for acidic foods (tomatoes, citrus)',
            'Avoid cooking sprays; use butter or oil instead'
          ],
          products: [
            { name: 'Cast Iron Skillet Set', price: '$40-100', link: 'https://amazon.com' },
            { name: 'Stainless Steel Cookware Set', price: '$150-400', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'kitchen-storage',
          title: 'Food Storage',
          current: 'Plastic containers',
          optimal: 'Glass containers',
          status: 'needs-improvement' as const,
          priority: 'medium' as const,
          description: 'Avoid BPA and microplastics leaching into food',
          action: 'Switch to glass storage containers',
          detailedSteps: [
            'Replace plastic containers with glass (borosilicate)',
            'Use glass jars for pantry storage',
            'Store leftovers in glass containers',
            'Avoid heating any plastic containers'
          ],
          products: [
            { name: 'Glass Container Set', price: '$30-80', link: 'https://amazon.com' }
          ]
        },
      ]
    },
    bathroom: {
      name: 'Bathroom Optimization',
      icon: Bath,
      optimizations: [
        {
          id: 'bathroom-shower',
          title: 'Shower Filter',
          current: 'Installed',
          optimal: 'Installed',
          status: 'optimized' as const,
          priority: 'high' as const,
          description: 'Removes chlorine and heavy metals from water',
          action: 'Replace filter every 6 months',
          detailedSteps: [
            'Maintain current shower filter installation',
            'Mark calendar to replace filter every 6 months',
            'Choose filter that removes chlorine, heavy metals, and VOCs',
            'Check water pressure after installation'
          ],
          products: [
            { name: 'Replacement Shower Filter', price: '$30-60', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'bathroom-products',
          title: 'Personal Care Products',
          current: 'Some toxic ingredients',
          optimal: 'All non-toxic',
          status: 'needs-improvement' as const,
          priority: 'medium' as const,
          description: 'Avoid parabens, sulfates, and endocrine disruptors',
          action: 'Switch to clean beauty brands',
          detailedSteps: [
            'Check products on EWG Skin Deep database',
            'Replace items with rating >3 first',
            'Look for paraben-free, sulfate-free labels',
            'Choose products with natural preservatives'
          ],
          products: [
            { name: 'Natural Shampoo/Conditioner', price: '$15-30', link: 'https://amazon.com' },
            { name: 'Natural Body Wash', price: '$10-20', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'bathroom-ventilation',
          title: 'Ventilation',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good' as const,
          priority: 'low' as const,
          description: 'Proper ventilation reduces mold and moisture',
          action: 'Run exhaust fan during and after showers',
          detailedSteps: [
            'Run fan during shower and 15 minutes after',
            'Clean fan filter monthly',
            'Leave door cracked open after shower',
            'Use squeegee on shower walls to remove excess water'
          ],
          products: [
            { name: 'Shower Squeegee', price: '$10-20', link: 'https://amazon.com' }
          ]
        },
      ]
    },
    workspace: {
      name: 'Workspace Optimization',
      icon: Laptop,
      optimizations: [
        {
          id: 'workspace-ergonomics',
          title: 'Ergonomics',
          current: 'Needs adjustment',
          optimal: 'Ergonomic setup',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Proper posture prevents pain and supports longevity',
          action: 'Adjust monitor height, use standing desk',
          detailedSteps: [
            'Position monitor at arm\'s length, top at eye level',
            'Keep elbows at 90-degree angle',
            'Feet flat on floor or footrest',
            'Consider standing desk for alternating positions'
          ],
          products: [
            { name: 'Monitor Arm', price: '$100-200', link: 'https://amazon.com' },
            { name: 'Standing Desk Converter', price: '$150-400', link: 'https://amazon.com' },
            { name: 'Ergonomic Chair', price: '$300-800', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'workspace-light',
          title: 'Natural Light',
          current: 'Limited',
          optimal: 'Abundant',
          status: 'needs-improvement' as const,
          priority: 'high' as const,
          description: 'Natural light improves focus and circadian rhythm',
          action: 'Position desk near window',
          detailedSteps: [
            'Move desk within 3 feet of window',
            'Face desk perpendicular to window to avoid glare',
            'Use light therapy lamp in winter months',
            'Take breaks outside for natural light exposure'
          ],
          products: [
            { name: 'Light Therapy Lamp', price: '$40-100', link: 'https://amazon.com' }
          ]
        },
        {
          id: 'workspace-blue-light',
          title: 'Blue Light',
          current: 'Unfiltered',
          optimal: 'Filtered',
          status: 'needs-improvement' as const,
          priority: 'medium' as const,
          description: 'Excess blue light strains eyes and disrupts sleep',
          action: 'Use blue light glasses or screen filters',
          detailedSteps: [
            'Install blue light filter software (f.lux, Night Shift)',
            'Wear blue light blocking glasses',
            'Reduce screen brightness',
            'Follow 20-20-20 rule: every 20 min, look 20 feet away for 20 sec'
          ],
          products: [
            { name: 'Blue Light Glasses', price: '$20-50', link: 'https://amazon.com' },
            { name: 'Screen Filter', price: '$30-60', link: 'https://amazon.com' }
          ]
        },
      ]
    },
  };

  const currentRoom = rooms[activeRoom as keyof typeof rooms];
  const roomOptimizations = currentRoom.optimizations;
  const completedCount = roomOptimizations.filter(opt => completedOptimizations.includes(opt.id)).length;
  const score = Math.round((completedCount / roomOptimizations.length) * 100);

  const toggleOptimization = (id: string) => {
    setCompletedOptimizations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleViewEquipment = () => {
    router.push('/equipment');
  };

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Detail Modal */}
      {showDetailModal && (
        <OptimizationDetailModal
          optimization={showDetailModal}
          isCompleted={completedOptimizations.includes(showDetailModal.id)}
          onClose={() => setShowDetailModal(null)}
          onToggleComplete={() => {
            toggleOptimization(showDetailModal.id);
            setShowDetailModal(null);
          }}
        />
      )}

      {/* Room Selector */}
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={{ base: 3, sm: 4 }}>
        {Object.entries(rooms).map(([key, room], index) => {
          const roomOpts = room.optimizations;
          const roomCompleted = roomOpts.filter(opt => completedOptimizations.includes(opt.id)).length;
          const roomScore = Math.round((roomCompleted / roomOpts.length) * 100);

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Button
                onClick={() => setActiveRoom(key)}
                aria-label={`Select ${room.name}`}
                aria-current={activeRoom === key ? 'true' : undefined}
                p={{ base: 4, sm: 5 }}
                borderRadius="xl"
                borderWidth="1px"
                transition="all 0.3s"
                bg={activeRoom === key ? 'accent.500/20' : 'primary.600/50'}
                borderColor={activeRoom === key ? 'accent.500' : 'primary.400'}
                boxShadow={activeRoom === key ? 'lg' : 'none'}
                h="auto"
                flexDir="column"
                _hover={{
                  bg: activeRoom === key ? 'accent.500/30' : 'primary.600/60',
                  borderColor: activeRoom === key ? 'accent.500' : 'primary.400',
                }}
                _focus={{
                  ring: 2,
                  ringColor: 'accent.400',
                  ringOffset: 2,
                  ringOffsetColor: 'primary.900',
                }}
              >
                <Flex
                  align="center"
                  justify="center"
                  w={{ base: 12, sm: 14 }}
                  h={{ base: 12, sm: 14 }}
                  borderRadius="lg"
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  mb={{ base: 2, sm: 3 }}
                >
                  <Box as={room.icon} w={{ base: 6, sm: 7 }} h={{ base: 6, sm: 7 }} color="accent.400" />
                </Flex>
                <Text
                  fontWeight="semibold"
                  fontSize={{ base: 'sm', sm: 'base' }}
                  mb={2}
                  color={activeRoom === key ? 'accent.300' : 'white'}
                >
                  {room.name}
                </Text>
                <Flex align="center" gap={2} w="full">
                  <Box flex={1} h={{ base: 1.5, sm: 2 }} bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                    <Box
                      h="full"
                      bgGradient="linear(to-r, accent.400, accent.500)"
                      transition="all 0.5s"
                      w={`${roomScore}%`}
                      role="progressbar"
                      aria-valuenow={roomScore}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${room.name} optimization score`}
                    />
                  </Box>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color="whiteAlpha.600" fontWeight="semibold">
                    {roomScore}%
                  </Text>
                </Flex>
              </Button>
            </motion.div>
          );
        })}
      </Grid>

      {/* Room Details */}
      <motion.div
        key={activeRoom}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'flex-start', sm: 'center' }}
            justify={{ base: 'flex-start', sm: 'space-between' }}
            gap={3}
            mb={{ base: 5, sm: 6 }}
          >
            <Heading as="h3" size={{ base: 'lg', sm: 'xl' }} color="white">
              {currentRoom.name}
            </Heading>
            <Flex align="center" gap={2}>
              <Box
                w={{ base: 3, sm: 3.5 }}
                h={{ base: 3, sm: 3.5 }}
                borderRadius="full"
                bg={getScoreColor(score)}
                aria-hidden="true"
              />
              <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} fontWeight="medium">
                {completedCount}/{roomOptimizations.length} Complete • {score}%
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap={{ base: 3, sm: 4 }}>
            {roomOptimizations.map((opt, index) => {
              const isCompleted = completedOptimizations.includes(opt.id);
              return (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Box
                    bg={isCompleted ? 'accent.500/10' : 'primary.700/50'}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={isCompleted ? 'accent.500/20' : 'primary.400'}
                    p={{ base: 4, sm: 5 }}
                    _hover={{ bg: isCompleted ? 'accent.500/15' : 'primary.700/60' }}
                    transition="all 0.3s"
                  >
                    <Flex
                      direction={{ base: 'column', sm: 'row' }}
                      align={{ base: 'stretch', sm: 'flex-start' }}
                      justify={{ base: 'flex-start', sm: 'space-between' }}
                      gap={4}
                    >
                      <Box flex={1}>
                        <Flex align="center" gap={2} mb={2} flexWrap="wrap">
                          <Heading
                            as="h4"
                            size={{ base: 'sm', sm: 'md' }}
                            color={isCompleted ? 'whiteAlpha.600' : 'white'}
                            textDecoration={isCompleted ? 'line-through' : 'none'}
                          >
                            {opt.title}
                          </Heading>
                          <Badge
                            px={2}
                            py={0.5}
                            borderRadius="md"
                            fontSize={{ base: 'xs', sm: 'sm' }}
                            bg={getPriorityBg(opt.priority)}
                            color={getPriorityColor(opt.priority)}
                          >
                            {opt.priority}
                          </Badge>
                        </Flex>
                        <Flex align="center" gap={2} fontSize={{ base: 'sm', sm: 'base' }} mb={3} flexWrap="wrap">
                          <Text color="whiteAlpha.400">Current:</Text>
                          <Text color="whiteAlpha.700" fontWeight="medium">
                            {opt.current}
                          </Text>
                          <Text color="whiteAlpha.400">→</Text>
                          <Text color="accent.400" fontWeight="semibold">
                            {opt.optimal}
                          </Text>
                        </Flex>
                        <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={4}>
                          {opt.description}
                        </Text>
                        <Flex gap={2} flexWrap="wrap">
                          <Button
                            onClick={() => setShowDetailModal(opt)}
                            size="sm"
                            bg="accent.500/20"
                            borderWidth="1px"
                            borderColor="accent.500"
                            color="accent.300"
                            _hover={{ bg: 'accent.500/30' }}
                          >
                            <Box as={Lightbulb} w={4} h={4} mr={2} />
                            View Details
                          </Button>
                          <Button
                            onClick={() => toggleOptimization(opt.id)}
                            size="sm"
                            bg={isCompleted ? 'accent.500' : 'primary.700/50'}
                            borderWidth="1px"
                            borderColor={isCompleted ? 'accent.500' : 'primary.400'}
                            color={isCompleted ? 'white' : 'whiteAlpha.700'}
                            _hover={{
                              bg: isCompleted ? 'accent.600' : 'primary.700/70'
                            }}
                          >
                            <Box as={Check} w={4} h={4} mr={2} />
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </Flex>
                      </Box>
                      <Flex
                        w={{ base: 12, sm: 14 }}
                        h={{ base: 12, sm: 14 }}
                        borderRadius="full"
                        align="center"
                        justify="center"
                        flexShrink={0}
                        bg={isCompleted ? 'accent.500' : getStatusBg(opt.status)}
                        aria-label={`Status: ${isCompleted ? 'completed' : opt.status}`}
                      >
                        {isCompleted || opt.status === 'optimized' ? (
                          <Box
                            as={Check}
                            w={{ base: 6, sm: 7 }}
                            h={{ base: 6, sm: 7 }}
                            color="white"
                          />
                        ) : opt.status === 'good' ? (
                          <Box
                            as={TrendingUp}
                            w={{ base: 6, sm: 7 }}
                            h={{ base: 6, sm: 7 }}
                            color="accent.400"
                          />
                        ) : (
                          <Box
                            as={AlertTriangle}
                            w={{ base: 6, sm: 7 }}
                            h={{ base: 6, sm: 7 }}
                            color="accent.400"
                          />
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                </motion.div>
              );
            })}
          </Flex>
        </Box>
      </motion.div>

      {/* Equipment Guide */}
      <Box
        bg="accent.500/10"
        borderWidth="1px"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, lg: 8 }}
        textAlign="center"
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
          Equipment Recommendations
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={{ base: 4, sm: 5 }}
          maxW="2xl"
          mx="auto"
        >
          Curated tools for optimal home environment
        </Text>
        <Button
          onClick={handleViewEquipment}
          aria-label="View equipment guide"
          w={{ base: 'full', sm: 'auto' }}
          px={{ base: 6, sm: 8 }}
          py={{ base: 3, sm: 3.5 }}
          bg="accent.500/20"
          borderWidth="1px"
          borderColor="accent.500"
          color="accent.300"
          borderRadius="xl"
          fontWeight="semibold"
          _hover={{
            bg: 'accent.500/30',
          }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          View Equipment Guide
        </Button>
      </Box>
    </Flex>
  );
}

// Optimization Detail Modal
function OptimizationDetailModal({
  optimization,
  isCompleted,
  onClose,
  onToggleComplete
}: {
  optimization: Optimization;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
}) {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={50}
      bg="primary.900/95"
      backdropFilter="blur(10px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      onClick={onClose}
    >
      <Box
        maxW="3xl"
        w="full"
        maxH="90vh"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="2xl"
        >
          {/* Header */}
          <Box
            bgGradient="linear(to-br, accent.500/10, accent.600/10)"
            borderBottomWidth="1px"
            borderColor="accent.500/20"
            p={{ base: 5, sm: 6 }}
          >
            <Flex justify="space-between" align="flex-start" gap={4}>
              <Box flex={1}>
                <Flex align="center" gap={2} mb={2} flexWrap="wrap">
                  <Heading as="h3" size={{ base: "lg", sm: "xl" }} color="white">
                    {optimization.title}
                  </Heading>
                  <Badge
                    px={2}
                    py={0.5}
                    borderRadius="md"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    bg={getPriorityBg(optimization.priority)}
                    color={getPriorityColor(optimization.priority)}
                  >
                    {optimization.priority} priority
                  </Badge>
                </Flex>
                <Flex align="center" gap={2} fontSize={{ base: 'sm', sm: 'base' }} flexWrap="wrap">
                  <Text color="whiteAlpha.500">Current:</Text>
                  <Text color="whiteAlpha.800" fontWeight="medium">
                    {optimization.current}
                  </Text>
                  <Text color="whiteAlpha.500">→</Text>
                  <Text color="accent.400" fontWeight="semibold">
                    {optimization.optimal}
                  </Text>
                </Flex>
              </Box>
              <Button
                onClick={onClose}
                aria-label="Close"
                minW="auto"
                p={2}
                bg="transparent"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                <Box as={X} w={6} h={6} color="whiteAlpha.700" />
              </Button>
            </Flex>
          </Box>

          {/* Content */}
          <Box p={{ base: 5, sm: 6 }}>
            {/* Description */}
            <Box mb={6}>
              <Heading as="h4" size="sm" color="white" mb={2}>
                Why This Matters
              </Heading>
              <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }}>
                {optimization.description}
              </Text>
            </Box>

            {/* Steps */}
            {optimization.detailedSteps && optimization.detailedSteps.length > 0 && (
              <Box mb={6}>
                <Heading as="h4" size="sm" color="white" mb={3}>
                  Step-by-Step Action Plan
                </Heading>
                <Flex direction="column" gap={3}>
                  {optimization.detailedSteps.map((step, idx) => (
                    <Flex key={idx} align="flex-start" gap={3}>
                      <Flex
                        w={6}
                        h={6}
                        bg="accent.500/20"
                        borderRadius="full"
                        align="center"
                        justify="center"
                        flexShrink={0}
                        mt={0.5}
                      >
                        <Text color="accent.400" fontSize="xs" fontWeight="bold">
                          {idx + 1}
                        </Text>
                      </Flex>
                      <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }} flex={1}>
                        {step}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            )}

            {/* Products */}
            {optimization.products && optimization.products.length > 0 && (
              <Box mb={6}>
                <Heading as="h4" size="sm" color="white" mb={3}>
                  Recommended Products
                </Heading>
                <Flex direction="column" gap={3}>
                  {optimization.products.map((product, idx) => (
                    <Flex
                      key={idx}
                      justify="space-between"
                      align="center"
                      p={4}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                    >
                      <Box>
                        <Text color="white" fontWeight="medium" mb={1}>
                          {product.name}
                        </Text>
                        <Text color="accent.400" fontSize="sm" fontWeight="semibold">
                          {product.price}
                        </Text>
                      </Box>
                      <Link
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={4}
                        py={2}
                        fontSize="sm"
                        fontWeight="semibold"
                        bg="accent.500/20"
                        borderWidth="1px"
                        borderColor="accent.500"
                        borderRadius="md"
                        color="accent.300"
                        _hover={{ bg: 'accent.500/30' }}
                        transition="all 0.3s"
                      >
                        <Box as={ExternalLink} w={4} h={4} />
                        View
                      </Link>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            )}

            {/* Action Buttons */}
            <Flex gap={3}>
              <Button
                onClick={onClose}
                flex={1}
                py={3}
                bg="primary.700/50"
                borderWidth="1px"
                borderColor="primary.400"
                color="whiteAlpha.700"
                borderRadius="xl"
                fontWeight="semibold"
                _hover={{
                  color: 'white',
                  borderColor: 'primary.300',
                }}
              >
                Close
              </Button>
              <Button
                onClick={onToggleComplete}
                flex={1}
                py={3}
                variant="plain"
                bg={isCompleted ? 'accent.500/20' : 'accent.500'}
                color={isCompleted ? 'accent.300' : 'primary.900'}
                borderWidth="1px"
                borderColor={isCompleted ? 'accent.500' : 'accent.600'}
                borderRadius="xl"
                fontWeight="semibold"
                boxShadow={isCompleted ? 'none' : '0 4px 18px rgba(7, 18, 16, 0.25)'}
                _hover={{
                  bg: isCompleted ? 'accent.500/30' : 'accent.400',
                }}
                _active={{
                  bg: isCompleted ? 'accent.500/40' : 'accent.600',
                }}
              >
                <Box as={Check} w={5} h={5} mr={2} />
                {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function getScoreColor(score: number) {
  if (score >= 80) return 'accent.400';
  if (score >= 60) return 'accent.500';
  return 'accent.600';
}

function getStatusBg(status: string) {
  if (status === 'optimized') return 'accent.500';
  if (status === 'good') return 'accent.400';
  return 'accent.600';
}

function getPriorityBg(priority: string) {
  if (priority === 'high') return 'accent.600';
  if (priority === 'medium') return 'accent.500';
  return 'primary.400';
}

function getPriorityColor(priority: string) {
  if (priority === 'high') return 'accent.300';
  if (priority === 'medium') return 'accent.300';
  return 'accent.400';
}
