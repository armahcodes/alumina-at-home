'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { authClient } from '@/lib/auth/client';
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
  Spinner,
} from '@chakra-ui/react';
import { 
  Home as HomeIcon, 
  ClipboardCheck, 
  Pill, 
  BarChart3, 
  Menu as MenuIcon,
  X,
  Flame,
  Star,
  CheckCircle,
  User,
  Globe,
  PlayCircle,
  Package,
  LogOut,
  LucideIcon
} from 'lucide-react';

type Tab = 'dashboard' | 'protocols' | 'environment' | 'supplements' | 'progress' | 'profile' | 'videos' | 'equipment';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showAchievements, setShowAchievements] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  // Use Neon Auth session
  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  
  // Zustand store for app-specific state
  const { hasCompletedOnboarding, currentStreak, totalPoints, user, completeOnboarding, logout } = useStore();

  // Sync Neon Auth user with Zustand store
  useEffect(() => {
    if (sessionData?.user && !user) {
      // If we have a Neon Auth user but no Zustand user, we need onboarding
      // The user info from Neon Auth can be used to pre-fill
    }
  }, [sessionData, user]);

  // Handle sign out
  const handleSignOut = () => {
    logout();
    // Use window.location for a full page redirect to ensure session is cleared
    window.location.href = '/auth/sign-out';
  };

  // Show loading state while checking auth
  if (isSessionLoading) {
    return (
      <Flex
        minH="100vh"
        bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
        align="center"
        justify="center"
      >
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="accent.400" borderWidth="4px" />
          <Text color="whiteAlpha.700">Loading your sanctuary...</Text>
        </Flex>
      </Flex>
    );
  }

  // Show login if not authenticated
  if (!sessionData?.session) {
    return <LoginPage />;
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  // Get display name from Neon Auth or Zustand
  const displayName = sessionData?.user?.name || user?.name || 'User';
  const displayEmail = sessionData?.user?.email || user?.email || '';

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

  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'protocols', label: 'Protocols', icon: ClipboardCheck },
    { id: 'supplements', label: 'Supplements', icon: Pill },
    { id: 'environment', label: 'Environment', icon: Globe },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
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
                  {displayName?.[0]?.toUpperCase() || 'U'}
                </Flex>
                <Box flex={1} minW={0}>
                  <Text fontSize="sm" fontWeight="semibold" color="white" truncate>
                    {displayName}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.600" truncate>
                    {displayEmail}
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
                  <Box as={Flame} w={6} h={6} color="accent.400" aria-hidden="true" />
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
                  <Box as={Star} w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true" />
                  <Text fontSize="lg" fontWeight="bold" color="accent.400">{totalPoints}</Text>
                  <Text fontSize="xs" color="whiteAlpha.600">Points</Text>
                </Button>
              </Grid>
            </Box>

            {/* Navigation */}
            <Box as="nav" flex={1} px={4} py={4} css={{ '& > *': { marginBottom: '4px' } }} role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
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
                    <Box as={IconComponent} w={5} h={5} flexShrink={0} aria-hidden="true" />
                    <Text fontWeight="medium">{item.label}</Text>
                  </Button>
                );
              })}
            </Box>

            {/* Bottom Actions */}
            <Box px={4} py={4} borderTop="1px solid" borderColor="accent.500/20">
              <Flex direction="column" gap={2}>
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
                  <Box as={CheckCircle} w={5} h={5} aria-hidden="true" />
                  <Text fontWeight="semibold">Achievements</Text>
                </Button>
                
                <Button
                  onClick={handleSignOut}
                  aria-label="Sign out"
                  w="full"
                  gap={3}
                  px={4}
                  py={3}
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  color="whiteAlpha.700"
                  borderRadius="xl"
                  _hover={{ bg: 'primary.700/70', color: 'white' }}
                  transition="all 0.3s"
                >
                  <Box as={LogOut} w={5} h={5} aria-hidden="true" />
                  <Text fontWeight="medium">Sign Out</Text>
                </Button>
              </Flex>
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
                    <Box as={X} w={6} h={6} aria-hidden="true" />
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
                      {displayName?.[0]?.toUpperCase() || 'U'}
                    </Flex>
                    <Box flex={1} minW={0}>
                      <Text fontSize="sm" fontWeight="semibold" color="white" truncate>
                        {displayName}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.600" truncate>
                        {displayEmail}
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
                      <Box as={Flame} w={6} h={6} color="accent.400" aria-hidden="true" />
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
                      <Box as={Star} w={6} h={6} color="accent.400" fill="currentColor" aria-hidden="true" />
                      <Text fontSize="lg" fontWeight="bold" color="accent.400">{totalPoints}</Text>
                      <Text fontSize="xs" color="whiteAlpha.600">Points</Text>
                    </Button>
                  </Grid>
                </Box>

                {/* Navigation - Mobile */}
                <Box as="nav" flex={1} px={4} py={4} css={{ '& > *': { marginBottom: '4px' } }}>
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
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
                        <Box as={IconComponent} w={5} h={5} flexShrink={0} aria-hidden="true" />
                        <Text fontWeight="medium">{item.label}</Text>
                      </Button>
                    );
                  })}
                </Box>

                {/* Bottom Actions - Mobile */}
                <Box px={4} py={4} borderTop="1px solid" borderColor="accent.500/20">
                  <Flex direction="column" gap={2}>
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
                      <Box as={CheckCircle} w={5} h={5} aria-hidden="true" />
                      <Text fontWeight="semibold">Achievements</Text>
                    </Button>
                    
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setSidebarOpen(false);
                      }}
                      aria-label="Sign out"
                      w="full"
                      gap={3}
                      px={4}
                      py={3}
                      bg="primary.700/50"
                      borderWidth="1px"
                      borderColor="primary.400"
                      color="whiteAlpha.700"
                      borderRadius="xl"
                      _active={{ bg: 'primary.700/70', color: 'white' }}
                      transition="all 0.3s"
                    >
                      <Box as={LogOut} w={5} h={5} aria-hidden="true" />
                      <Text fontWeight="medium">Sign Out</Text>
                    </Button>
                  </Flex>
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
                  <Box as={MenuIcon} w={6} h={6} aria-hidden="true" />
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
                  <Box as={CheckCircle} w={5} h={5} color="accent.400" aria-hidden="true" />
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
                        <Box as={Flame} w={5} h={5} color="accent.400" aria-hidden="true" />
                        <Text fontWeight="semibold" color="accent.400">{currentStreak} days</Text>
                      </Flex>
                      <Box w="1px" h={6} bg="whiteAlpha.200" />
                      <Flex align="center" gap={2}>
                        <Box as={Star} w={5} h={5} color="accent.400" fill="currentColor" aria-hidden="true" />
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
