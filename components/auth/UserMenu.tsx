'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { authClient } from '@/lib/auth/client';
import { useSignOut } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { Settings, LogOut, ChevronDown } from 'lucide-react';

/**
 * User menu component with avatar dropdown when authenticated,
 * or sign in/sign up buttons when not authenticated.
 */
export function UserMenu() {
  const { data, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useSignOut();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };

  if (isPending) {
    return (
      <Box p={2}>
        <Spinner size="sm" color="gray.400" />
      </Box>
    );
  }

  if (!data?.session) {
    return (
      <Flex gap={3} align="center">
        <Link href="/auth/sign-in">
          <Text
            color="gray.300"
            fontSize="sm"
            fontWeight="medium"
            _hover={{ color: 'white' }}
            cursor="pointer"
          >
            Sign In
          </Text>
        </Link>
        <Link href="/auth/sign-up">
          <Box
            as="span"
            px={4}
            py={2}
            bg="emerald.500"
            color="white"
            borderRadius="lg"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{ bg: 'emerald.400' }}
            transition="all 0.2s"
          >
            Get Started
          </Box>
        </Link>
      </Flex>
    );
  }

  const initials = (data.user?.name || data.user?.email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Box ref={menuRef} position="relative">
      <Flex
        as="button"
        onClick={() => setOpen(!open)}
        align="center"
        gap={2}
        px={2}
        py={1.5}
        borderRadius="xl"
        cursor="pointer"
        bg={open ? 'whiteAlpha.100' : 'transparent'}
        _hover={{ bg: 'whiteAlpha.100' }}
        transition="all 0.15s"
      >
        <Flex
          w={8}
          h={8}
          bgGradient="linear(to-br, accent.400, accent.600)"
          borderRadius="full"
          align="center"
          justify="center"
          color="white"
          fontWeight="bold"
          fontSize="xs"
          flexShrink={0}
        >
          {initials}
        </Flex>
        <Box display={{ base: 'none', md: 'block' }}>
          <Text color="gray.200" fontSize="sm" fontWeight="medium" lineHeight="tight">
            {data.user?.name || data.user?.email}
          </Text>
        </Box>
        <Box as={ChevronDown} w={3.5} h={3.5} color="whiteAlpha.500" display={{ base: 'none', md: 'block' }} />
      </Flex>

      {/* Dropdown */}
      {open && (
        <Box
          position="absolute"
          right={0}
          top="calc(100% + 6px)"
          w="220px"
          bg="primary.800"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="xl"
          boxShadow="0 12px 40px rgba(0,0,0,0.5)"
          zIndex={100}
          overflow="hidden"
          css={{ backdropFilter: 'blur(20px)' }}
        >
          {/* User info */}
          <Box px={4} py={3} borderBottom="1px solid" borderColor="whiteAlpha.50">
            <Text color="white" fontSize="sm" fontWeight="medium" truncate>
              {data.user?.name}
            </Text>
            <Text color="whiteAlpha.500" fontSize="xs" truncate>
              {data.user?.email}
            </Text>
          </Box>

          {/* Menu items */}
          <Box py={1}>
            <Link href="/account/settings" onClick={() => setOpen(false)}>
              <Flex
                align="center"
                gap={2.5}
                px={4}
                py={2.5}
                _hover={{ bg: 'whiteAlpha.50' }}
                transition="background 0.15s"
                cursor="pointer"
              >
                <Box as={Settings} w={4} h={4} color="whiteAlpha.500" />
                <Text color="whiteAlpha.800" fontSize="sm">Account Settings</Text>
              </Flex>
            </Link>

            <Box
              as="button"
              w="full"
              onClick={handleSignOut}
            >
              <Flex
                align="center"
                gap={2.5}
                px={4}
                py={2.5}
                _hover={{ bg: 'whiteAlpha.50' }}
                transition="background 0.15s"
                cursor="pointer"
              >
                <Box as={LogOut} w={4} h={4} color="red.400/70" />
                <Text color="red.400/80" fontSize="sm">Sign Out</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

/**
 * Hook to get current user data
 */
export function useUser() {
  const { data, isPending, error } = authClient.useSession();

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    isLoading: isPending,
    isAuthenticated: !!data?.session,
    error
  };
}
