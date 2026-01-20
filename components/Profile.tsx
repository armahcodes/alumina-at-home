'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useStore } from '@/lib/store';
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
  Textarea,
} from '@chakra-ui/react';
import { Check, Zap, CheckCircle, Bell, User, Lock, FileText, HelpCircle, ChevronRight, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: string;
  current: string;
  icon: LucideIcon;
}

export default function Profile() {
  const { user, logout, updateUser, currentStreak, longestStreak } = useStore();
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const goals = [
    {
      id: 'energy',
      title: 'Increase Energy Levels',
      target: '8.5/10',
      current: '8.2/10',
      icon: Check
    },
    {
      id: 'sleep',
      title: 'Optimize Sleep Quality',
      target: '92%',
      current: '89%',
      icon: Zap
    },
    {
      id: 'bio-age',
      title: 'Reduce Biological Age',
      target: '10 years',
      current: '7 years',
      icon: CheckCircle
    },
  ];

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      logout();
    }
  };

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Modals */}
      {showPersonalInfoModal && (
        <PersonalInfoModal
          user={user}
          onClose={() => setShowPersonalInfoModal(false)}
          onUpdate={updateUser}
        />
      )}
      {showGoalsModal && (
        <GoalsModal
          goals={goals}
          onClose={() => setShowGoalsModal(false)}
        />
      )}
      {showNotificationsModal && (
        <NotificationsModal onClose={() => setShowNotificationsModal(false)} />
      )}
      {showSupportModal && (
        <SupportModal onClose={() => setShowSupportModal(false)} />
      )}
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}

      {/* User Info Card */}
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
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'center', sm: 'flex-start' }}
            gap={{ base: 4, sm: 5 }}
          >
            <Flex
              w={{ base: 20, sm: 24 }}
              h={{ base: 20, sm: 24 }}
              bgGradient="linear(to-br, accent.400, accent.600)"
              borderRadius="full"
              align="center"
              justify="center"
              fontSize={{ base: '2xl', sm: '3xl' }}
              fontWeight="bold"
              color="white"
              boxShadow="lg"
            >
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </Flex>
            <Box flex={1} textAlign={{ base: 'center', sm: 'left' }}>
              <Heading as="h3" size={{ base: 'lg', sm: 'xl' }} color="white" mb={{ base: 1, sm: 2 }}>
                {user?.name || 'User'}
              </Heading>
              <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={{ base: 3, sm: 4 }}>
                {user?.email || 'user@alumina.com'}
              </Text>
              <Flex gap={2} justify={{ base: 'center', sm: 'flex-start' }} flexWrap="wrap">
                <Badge
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 1, sm: 1.5 }}
                  bg="accent.500/20"
                  borderWidth="1px"
                  borderColor="accent.500"
                  borderRadius="full"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color="accent.300"
                  fontWeight="medium"
                >
                  Premium Member
                </Badge>
                <Badge
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 1, sm: 1.5 }}
                  bg="accent.500/20"
                  borderWidth="1px"
                  borderColor="accent.500"
                  borderRadius="full"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color="accent.300"
                  fontWeight="medium"
                >
                  Day {currentStreak}
                </Badge>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </motion.div>

      {/* Goals */}
      <Box
        bg="primary.600/50"
        borderWidth="1px"
        borderColor="primary.400"
        borderRadius="2xl"
        p={{ base: 5, sm: 6 }}
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={{ base: 4, sm: 5 }}>
          Your Goals
        </Heading>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 3, sm: 4 }}>
          {goals.map((goal) => (
            <Flex key={goal.id} align="flex-start" gap={3}>
              <Flex
                w={{ base: 9, sm: 10 }}
                h={{ base: 9, sm: 10 }}
                bg="accent.500/20"
                borderRadius="lg"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Box
                  as={goal.icon}
                  w={{ base: 5, sm: 6 }}
                  h={{ base: 5, sm: 6 }}
                  color="accent.400"
                />
              </Flex>
              <Box>
                <Text color="white" fontWeight="medium" fontSize={{ base: 'sm', sm: 'base' }}>
                  {goal.title}
                </Text>
                <Text color="whiteAlpha.600" fontSize={{ base: 'xs', sm: 'sm' }}>
                  Target: {goal.target} • Current: {goal.current}
                </Text>
              </Box>
            </Flex>
          ))}
        </Grid>
        <Button
          onClick={() => setShowGoalsModal(true)}
          aria-label="Update your goals"
          w="full"
          mt={{ base: 4, sm: 5 }}
          bg="primary.500/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={{ base: 3, sm: 3.5 }}
          color="whiteAlpha.700"
          fontSize={{ base: 'sm', sm: 'base' }}
          fontWeight="semibold"
          _hover={{
            color: 'white',
            borderColor: 'primary.300',
          }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          Update Goals
        </Button>
      </Box>

      {/* Settings */}
      <Flex direction="column" gap={{ base: 3, sm: 4 }}>
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
          Settings
        </Heading>

        <Button
          onClick={() => setShowNotificationsModal(true)}
          aria-label="Notification settings"
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={{ base: 4, sm: 5 }}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Box as={Bell} w={5} h={5} color="whiteAlpha.700" />
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Notifications
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Protocol reminders & updates
              </Text>
            </Box>
          </Flex>
          <Box as={ChevronRight} w={5} h={5} color="whiteAlpha.400" />
        </Button>

        <Button
          onClick={() => setShowPersonalInfoModal(true)}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Box as={User} w={5} h={5} color="whiteAlpha.700" />
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Personal Information
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Age, health data, preferences
              </Text>
            </Box>
          </Flex>
          <Box as={ChevronRight} w={5} h={5} color="whiteAlpha.400" />
        </Button>

        <Button
          onClick={() => alert('Privacy & Security settings coming soon!')}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Box as={Lock} w={5} h={5} color="whiteAlpha.700" />
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Privacy & Security
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Data settings & permissions
              </Text>
            </Box>
          </Flex>
          <Box as={ChevronRight} w={5} h={5} color="whiteAlpha.400" />
        </Button>

        <Button
          onClick={() => alert('Resources & Guides coming soon!')}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Box as={FileText} w={5} h={5} color="whiteAlpha.700" />
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Resources & Guides
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Learn about the Alumina Protocol
              </Text>
            </Box>
          </Flex>
          <Box as={ChevronRight} w={5} h={5} color="whiteAlpha.400" />
        </Button>

        <Button
          onClick={() => setShowSupportModal(true)}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Box as={HelpCircle} w={5} h={5} color="whiteAlpha.700" />
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Get Support
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Contact our longevity specialists
              </Text>
            </Box>
          </Flex>
          <Box as={ChevronRight} w={5} h={5} color="whiteAlpha.400" />
        </Button>
      </Flex>

      {/* Account Actions */}
      <Flex direction="column" gap={3} pt={4}>
        <Button
          onClick={() => setShowUpgradeModal(true)}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={3}
          color="accent.400"
          fontWeight="semibold"
          _hover={{ bg: 'primary.600/60' }}
          transition="all 0.3s"
        >
          Upgrade to Lifetime Access
        </Button>
        <Button
          onClick={handleSignOut}
          w="full"
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={3}
          color="whiteAlpha.700"
          fontWeight="semibold"
          _hover={{ bg: 'primary.600/60', color: 'white' }}
          transition="all 0.3s"
        >
          Sign Out
        </Button>
      </Flex>

      {/* App Version */}
      <Box textAlign="center" pt={4}>
        <Text color="whiteAlpha.300" fontSize="xs">
          Alumina At Home v1.0.0
        </Text>
        <Text color="whiteAlpha.300" fontSize="xs" mt={1}>
          Powered by the Alumina Protocol
        </Text>
        <Text color="whiteAlpha.300" fontSize="xs" mt={1}>
          Streak: {currentStreak} days • Best: {longestStreak} days
        </Text>
      </Box>
    </Flex>
  );
}

// Personal Information Modal
interface PersonalInfoFormData {
  name: string;
  email: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  availableTime: number;
}

function PersonalInfoModal({
  user,
  onClose,
  onUpdate
}: {
  user: { name?: string; email?: string; experienceLevel?: 'beginner' | 'intermediate' | 'advanced'; availableTime?: number } | null;
  onClose: () => void;
  onUpdate: (data: Partial<PersonalInfoFormData>) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      experienceLevel: user?.experienceLevel || 'beginner',
      availableTime: user?.availableTime || 30,
    }
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    onUpdate(data);
    onClose();
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
        aria-labelledby="personal-info-title"
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
            <Box
              bgGradient="linear(to-br, accent.500/10, accent.600/10)"
              borderBottomWidth="1px"
              borderColor="accent.500/20"
              p={{ base: 5, sm: 6 }}
            >
              <Flex justify="space-between" align="center">
                <Heading as="h3" id="personal-info-title" size={{ base: "lg", sm: "xl" }} color="white">
                  Personal Information
                </Heading>
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

          <Box as="form" onSubmit={handleSubmit(onSubmit)} p={{ base: 5, sm: 6 }}>
            <Flex direction="column" gap={4}>
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
                />
                {errors.name && (
                  <Text color="red.400" fontSize="xs" mt={1}>{errors.name.message}</Text>
                )}
              </Box>

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
                />
                {errors.email && (
                  <Text color="red.400" fontSize="xs" mt={1}>{errors.email.message}</Text>
                )}
              </Box>

              <Box>
                <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                  Experience Level *
                </Text>
                <Box
                  as="select"
                  {...register('experienceLevel', { required: true })}
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
                  <option value="beginner" style={{ background: '#1A365D' }}>Beginner</option>
                  <option value="intermediate" style={{ background: '#1A365D' }}>Intermediate</option>
                  <option value="advanced" style={{ background: '#1A365D' }}>Advanced</option>
                </Box>
              </Box>

              <Box>
                <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                  Available Time (minutes per day) *
                </Text>
                <Input
                  type="number"
                  {...register('availableTime', {
                    required: true,
                    min: 10,
                    max: 240
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
                />
              </Box>
            </Flex>

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
                Save Changes
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  </FocusTrap>
  );
}

// Goals Modal
function GoalsModal({ goals, onClose }: { goals: Goal[]; onClose: () => void }) {
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
        maxW="2xl"
        w="full"
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
          <Box
            bgGradient="linear(to-br, accent.500/10, accent.600/10)"
            borderBottomWidth="1px"
            borderColor="accent.500/20"
            p={{ base: 5, sm: 6 }}
          >
            <Flex justify="space-between" align="center">
              <Heading as="h3" size={{ base: "lg", sm: "xl" }} color="white">
                Your Goals
              </Heading>
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
            <Text color="whiteAlpha.700" fontSize={{ base: "sm", sm: "base" }} mt={2}>
              Track your progress towards optimal health
            </Text>
          </Box>

          <Box p={{ base: 5, sm: 6 }}>
            <Flex direction="column" gap={4}>
              {goals.map((goal) => (
                <Box
                  key={goal.id}
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  p={4}
                >
                  <Flex align="center" gap={3} mb={2}>
                    <Flex
                      w={10}
                      h={10}
                      bg="accent.500/20"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Box as={goal.icon} w={5} h={5} color="accent.400" />
                    </Flex>
                    <Box flex={1}>
                      <Text color="white" fontWeight="medium" mb={1}>
                        {goal.title}
                      </Text>
                      <Text color="whiteAlpha.600" fontSize="sm">
                        Target: {goal.target} • Current: {goal.current}
                      </Text>
                    </Box>
                  </Flex>
                  <Box mt={3} h={2} bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                    <Box
                      h="full"
                      bgGradient="linear(to-r, accent.400, accent.500)"
                      w="85%"
                    />
                  </Box>
                </Box>
              ))}
            </Flex>

            <Button
              onClick={onClose}
              w="full"
              mt={6}
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
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Notifications Modal
function NotificationsModal({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState({
    protocolReminders: true,
    dailySummary: true,
    weeklyReport: true,
    achievements: true,
    tips: false,
  });

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
    onClose();
  };

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
        maxW="2xl"
        w="full"
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
          <Box
            bgGradient="linear(to-br, accent.500/10, accent.600/10)"
            borderBottomWidth="1px"
            borderColor="accent.500/20"
            p={{ base: 5, sm: 6 }}
          >
            <Flex justify="space-between" align="center">
              <Heading as="h3" size={{ base: "lg", sm: "xl" }} color="white">
                Notification Settings
              </Heading>
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

          <Box p={{ base: 5, sm: 6 }}>
            <Flex direction="column" gap={4}>
              {Object.entries(settings).map(([key, value]) => (
                <Flex
                  key={key}
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
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm">
                      {value ? 'Enabled' : 'Disabled'}
                    </Text>
                  </Box>
                  <Button
                    onClick={() => setSettings({ ...settings, [key]: !value })}
                    px={4}
                    py={2}
                    bg={value ? 'accent.500/20' : 'primary.700/50'}
                    borderWidth="1px"
                    borderColor={value ? 'accent.500' : 'primary.400'}
                    color={value ? 'accent.300' : 'whiteAlpha.600'}
                    fontSize="sm"
                    fontWeight="semibold"
                    _hover={{
                      bg: value ? 'accent.500/30' : 'primary.700/70',
                    }}
                  >
                    {value ? 'On' : 'Off'}
                  </Button>
                </Flex>
              ))}
            </Flex>

            <Flex gap={3} mt={6}>
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
                Cancel
              </Button>
              <Button
                onClick={handleSave}
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
                Save Changes
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Support Modal
interface SupportFormData {
  subject: string;
  message: string;
}

function SupportModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<SupportFormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: SupportFormData) => {
    console.log('Support request:', data);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

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
        maxW="2xl"
        w="full"
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
              <Box
                bgGradient="linear(to-br, accent.500/10, accent.600/10)"
                borderBottomWidth="1px"
                borderColor="accent.500/20"
                p={{ base: 5, sm: 6 }}
              >
                <Flex justify="space-between" align="center">
                  <Heading as="h3" size={{ base: "lg", sm: "xl" }} color="white">
                    Get Support
                  </Heading>
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
                <Text color="whiteAlpha.700" fontSize={{ base: "sm", sm: "base" }} mt={2}>
                  Our longevity specialists are here to help
                </Text>
              </Box>

              <Box as="form" onSubmit={handleSubmit(onSubmit)} p={{ base: 5, sm: 6 }}>
                <Flex direction="column" gap={4}>
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Subject *
                    </Text>
                    <Input
                      {...register('subject', { required: 'Subject is required' })}
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
                      placeholder="How can we help?"
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                    {errors.subject && (
                      <Text color="red.400" fontSize="xs" mt={1}>{errors.subject.message}</Text>
                    )}
                  </Box>

                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="medium" mb={2}>
                      Message *
                    </Text>
                    <Textarea
                      {...register('message', { required: 'Message is required' })}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      borderRadius="lg"
                      color="white"
                      rows={6}
                      _focus={{
                        borderColor: 'accent.500',
                        ring: 2,
                        ringColor: 'accent.400/50'
                      }}
                      placeholder="Describe your question or issue..."
                      _placeholder={{ color: 'whiteAlpha.400' }}
                    />
                    {errors.message && (
                      <Text color="red.400" fontSize="xs" mt={1}>{errors.message.message}</Text>
                    )}
                  </Box>
                </Flex>

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
                    Send Message
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
                Message Sent!
              </Heading>
              <Text color="whiteAlpha.700" fontSize="base">
                We&apos;ll get back to you within 24 hours
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// Upgrade Modal
function UpgradeModal({ onClose }: { onClose: () => void }) {
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
        maxW="2xl"
        w="full"
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
          <Box
            bgGradient="linear(to-br, accent.500, accent.600)"
            p={{ base: 6, sm: 8 }}
            textAlign="center"
          >
            <Heading as="h3" size={{ base: "xl", sm: "2xl" }} color="white" mb={2}>
              Lifetime Access
            </Heading>
            <Text color="white" fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="bold" mb={2}>
              $497
            </Text>
            <Text color="whiteAlpha.900" fontSize={{ base: "sm", sm: "base" }}>
              One-time payment • No recurring fees
            </Text>
          </Box>

          <Box p={{ base: 5, sm: 6 }}>
            <Flex direction="column" gap={3} mb={6}>
              {[
                'Complete Alumina Protocol access',
                'All future updates included',
                'Priority support',
                'Private community access',
                'Monthly live Q&A sessions',
                'Advanced tracking & analytics',
              ].map((feature, idx) => (
                <Flex key={idx} align="center" gap={3}>
                  <Box
                    as={Check}
                    w={5}
                    h={5}
                    color="accent.400"
                    flexShrink={0}
                  />
                  <Text color="whiteAlpha.700">{feature}</Text>
                </Flex>
              ))}
            </Flex>

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
                Maybe Later
              </Button>
              <Button
                onClick={() => alert('Payment processing coming soon!')}
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
                Upgrade Now
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
