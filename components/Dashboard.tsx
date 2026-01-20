'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useStore } from '@/lib/store';
import ProtocolTimer from './ProtocolTimer';
import FocusTrap from './FocusTrap';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Input,
  Textarea
} from '@chakra-ui/react';
import { Zap, Moon, Heart, Flame, Check, Clock, FileText, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { completedTasks, toggleTask, user } = useStore();
  const [activeTimer, setActiveTimer] = useState<{ id: string; name: string; duration: number } | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const todayProtocols = [
    { id: 'morning-light', title: 'Morning Light Exposure', time: '6:30 AM', duration: 15, durationStr: '15 min', category: 'circadian' },
    { id: 'cold-shower', title: 'Cold Shower', time: '7:00 AM', duration: 3, durationStr: '3 min', category: 'contrast' },
    { id: 'breathwork', title: 'Breathwork Session', time: '7:15 AM', duration: 10, durationStr: '10 min', category: 'restoration' },
    { id: 'morning-supps', title: 'Morning Supplements', time: '8:00 AM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'movement', title: 'Movement Practice', time: '5:00 PM', duration: 30, durationStr: '30 min', category: 'movement' },
    { id: 'evening-supps', title: 'Evening Supplements', time: '7:00 PM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'wind-down', title: 'Evening Wind-Down', time: '9:00 PM', duration: 20, durationStr: '20 min', category: 'restoration' },
  ];

  const startTimer = (protocol: typeof todayProtocols[0]) => {
    setActiveTimer({
      id: protocol.id,
      name: protocol.title,
      duration: protocol.duration * 60 // convert to seconds
    });
  };

  const completionRate = Math.round((completedTasks.length / todayProtocols.length) * 100);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  const handleQuickAction = (index: number) => {
    switch (index) {
      case 0: // Start Timer - find first incomplete protocol
        const nextProtocol = todayProtocols.find(p => !completedTasks.includes(p.id));
        if (nextProtocol) startTimer(nextProtocol);
        break;
      case 1: // Resources - Coming Soon
      case 2: // Community - Coming Soon
        alert('Coming Soon!');
        break;
      case 3: // Consultation
        setShowConsultationModal(true);
        break;
    }
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

      {/* Consultation Booking Modal */}
      {showConsultationModal && (
        <ConsultationModal onClose={() => setShowConsultationModal(false)} />
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Welcome Section */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.4 }}
        >
          <Box
            bgGradient="linear(to-br, accent.500/10, accent.600/10)"
          borderWidth="1px"
          borderColor="accent.500/20"
          borderRadius="2xl"
          p={{ base: 5, sm: 6, lg: 8 }}
        >
          <Heading as="h2" size={{ base: "lg", sm: "xl", lg: "2xl" }} color="white" mb={1}>
            Good {getTimeOfDay()}, {user?.name || 'Friend'}
          </Heading>
          <Text color="whiteAlpha.700" fontSize={{ base: "sm", sm: "base" }} mb={{ base: 4, sm: 5 }}>
            Your longevity journey continues
          </Text>

          {/* Progress Ring */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Flex
              align="center"
            gap={{ base: 4, sm: 6 }}
          >
            <Box position="relative" w={{ base: 20, sm: 24 }} h={{ base: 20, sm: 24 }}>
              <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  color="rgba(255, 255, 255, 0.1)"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${completionRate * 2.14} 214`}
                  color="var(--chakra-colors-accent-400)"
                  style={{ transition: 'all 0.5s' }}
                />
              </svg>
              <Flex position="absolute" inset={0} align="center" justify="center">
                <Text fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold" color="white">
                  {completionRate}%
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text color="white" fontWeight="semibold" fontSize={{ base: "base", sm: "lg" }}>
                Daily Progress
              </Text>
              <Text color="whiteAlpha.600" fontSize={{ base: "sm", sm: "base" }}>
                {completedTasks.length} of {todayProtocols.length} completed
              </Text>
            </Box>
          </Flex>
          </motion.div>
        </Box>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.3, duration: 0.4 }}
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 3, sm: 4 }}
        >
          {[
            { icon: Zap, label: 'Energy', value: '8.2', unit: '/10', detail: '+15% from last week' },
            { icon: Moon, label: 'Sleep', value: '7.5', unit: 'hrs', detail: '89% quality score' },
            { icon: Heart, label: 'HRV', value: '68', unit: 'ms', detail: '+26% improvement' },
            { icon: Flame, label: 'Streak', value: '12', unit: ' days', detail: 'Longest: 18 days' }
          ].map((stat, idx) => (
            <Box
              key={idx}
              bg="primary.600/50"
              borderWidth="1px"
              borderColor="primary.400"
              borderRadius="xl"
              p={{ base: 3.5, sm: 4 }}
              _hover={{ bg: "primary.600/60" }}
              transition="all 0.2s"
            >
              <Flex align="center" gap={2} mb={2}>
                <Flex
                  w={{ base: 7, sm: 8 }}
                  h={{ base: 7, sm: 8 }}
                  bg="accent.500/20"
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Box as={stat.icon} w={{ base: 4, sm: 5 }} h={{ base: 4, sm: 5 }} color="accent.400" />
                </Flex>
                <Text color="whiteAlpha.600" fontSize={{ base: "xs", sm: "sm" }}>
                  {stat.label}
                </Text>
              </Flex>
              <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold" color="white">
                {stat.value}
                <Text as="span" fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.400">
                  {stat.unit}
                </Text>
              </Text>
              <Text fontSize={{ base: "10px", sm: "xs" }} color="accent.400" mt={1}>
                {stat.detail}
              </Text>
            </Box>
          ))}
        </Grid>
        </motion.div>

        {/* Today's Protocols */}
        <Box>
          <Flex align="center" justify="space-between" mb={4}>
            <Heading as="h3" size={{ base: "sm", sm: "md", lg: "lg" }} color="white">
              Today&apos;s Protocol
            </Heading>
            <Text fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.600">
              {completedTasks.length}/{todayProtocols.length} done
            </Text>
          </Flex>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={{ base: 3, sm: 4 }}>
            {todayProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.05, duration: 0.3 }}
              >
                <Box
                  p={{ base: 3.5, sm: 4 }}
                  borderRadius="xl"
                  borderWidth="1px"
                  bg={completedTasks.includes(protocol.id) ? "accent.500/10" : "primary.600/50"}
                  borderColor={completedTasks.includes(protocol.id) ? "accent.500/20" : "primary.400"}
                  _hover={{ shadow: "lg" }}
                  transition="all 0.2s"
                >
                <Flex align="center" gap={{ base: 2.5, sm: 3 }}>
                  <Button
                    onClick={() => toggleTask(protocol.id)}
                    aria-label={`Mark ${protocol.title} as ${completedTasks.includes(protocol.id) ? 'incomplete' : 'complete'}`}
                    minW="44px"
                    minH="44px"
                    w={{ base: 11, sm: 12 }}
                    h={{ base: 11, sm: 12 }}
                    borderRadius="full"
                    borderWidth="2px"
                    flexShrink={0}
                    bg={completedTasks.includes(protocol.id) ? "accent.500" : "transparent"}
                    borderColor={completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.300"}
                    _hover={{ borderColor: completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.500" }}
                    _active={{ borderColor: completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.700" }}
                    _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
                  >
                    {completedTasks.includes(protocol.id) && (
                      <Box as={Check} w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }} color="white" />
                    )}
                  </Button>

                  <Box flex={1} minW={0}>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "sm", sm: "base" }}
                      lineHeight="tight"
                      mb={1}
                      color={completedTasks.includes(protocol.id) ? "whiteAlpha.600" : "white"}
                      textDecoration={completedTasks.includes(protocol.id) ? "line-through" : "none"}
                    >
                      {protocol.title}
                    </Text>
                    <Flex align="center" gap={2} flexWrap="wrap">
                      <Text fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.400">
                        {protocol.time} • {protocol.durationStr}
                      </Text>
                      <Badge
                        px={1.5}
                        py={0.5}
                        borderRadius="sm"
                        fontSize={{ base: "10px", sm: "xs" }}
                        bg={getCategoryColorBg(protocol.category)}
                        color={getCategoryColorText()}
                      >
                        {protocol.category}
                      </Badge>
                    </Flex>
                  </Box>

                  <Button
                    onClick={() => startTimer(protocol)}
                    aria-label={`Start timer for ${protocol.title}`}
                    minW="44px"
                    minH="44px"
                    w={{ base: 11, sm: 12 }}
                    h={{ base: 11, sm: 12 }}
                    bg="accent.500/20"
                    borderWidth="1px"
                    borderColor="accent.500/20"
                    borderRadius="xl"
                    color="accent.400"
                    flexShrink={0}
                    _hover={{ bg: "accent.500/30" }}
                    _active={{ bg: "accent.500/40" }}
                    _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
                  >
                    <Box as={Clock} w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }} />
                  </Button>
                </Flex>
              </Box>
              </motion.div>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : { delay: 0.6, duration: 0.4 }}
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 3, sm: 4 }}
        >
          {[
            { label: 'Start Timer', desc: 'Breathwork session', gradient: true },
            { label: 'Resources', desc: 'Coming Soon', gradient: false },
            { label: 'Community', desc: 'Coming Soon', gradient: false },
            { label: 'Consultation', desc: 'Book a specialist', gradient: false }
          ].map((action, idx) => (
            <Button
              key={idx}
              onClick={() => handleQuickAction(idx)}
              aria-label={action.label}
              bgGradient={action.gradient ? "linear(to-br, accent.500, accent.600)" : undefined}
              bg={action.gradient ? undefined : "primary.600/50"}
              borderWidth={action.gradient ? 0 : "1px"}
              borderColor="primary.400"
              borderRadius="xl"
              p={{ base: 4, sm: 5 }}
              textAlign="left"
              minH={{ base: "100px", sm: "120px" }}
              flexDir="column"
              alignItems="flex-start"
              boxShadow={action.gradient ? "lg" : "none"}
              _hover={{
                bgGradient: action.gradient ? "linear(to-br, accent.600, accent.700)" : undefined,
                bg: action.gradient ? undefined : "primary.600/60",
                borderColor: action.gradient ? undefined : "primary.400"
              }}
              _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
            >
              <Flex
                w={{ base: 9, sm: 10 }}
                h={{ base: 9, sm: 10 }}
                bg={action.gradient ? "whiteAlpha.200" : "whiteAlpha.50"}
                borderRadius="lg"
                align="center"
                justify="center"
                mb={{ base: 2, sm: 3 }}
              >
                <Box
                  as={idx === 0 ? Clock : idx === 1 ? FileText : idx === 2 ? Users : Calendar}
                  w={{ base: 5, sm: 6 }}
                  h={{ base: 5, sm: 6 }}
                  color={action.gradient ? "white" : "whiteAlpha.700"}
                />
              </Flex>
              <Text color="white" fontWeight="semibold" fontSize={{ base: "sm", sm: "base" }}>
                {action.label}
              </Text>
              <Text color={action.gradient ? "whiteAlpha.700" : "whiteAlpha.700"} fontSize={{ base: "xs", sm: "sm" }} mt={0.5}>
                {action.desc}
              </Text>
            </Button>
          ))}
        </Grid>
        </motion.div>
      </Flex>
    </>
  );
}

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  preferredDate: string;
  message: string;
}

function ConsultationModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<ConsultationFormData>();
  const [submitted, setSubmitted] = useState(false);

  const consultationTypes = [
    'Longevity Assessment',
    'Supplement Protocol',
    'Lifestyle Optimization',
    'Biohacking Consultation',
    'Follow-up Consultation'
  ];

  const onSubmit = (data: ConsultationFormData) => {
    // Here you would typically send to an API
    console.log('Consultation booking:', data);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <FocusTrap
      active={true}
      focusTrapOptions={{
        onDeactivate: onClose,
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
      }}
    >
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        <Box
          maxW="2xl"
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
          {!submitted ? (
            <>
              {/* Header */}
              <Box
                bgGradient="linear(to-br, accent.500/10, accent.600/10)"
                borderBottomWidth="1px"
                borderColor="accent.500/20"
                p={{ base: 5, sm: 6 }}
              >
                <Heading as="h3" id="consultation-modal-title" size={{ base: "lg", sm: "xl" }} color="white" mb={2}>
                  Book a Consultation
                </Heading>
                <Text color="whiteAlpha.700" fontSize={{ base: "sm", sm: "base" }}>
                  Schedule a personalized session with our longevity specialists
                </Text>
              </Box>

              {/* Form */}
              <Box as="form" onSubmit={handleSubmit(onSubmit)} p={{ base: 5, sm: 6 }}>
                <Flex direction="column" gap={4}>
                  {/* Name */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Full Name *
                    </Text>
                    <Input
                      {...register('name', { required: 'Name is required' })}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                    {errors.name && (
                      <Text color="red.400" fontSize="xs" mt={1}>
                        {errors.name.message}
                      </Text>
                    )}
                  </Box>

                  {/* Email */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Email *
                    </Text>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                    {errors.email && (
                      <Text color="red.400" fontSize="xs" mt={1}>
                        {errors.email.message}
                      </Text>
                    )}
                  </Box>

                  {/* Phone */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Phone Number
                    </Text>
                    <Input
                      type="tel"
                      {...register('phone')}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                  </Box>

                  {/* Consultation Type */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Consultation Type *
                    </Text>
                    <Box
                      as="select"
                      {...register('consultationType', { required: 'Please select a consultation type' })}
                      w="full"
                      px={4}
                      py={3}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      fontSize="base"
                      _focus={{
                        borderColor: 'accent.500',
                        outline: 'none',
                        boxShadow: '0 0 0 2px rgba(239, 194, 179, 0.5)'
                      }}
                    >
                      <option value="" style={{ background: '#1A365D' }}>Select a type...</option>
                      {consultationTypes.map((type) => (
                        <option key={type} value={type} style={{ background: '#1A365D' }}>
                          {type}
                        </option>
                      ))}
                    </Box>
                    {errors.consultationType && (
                      <Text color="red.400" fontSize="xs" mt={1}>
                        {errors.consultationType.message}
                      </Text>
                    )}
                  </Box>

                  {/* Preferred Date */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Preferred Date *
                    </Text>
                    <Input
                      type="date"
                      {...register('preferredDate', { required: 'Please select a date' })}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                    />
                    {errors.preferredDate && (
                      <Text color="red.400" fontSize="xs" mt={1}>
                        {errors.preferredDate.message}
                      </Text>
                    )}
                  </Box>

                  {/* Message */}
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Additional Information
                    </Text>
                    <Textarea
                      {...register('message')}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      rows={4}
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                  </Box>
                </Flex>

                {/* Action Buttons */}
                <Flex gap={3} mt={6}>
                  <Button
                    type="button"
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
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    flex={1}
                    py={3}
                    bgGradient="linear(to-br, accent.500, accent.600)"
                    color="white"
                    borderRadius="xl"
                    fontWeight="semibold"
                    boxShadow="lg"
                    _hover={{
                      bgGradient: 'linear(to-br, accent.600, accent.700)',
                    }}
                  >
                    Book Consultation
                  </Button>
                </Flex>
              </Box>
            </>
          ) : (
            <Box p={{ base: 8, sm: 10 }} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="accent.500"
                borderRadius="full"
                align="center"
                justify="center"
                mx="auto"
                mb={4}
              >
                <Box as={Check} w={8} h={8} color="white" />
              </Flex>
              <Heading as="h3" size="lg" color="white" mb={2}>
                Booking Submitted!
              </Heading>
              <Text color="whiteAlpha.700" fontSize="base" aria-live="polite">
                We&apos;ll contact you shortly to confirm your consultation
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  </FocusTrap>
  );
}

function getCategoryColorBg(category: string) {
  const colors: Record<string, string> = {
    circadian: 'accent.500/30',
    contrast: 'accent.400/30',
    restoration: 'primary.400/30',
    supplements: 'accent.500/30',
    movement: 'accent.600/30',
  };
  return colors[category] || 'whiteAlpha.200';
}

function getCategoryColorText() {
  return 'accent.200';
}
