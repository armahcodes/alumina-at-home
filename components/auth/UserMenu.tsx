'use client';

import { UserButton } from '@neondatabase/auth/react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

/**
 * User menu component that shows the user button when authenticated,
 * or sign in/sign up buttons when not authenticated.
 */
export function UserMenu() {
  const { data, isPending } = authClient.useSession();
  
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

  return (
    <Flex align="center" gap={3}>
      <Box display={{ base: 'none', md: 'block' }}>
        <Text color="gray.300" fontSize="sm">
          {data.user?.email}
        </Text>
      </Box>
      <UserButton size="icon" />
    </Flex>
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
