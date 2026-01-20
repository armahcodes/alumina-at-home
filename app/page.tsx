'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import LoginPage from '@/components/auth/LoginPage';
import OnboardingFlow from '@/components/auth/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import Protocols from '@/components/Protocols';
import Environment from '@/components/Environment';
import Supplements from '@/components/Supplements';
import Progress from '@/components/Progress';
import Profile from '@/components/Profile';
import VideoLibrary from '@/components/VideoLibrary';
import EquipmentGuide from '@/components/EquipmentGuide';
import AchievementsModal from '@/components/AchievementsModal';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { Home as HomeIcon, ClipboardCheck, Pill, BarChart3, Menu as MenuIcon } from 'lucide-react';

type Tab = 'dashboard' | 'protocols' | 'environment' | 'supplements' | 'progress' | 'profile' | 'videos' | 'equipment';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showAchievements, setShowAchievements] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, hasCompletedOnboarding, currentStreak, totalPoints, user } = useStore();

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'protocols':
        return <Protocols />;
      case 'environment':
        return <Environment />;
      case 'supplements':
        return <Supplements />;
      case 'videos':
        return <VideoLibrary />;
      case 'equipment':
        return <EquipmentGuide />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    )},
    { id: 'protocols', label: 'Protocols', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    )},
    { id: 'supplements', label: 'Supplements', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    )},
    { id: 'environment', label: 'Environment', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    )},
    { id: 'progress', label: 'Progress', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    )},
    { id: 'videos', label: 'Videos', icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </>
    )},
    { id: 'equipment', label: 'Equipment', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    )},
    { id: 'profile', label: 'Profile', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    )},
  ];

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999
        }}
        className="skip-link"
      >
        Skip to main content
      </a>

      <style jsx>{`
        .skip-link:focus {
          position: fixed !important;
          top: 16px;
          left: 16px;
          width: auto !important;
          height: auto !important;
          padding: 8px 16px;
          background: var(--chakra-colors-accent-500, #EFC2B3);
          color: white;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: visible !important;
          z-index: 9999;
        }
      `}</style>

      {/* Achievements Modal */}
      <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

      <Box minH="100vh" bgGradient="linear(to-br, primary.900, primary.700, primary.900)">
        {/* Desktop Sidebar */}
        <Box
          as="aside"
          display={{ base: 'none', lg: 'flex' }}
          position="fixed"
          insetY={0}
          w="72"
          flexDir="column"
          zIndex={50}
        >
          <Flex
            flexDir="column"
            flexGrow={1}
            bg="primary.800"
            backdropFilter="blur(10px)"
            borderRight="1px solid"
            borderColor="accent.500"
            overflowY="auto"
          >
            {/* Logo */}
            <Flex
              align="center"
              justify="center"
              px={6}
              py={5}
              borderBottom="1px solid"
              borderColor="accent.500"
            >
              <Flex flexDir="column" align="center">
                <Image src="/alumina-isotipo.webp" alt="Alumina" width={64} height={80} />
                <Text fontSize="xs" color="accent.200" opacity={0.6} lineHeight="tight" mt={2}>
                  At Home
                </Text>
              </Flex>
            </Flex>

            {/* User Profile Card */}
            <Box px={4} py={4} borderBottom="1px solid" borderColor="accent.500/20">
              <Flex align="center" gap={3} p={3} bg="primary.700/50" borderRadius="xl">
                <Flex
                  w={12}
                  h={12}
                  bgGradient="linear(to-br, accent.400, accent.600)"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  color="white"
                  fontWeight="bold"
                >
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </Flex>
                <Box flex={1} minW={0}>
                  <Text fontSize="sm" fontWeight="semibold" color="white" truncate>
                    {user?.name || 'User'}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.600" truncate>
                    {user?.email || 'user@email.com'}
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Stats */}
            <Box px={4} py={4} borderBottom="1px solid" borderColor="accent.500/20">
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View streak"
                  flexDir="column"
                  gap={1.5}
                  p={3}
                  bg="accent.500/10"
                  borderRadius="xl"
                  h="auto"
                  _hover={{ bg: 'accent.500/20' }}
                  transition="all 0.3s"
                  _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
                >
                  <Icon viewBox="0 0 24 24" w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true">
                    <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                  </Icon>
                  <Text fontSize="lg" fontWeight="bold" color="accent.400">{currentStreak}</Text>
                  <Text fontSize="xs" color="whiteAlpha.600">Day Streak</Text>
                </Button>
                <Button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View points"
                  flexDir="column"
                  gap={1.5}
                  p={3}
                  bg="accent.500/10"
                  borderRadius="xl"
                  h="auto"
                  _hover={{ bg: 'accent.500/20' }}
                  transition="all 0.3s"
                  _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
                >
                  <Icon viewBox="0 0 24 24" w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </Icon>
                  <Text fontSize="lg" fontWeight="bold" color="accent.400">{totalPoints}</Text>
                  <Text fontSize="xs" color="whiteAlpha.600">Points</Text>
                </Button>
              </Grid>
            </Box>

            {/* Navigation */}
            <Box as="nav" flex={1} px={4} py={4} css={{ '& > *': { marginBottom: '4px' } }} role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                  w="full"
                  justifyContent="flex-start"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  transition="all 0.3s"
                  bg={activeTab === item.id ? 'accent.500/20' : 'transparent'}
                  color={activeTab === item.id ? 'accent.300' : 'whiteAlpha.700'}
                  boxShadow={activeTab === item.id ? 'lg' : 'none'}
                  _hover={{
                    bg: activeTab === item.id ? 'accent.500/30' : 'primary.700/50',
                    color: activeTab === item.id ? 'accent.300' : 'white',
                  }}
                  _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
                >
                  <Icon viewBox="0 0 24 24" w={5} h={5} flexShrink={0} fill="none" stroke="currentColor" aria-hidden="true">
                    {item.icon}
                  </Icon>
                  <Text fontWeight="medium">{item.label}</Text>
                </Button>
              ))}
            </Box>

            {/* Achievements Button */}
            <Box px={4} py={4} borderTop="1px solid" borderColor="accent.500/20">
              <Button
                onClick={() => setShowAchievements(true)}
                aria-label="View all achievements"
                w="full"
                gap={3}
                px={4}
                py={3}
                bgGradient="linear(to-r, accent.500, accent.600)"
                color="white"
                borderRadius="xl"
                boxShadow="lg"
                _hover={{ bgGradient: 'linear(to-r, accent.600, accent.700)' }}
                transition="all 0.3s"
                _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
              >
                <Icon viewBox="0 0 24 24" w={5} h={5} fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </Icon>
                <Text fontWeight="semibold">Achievements</Text>
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <Box
              position="fixed"
              inset={0}
              bg="primary.900/95"
              backdropFilter="blur(4px)"
              zIndex={40}
              display={{ base: 'block', lg: 'none' }}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <Box
              as="aside"
              position="fixed"
              insetY={0}
              left={0}
              w="72"
              bg="primary.800"
              backdropFilter="blur(10px)"
              borderRight="1px solid"
              borderColor="accent.500"
              zIndex={50}
              display={{ base: 'block', lg: 'none' }}
              overflowY="auto"
            >
              <Flex flexDir="column" h="full">
                {/* Close Button & Logo */}
                <Flex align="center" justify="space-between" px={6} py={5} borderBottom="1px solid" borderColor="accent.500/20">
                  <Flex flexDir="column" align="center" flex={1}>
                    <Image src="/alumina-isotipo.webp" alt="Alumina" width={64} height={80} />
                    <Text fontSize="xs" color="accent.200" opacity={0.6} lineHeight="tight" mt={2}>
                      At Home
                    </Text>
                  </Flex>
                  <Button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu"
                    w={10}
                    h={10}
                    color="whiteAlpha.700"
                    bg="transparent"
                    _hover={{ color: 'white' }}
                    transition="colors 0.3s"
                    _focus={{ ring: 2, ringColor: 'accent.400' }}
                    borderRadius="lg"
                  >
                    <Icon viewBox="0 0 24 24" w={6} h={6} fill="none" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </Icon>
                  </Button>
                </Flex>

                {/* User Profile Card - Mobile */}
                <Box px={4} py={4} borderBottom="1px solid" borderColor="accent.500/20">
                  <Flex align="center" gap={3} p={3} bg="primary.700/50" borderRadius="xl">
                    <Flex
                      w={12}
                      h={12}
                      bgGradient="linear(to-br, accent.400, accent.600)"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      color="white"
                      fontWeight="bold"
                    >
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </Flex>
                    <Box flex={1} minW={0}>
                      <Text fontSize="sm" fontWeight="semibold" color="white" truncate>
                        {user?.name || 'User'}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.600" truncate>
                        {user?.email || 'user@email.com'}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                {/* Stats - Mobile */}
                <Box px={4} py={4} borderBottom="1px solid" borderColor="accent.500/20">
                  <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                    <Button
                      onClick={() => {
                        setShowAchievements(true);
                        setSidebarOpen(false);
                      }}
                      aria-label="View streak"
                      flexDir="column"
                      gap={1.5}
                      p={3}
                      bg="accent.500/10"
                      borderRadius="xl"
                      h="auto"
                      _active={{ bg: 'accent.500/20' }}
                      transition="all 0.3s"
                    >
                      <Icon viewBox="0 0 24 24" w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true">
                        <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                      </Icon>
                      <Text fontSize="lg" fontWeight="bold" color="accent.400">{currentStreak}</Text>
                      <Text fontSize="xs" color="whiteAlpha.600">Day Streak</Text>
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAchievements(true);
                        setSidebarOpen(false);
                      }}
                      aria-label="View points"
                      flexDir="column"
                      gap={1.5}
                      p={3}
                      bg="accent.500/10"
                      borderRadius="xl"
                      h="auto"
                      _active={{ bg: 'accent.500/20' }}
                      transition="all 0.3s"
                    >
                      <Icon viewBox="0 0 24 24" w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </Icon>
                      <Text fontSize="lg" fontWeight="bold" color="accent.400">{totalPoints}</Text>
                      <Text fontSize="xs" color="whiteAlpha.600">Points</Text>
                    </Button>
                  </Grid>
                </Box>

                {/* Navigation - Mobile */}
                <Box as="nav" flex={1} px={4} py={4} css={{ '& > *': { marginBottom: '4px' } }}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as Tab);
                        setSidebarOpen(false);
                      }}
                      aria-label={`Navigate to ${item.label}`}
                      w="full"
                      justifyContent="flex-start"
                      gap={3}
                      px={4}
                      py={3}
                      borderRadius="xl"
                      transition="all 0.3s"
                      bg={activeTab === item.id ? 'accent.500/20' : 'transparent'}
                      color={activeTab === item.id ? 'accent.300' : 'whiteAlpha.700'}
                      _active={{
                        bg: activeTab === item.id ? 'accent.500/30' : 'primary.700/50',
                      }}
                    >
                      <Icon viewBox="0 0 24 24" w={5} h={5} flexShrink={0} fill="none" stroke="currentColor" aria-hidden="true">
                        {item.icon}
                      </Icon>
                      <Text fontWeight="medium">{item.label}</Text>
                    </Button>
                  ))}
                </Box>

                {/* Achievements Button - Mobile */}
                <Box px={4} py={4} borderTop="1px solid" borderColor="accent.500/20">
                  <Button
                    onClick={() => {
                      setShowAchievements(true);
                      setSidebarOpen(false);
                    }}
                    aria-label="View all achievements"
                    w="full"
                    gap={3}
                    px={4}
                    py={3}
                    bgGradient="linear(to-r, accent.500, accent.600)"
                    color="white"
                    borderRadius="xl"
                    boxShadow="lg"
                    _active={{ bgGradient: 'linear(to-r, accent.600, accent.700)' }}
                    transition="all 0.3s"
                  >
                    <Icon viewBox="0 0 24 24" w={5} h={5} fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </Icon>
                    <Text fontWeight="semibold">Achievements</Text>
                  </Button>
                </Box>
              </Flex>
            </Box>
          </>
        )}

        {/* Main Content */}
        <Box as="main" id="main-content" pl={{ base: 0, lg: 72 }} tabIndex={-1}>
          {/* Mobile Header */}
          <Box
            as="header"
            position="sticky"
            top={0}
            zIndex={30}
            bg="primary.700/80"
            backdropFilter="blur(10px)"
            borderBottom="1px solid"
            borderColor="accent.500/20"
            display={{ base: 'block', lg: 'none' }}
          >
            <Box px={4} py={3}>
              <Flex align="center" justify="space-between">
                <Button
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open menu"
                  w={11}
                  h={11}
                  color="whiteAlpha.700"
                  bg="transparent"
                  _hover={{ color: 'white' }}
                  transition="colors 0.3s"
                  _focus={{ ring: 2, ringColor: 'accent.400' }}
                  borderRadius="lg"
                >
                  <Icon viewBox="0 0 24 24" w={6} h={6} fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </Icon>
                </Button>

                <Flex textAlign="center" flexDir="column" align="center">
                  <Box w={{ base: 10, sm: 12 }} h={{ base: 12, sm: 14 }}>
                    <Image src="/alumina-isotipo.webp" alt="Alumina" width={48} height={56} />
                  </Box>
                  <Text fontSize={{ base: '10px', sm: 'xs' }} color="accent.200" opacity={0.6} lineHeight="tight" mt={1}>
                    At Home
                  </Text>
                </Flex>

                <Button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View achievements"
                  w={11}
                  h={11}
                  bg="accent.500/10"
                  borderRadius="lg"
                  _active={{ bg: 'accent.500/20' }}
                  transition="all 0.3s"
                  _focus={{ ring: 2, ringColor: 'accent.400' }}
                >
                  <Icon viewBox="0 0 24 24" w={5} h={5} color="accent.400" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </Icon>
                </Button>
              </Flex>
            </Box>
          </Box>

          {/* Desktop Header */}
          <Box
            as="header"
            display={{ base: 'none', lg: 'block' }}
            position="sticky"
            top={0}
            zIndex={30}
            bg="primary.700/80"
            backdropFilter="blur(10px)"
            borderBottom="1px solid"
            borderColor="accent.500/20"
          >
            <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={4}>
              <Flex align="center" justify="space-between">
                <Box>
                  <Heading as="h2" size={{ base: 'xl', sm: '2xl' }} color="white">
                    {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </Heading>
                  <Text fontSize={{ base: 'sm', sm: 'base' }} color="whiteAlpha.600" mt={1}>
                    {activeTab === 'dashboard' && 'Your longevity journey overview'}
                    {activeTab === 'protocols' && 'Evidence-based daily practices'}
                    {activeTab === 'supplements' && 'Optimized supplement stack'}
                    {activeTab === 'environment' && 'Transform your home sanctuary'}
                    {activeTab === 'progress' && 'Track your health metrics'}
                    {activeTab === 'videos' && 'Master every protocol'}
                    {activeTab === 'equipment' && 'Curated longevity tools'}
                    {activeTab === 'profile' && 'Manage your account'}
                  </Text>
                </Box>

                <Flex align="center" gap={3}>
                  <Button
                    onClick={() => setShowAchievements(true)}
                    aria-label="View streak and points"
                    px={4}
                    py={2}
                    bg="accent.500/10"
                    borderRadius="xl"
                    _hover={{ bg: 'accent.500/20' }}
                    transition="all 0.3s"
                    _focus={{ ring: 2, ringColor: 'accent.400' }}
                  >
                    <Flex align="center" gap={4}>
                      <Flex align="center" gap={2}>
                        <Icon viewBox="0 0 24 24" w={5} h={5} color="accent.400" fill="currentColor" aria-hidden="true">
                          <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                        </Icon>
                        <Text fontWeight="semibold" color="accent.400">{currentStreak} days</Text>
                      </Flex>
                      <Box w="1px" h={6} bg="whiteAlpha.200" />
                      <Flex align="center" gap={2}>
                        <Icon viewBox="0 0 24 24" w={5} h={5} color="accent.400" fill="currentColor" aria-hidden="true">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </Icon>
                        <Text fontWeight="semibold" color="accent.400">{totalPoints} pts</Text>
                      </Flex>
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Box>

          {/* Content */}
          <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={{ base: 6, sm: 8 }} pb={{ base: 24, lg: 8 }}>
            {renderContent()}
          </Box>
        </Box>

        {/* Mobile Bottom Navigation */}
        <Box
          as="nav"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="primary.800/98"
          backdropFilter="blur(20px)"
          borderTop="1px solid"
          borderColor="accent.500/10"
          display={{ base: 'block', lg: 'none' }}
          role="navigation"
          aria-label="Mobile navigation"
          className="safe-area-bottom mobile-nav"
          zIndex={40}
        >
          <Flex justify="space-around" align="center" px={1} pt={2} pb={1} maxW="500px" mx="auto">
            {[
              { id: 'dashboard', label: 'Home', icon: HomeIcon },
              { id: 'protocols', label: 'Protocols', icon: ClipboardCheck },
              { id: 'supplements', label: 'Supps', icon: Pill },
              { id: 'progress', label: 'Progress', icon: BarChart3 },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  minW="60px"
                  minH="52px"
                  px={2}
                  py={1.5}
                  borderRadius="xl"
                  transition="all 0.2s"
                  bg={isActive ? 'accent.500/15' : 'transparent'}
                  color={isActive ? 'accent.400' : 'whiteAlpha.500'}
                  _hover={{ bg: isActive ? 'accent.500/20' : 'whiteAlpha.50', color: isActive ? 'accent.400' : 'whiteAlpha.700' }}
                  _active={{ transform: 'scale(0.95)' }}
                  _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
                >
                  <Box 
                    as={item.icon} 
                    w={5} 
                    h={5} 
                    mb={0.5} 
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <Text 
                    fontSize="10px" 
                    lineHeight="tight" 
                    fontWeight={isActive ? 'semibold' : 'medium'}
                    letterSpacing={isActive ? '0.01em' : 'normal'}
                  >
                    {item.label}
                  </Text>
                </Button>
              );
            })}
            <Button
              onClick={() => setSidebarOpen(true)}
              aria-label="More options"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              minW="60px"
              minH="52px"
              px={2}
              py={1.5}
              borderRadius="xl"
              color="whiteAlpha.500"
              bg="transparent"
              _hover={{ bg: 'whiteAlpha.50', color: 'whiteAlpha.700' }}
              _active={{ transform: 'scale(0.95)' }}
              transition="all 0.2s"
              _focus={{ ring: 2, ringColor: 'accent.400', ringOffset: 2, ringOffsetColor: 'primary.900' }}
            >
              <Box as={MenuIcon} w={5} h={5} mb={0.5} aria-hidden="true" />
              <Text fontSize="10px" lineHeight="tight" fontWeight="medium">More</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
