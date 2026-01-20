'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Grid
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

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
          <Text color="whiteAlpha.600" fontSize="md" mt={{ base: 4, sm: 5 }}>
            Longevity in Your Personal Sanctuary
          </Text>
        </Flex>

        {/* Form */}
        <Box
          bg="primary.600/50"
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Heading
            as="h2"
            id="form-title"
            size={{ base: "lg", sm: "xl" }}
            color="white"
            mb={{ base: 5, sm: 6 }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Heading>

          <form onSubmit={handleSubmit} aria-labelledby="form-title">
            <Stack gap={4}>
              <Field.Root>
                <Field.Label htmlFor="email" color="whiteAlpha.700" fontSize="sm">
                  Email
                </Field.Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  px={4}
                  py={3.5}
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize="base"
                  placeholder="your@email.com"
                  _placeholder={{ color: "whiteAlpha.600" }}
                  _focus={{
                    borderColor: "accent.400",
                    outline: "none",
                    ring: 2,
                    ringColor: "accent.400/50"
                  }}
                  required
                  autoComplete="email"
                  minH="52px"
                  aria-required="true"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="password" color="whiteAlpha.700" fontSize="sm">
                  Password
                </Field.Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  px={4}
                  py={3.5}
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize="base"
                  placeholder="••••••••"
                  _placeholder={{ color: "whiteAlpha.600" }}
                  _focus={{
                    borderColor: "accent.400",
                    outline: "none",
                    ring: 2,
                    ringColor: "accent.400/50"
                  }}
                  required
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minH="52px"
                  aria-required="true"
                />
              </Field.Root>

              <Button
                type="submit"
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
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Box mt={5} textAlign="center">
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              variant="ghost"
              color="accent.400"
              fontSize="sm"
              _active={{ color: "accent.300" }}
              minH="44px"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </Box>

          {/* Social Login */}
          <Box mt={5} pt={5} borderTopWidth="1px" borderColor="primary.400/30">
            <Text color="whiteAlpha.400" fontSize="xs" textAlign="center" mb={3}>
              Or continue with
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <Button
                px={4}
                py={3}
                bg="primary.700/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                color="whiteAlpha.700"
                fontSize="sm"
                _active={{ bg: "primary.700/60" }}
                minH="48px"
              >
                Google
              </Button>
              <Button
                px={4}
                py={3}
                bg="primary.700/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                color="whiteAlpha.700"
                fontSize="sm"
                _active={{ bg: "primary.700/60" }}
                minH="48px"
              >
                Apple
              </Button>
            </Grid>
          </Box>
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
