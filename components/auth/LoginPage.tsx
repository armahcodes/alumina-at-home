'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth/client';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { LogIn, UserPlus } from 'lucide-react';

/**
 * LoginPage component that redirects to Neon Auth
 * 
 * This page serves as a landing/splash screen that checks auth state
 * and redirects appropriately to Neon Auth pages
 */
export default function LoginPage() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (data?.session) {
      router.push('/');
    }
  }, [data, router]);

  // Show loading state while checking auth
  if (isPending) {
    return (
      <Flex
        minH="100vh"
        bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
        align="center"
        justify="center"
      >
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="accent.400" borderWidth="4px" />
          <Text color="whiteAlpha.700">Loading...</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={{ base: 4, sm: 6 }}
    >
      <Box maxW="md" w="full">
        {/* Logo */}
        <Flex flexDir="column" align="center" mb={{ base: 8, sm: 10 }}>
          <Box mb={4}>
            <Image 
              src="/alumina-isotipo.webp" 
              alt="Alumina Logo" 
              width={80} 
              height={100}
              priority
            />
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl" }}
            fontWeight="bold"
            color="accent.400"
            mb={{ base: 2, sm: 3 }}
            letterSpacing="tight"
          >
            ALUMINA
          </Heading>
          <Text color="accent.200/60" fontSize="lg">
            At Home
          </Text>
          <Text color="whiteAlpha.600" fontSize="md" mt={{ base: 4, sm: 5 }} textAlign="center">
            Longevity in Your Personal Sanctuary
          </Text>
        </Flex>

        {/* Auth Actions */}
        <Box
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Heading
            as="h2"
            size={{ base: "lg", sm: "xl" }}
            color="white"
            mb={2}
            textAlign="center"
          >
            Welcome
          </Heading>
          <Text color="whiteAlpha.600" textAlign="center" mb={{ base: 5, sm: 6 }}>
            Sign in to continue your longevity journey
          </Text>

          <Flex direction="column" gap={3}>
            <Button
              onClick={() => router.push('/auth/sign-in')}
              w="full"
              bgGradient="linear(to-r, accent.500, accent.600)"
              color="white"
              fontWeight="semibold"
              py={3.5}
              borderRadius="xl"
              boxShadow="lg"
              _hover={{
                bgGradient: "linear(to-r, accent.600, accent.700)",
                transform: "translateY(-1px)",
                boxShadow: "xl"
              }}
              _active={{
                bgGradient: "linear(to-r, accent.600, accent.700)",
                transform: "translateY(0)"
              }}
              _focus={{
                ring: 2,
                ringColor: "accent.400",
                ringOffset: 2,
                ringOffsetColor: "primary.900"
              }}
              minH="52px"
              transition="all 0.2s"
              gap={2}
            >
              <Box as={LogIn} w={5} h={5} />
              Sign In
            </Button>

            <Button
              onClick={() => router.push('/auth/sign-up')}
              w="full"
              bg="primary.700/50"
              borderWidth="1px"
              borderColor="primary.400"
              color="whiteAlpha.800"
              fontWeight="semibold"
              py={3.5}
              borderRadius="xl"
              _hover={{
                bg: "primary.700/70",
                borderColor: "primary.300",
                color: "white"
              }}
              _active={{
                bg: "primary.700/60"
              }}
              _focus={{
                ring: 2,
                ringColor: "accent.400",
                ringOffset: 2,
                ringOffsetColor: "primary.900"
              }}
              minH="52px"
              transition="all 0.2s"
              gap={2}
            >
              <Box as={UserPlus} w={5} h={5} />
              Create Account
            </Button>
          </Flex>
        </Box>

        {/* Footer */}
        <Text
          color="whiteAlpha.400"
          fontSize="xs"
          textAlign="center"
          mt={{ base: 5, sm: 6 }}
          px={4}
        >
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </Box>
    </Flex>
  );
}
