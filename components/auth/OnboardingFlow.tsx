'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { authClient } from '@/lib/auth/client';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Grid,
} from '@chakra-ui/react';
import { 
  Zap, Moon, Heart, User, Lightbulb, Clock, CheckCircle, Activity,
  Users, Award, Star, DollarSign, Wallet, Sparkles, Check
} from 'lucide-react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const shouldReduceMotion = useReducedMotion();
  
  // Get user data from Neon Auth session
  const { data: sessionData } = authClient.useSession();
  const neonUser = sessionData?.user;

  const [formData, setFormData] = useState({
    name: neonUser?.name || '',
    goals: [] as string[],
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    availableTime: 30,
    healthConditions: [] as string[],
    budget: 'intermediate' as 'essential' | 'intermediate' | 'premium',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        ...formData,
        email: neonUser?.email || ''
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    completeOnboarding({
      name: formData.name || neonUser?.name || 'Friend',
      email: neonUser?.email || '',
      goals: formData.goals.length > 0 ? formData.goals : ['Increase energy'],
      experienceLevel: formData.experienceLevel,
      availableTime: formData.availableTime,
      healthConditions: formData.healthConditions,
      budget: formData.budget,
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter(g => g !== goal)
        : [...formData.goals, goal]
    });
  };

  // Goals with Lucide icons
  const goals = [
    { label: 'Increase energy', icon: Zap },
    { label: 'Improve sleep quality', icon: Moon },
    { label: 'Reduce stress', icon: Heart },
    { label: 'Optimize body composition', icon: User },
    { label: 'Enhance mental clarity', icon: Lightbulb },
    { label: 'Reverse biological age', icon: Clock },
    { label: 'Build healthy habits', icon: CheckCircle },
    { label: 'Improve athletic performance', icon: Activity }
  ];

  // Experience levels with Lucide icons
  const experienceLevels = [
    { value: 'beginner', label: 'Beginner', desc: 'New to wellness and longevity practices', icon: Users },
    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with biohacking', icon: Award },
    { value: 'advanced', label: 'Advanced', desc: 'Experienced with wellness optimization', icon: Star }
  ];

  // Budget tiers with Lucide icons
  const budgetTiers = [
    { value: 'essential', label: 'Essential ($0-$500)', desc: 'Start with free protocols and minimal equipment', icon: DollarSign },
    { value: 'intermediate', label: 'Intermediate ($500-$2,500)', desc: 'Add helpful tools for better results', icon: Wallet },
    { value: 'premium', label: 'Premium ($2,500+)', desc: 'Invest in advanced optimization equipment', icon: Sparkles }
  ];

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={{ base: 4, sm: 6 }}
    >
      <Box maxW="2xl" w="full">
        {/* Skip Button */}
        <Flex justify="flex-end" mb={{ base: 3, sm: 4 }}>
          <Button
            onClick={handleSkip}
            variant="ghost"
            color="whiteAlpha.600"
            _hover={{ color: "white" }}
            _active={{ color: "white" }}
            fontSize="sm"
            textDecoration="underline"
            minH="44px"
          >
            Skip for now
          </Button>
        </Flex>

        {/* Progress Bar */}
        <Box mb={{ base: 6, sm: 8 }}>
          <Flex align="center" justify="space-between" mb={2}>
            <Text color="whiteAlpha.600" fontSize="sm">
              Step {step} of {totalSteps}
            </Text>
            <Text color="accent.400" fontSize="sm" fontWeight="semibold">
              {Math.round((step / totalSteps) * 100)}%
            </Text>
          </Flex>
          <Box h={2} bg="primary.600/50" borderRadius="full" overflow="hidden">
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, var(--chakra-colors-accent-400), var(--chakra-colors-accent-500))',
                borderRadius: '9999px'
              }}
              initial={shouldReduceMotion ? false : { width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.3 }}
            />
          </Box>
        </Box>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  Welcome! What&apos;s your name?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  Let&apos;s personalize your longevity journey
                </Text>

                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  px={{ base: 5, sm: 6 }}
                  py={4}
                  bg="primary.700/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize={{ base: "base", sm: "lg" }}
                  placeholder="Enter your name"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{ borderColor: "accent.400", outline: "none", ring: 2, ringColor: "accent.400/50" }}
                  minH="52px"
                  autoFocus
                  autoComplete="name"
                />
              </Box>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What are your main goals?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  Select all that apply
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 2.5, sm: 3 }}>
                  {goals.map((goal) => {
                    const IconComponent = goal.icon;
                    const isSelected = formData.goals.includes(goal.label);
                    return (
                      <Button
                        key={goal.label}
                        onClick={() => toggleGoal(goal.label)}
                        px={{ base: 4, sm: 5 }}
                        py={{ base: 3.5, sm: 4 }}
                        borderRadius="xl"
                        borderWidth="1px"
                        minH="56px"
                        justifyContent="flex-start"
                        bg={isSelected ? "accent.500/20" : "primary.700/50"}
                        borderColor={isSelected ? "accent.500" : "primary.400"}
                        color={isSelected ? "accent.300" : "whiteAlpha.700"}
                        _hover={{ bg: isSelected ? "accent.500/30" : "primary.700/70", borderColor: isSelected ? "accent.500" : "primary.300" }}
                        _active={{ bg: isSelected ? "accent.500/30" : "primary.700/60", transform: "scale(0.98)" }}
                        transition="all 0.2s"
                      >
                        <Flex align="center" gap={{ base: 2.5, sm: 3 }} w="full">
                          <Flex
                            w={{ base: 9, sm: 10 }}
                            h={{ base: 9, sm: 10 }}
                            bg={isSelected ? "accent.500/30" : "whiteAlpha.100"}
                            borderRadius="lg"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={IconComponent} w={{ base: 5, sm: 5 }} h={{ base: 5, sm: 5 }} color={isSelected ? "accent.400" : "whiteAlpha.700"} />
                          </Flex>
                          <Text fontWeight="medium" flex={1} fontSize={{ base: "sm", sm: "base" }} textAlign="left">
                            {goal.label}
                          </Text>
                          <Flex
                            w={6}
                            h={6}
                            borderRadius="full"
                            borderWidth="2px"
                            borderColor={isSelected ? "accent.400" : "whiteAlpha.300"}
                            bg={isSelected ? "accent.400" : "transparent"}
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            {isSelected && (
                              <Box as={Check} w={4} h={4} color="white" strokeWidth={3} />
                            )}
                          </Flex>
                        </Flex>
                      </Button>
                    );
                  })}
                </Grid>
              </Box>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What&apos;s your experience level?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  This helps us customize your protocols
                </Text>

                <Flex direction="column" gap={{ base: 2.5, sm: 3 }}>
                  {experienceLevels.map((level) => {
                    const IconComponent = level.icon;
                    const isSelected = formData.experienceLevel === level.value;
                    return (
                      <Button
                        key={level.value}
                        onClick={() => setFormData({ ...formData, experienceLevel: level.value as 'beginner' | 'intermediate' | 'advanced' })}
                        w="full"
                        px={{ base: 5, sm: 6 }}
                        py={{ base: 4, sm: 5 }}
                        borderRadius="xl"
                        borderWidth="1px"
                        minH="72px"
                        justifyContent="flex-start"
                        bg={isSelected ? "accent.500/20" : "primary.700/50"}
                        borderColor={isSelected ? "accent.500" : "primary.400"}
                        _hover={{ bg: isSelected ? "accent.500/30" : "primary.700/70", borderColor: isSelected ? "accent.500" : "primary.300" }}
                        _active={{ bg: isSelected ? "accent.500/30" : "primary.700/60", transform: "scale(0.99)" }}
                        transition="all 0.2s"
                      >
                        <Flex align="center" gap={4} w="full">
                          <Flex
                            w={12}
                            h={12}
                            bg={isSelected ? "accent.500/30" : "whiteAlpha.100"}
                            borderRadius="xl"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={IconComponent} w={6} h={6} color={isSelected ? "accent.400" : "whiteAlpha.700"} />
                          </Flex>
                          <Box flex={1} textAlign="left">
                            <Text color="white" fontWeight="semibold" fontSize={{ base: "base", sm: "lg" }}>
                              {level.label}
                            </Text>
                            <Text color="whiteAlpha.600" fontSize={{ base: "xs", sm: "sm" }} mt={0.5}>
                              {level.desc}
                            </Text>
                          </Box>
                          {isSelected && (
                            <Flex
                              w={7}
                              h={7}
                              bg="accent.400"
                              borderRadius="full"
                              align="center"
                              justify="center"
                              flexShrink={0}
                            >
                              <Box as={Check} w={4} h={4} color="white" strokeWidth={3} />
                            </Flex>
                          )}
                        </Flex>
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  How much time can you commit daily?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  We&apos;ll build your protocol around your schedule
                </Text>

                <Box mb={8}>
                  <Flex align="center" justify="center" mb={6}>
                    <Flex
                      w={20}
                      h={20}
                      bg="accent.500/20"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      borderWidth="2px"
                      borderColor="accent.500"
                    >
                      <Text color="accent.400" fontSize="2xl" fontWeight="bold">
                        {formData.availableTime}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text color="whiteAlpha.600" textAlign="center" mb={4} fontSize="sm">
                    minutes per day
                  </Text>
                  <Input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={formData.availableTime}
                    onChange={(e) => setFormData({ ...formData, availableTime: parseInt(e.target.value) })}
                    w="full"
                    h={2}
                    bg="primary.700/50"
                    borderRadius="full"
                    cursor="pointer"
                    css={{
                      '&::-webkit-slider-thumb': {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--chakra-colors-accent-400)',
                        cursor: 'pointer',
                        appearance: 'none',
                        marginTop: '-10px',
                      }
                    }}
                  />
                  <Flex justify="space-between" color="whiteAlpha.500" fontSize="xs" mt={3}>
                    <Text>15 min</Text>
                    <Text>60 min</Text>
                    <Text>120 min</Text>
                  </Flex>
                </Box>

                <Box bg="accent.500/10" borderRadius="xl" p={4} borderWidth="1px" borderColor="accent.500/30">
                  <Flex align="center" gap={3}>
                    <Box as={Clock} w={5} h={5} color="accent.400" />
                    <Text color="whiteAlpha.800" fontSize="sm">
                      {formData.availableTime < 30 && "We'll focus on essential quick wins"}
                      {formData.availableTime >= 30 && formData.availableTime < 60 && "Perfect for building core habits"}
                      {formData.availableTime >= 60 && "Great! You'll have time for advanced protocols"}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
            >
              <Box
                bg="primary.600/50"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What&apos;s your equipment budget?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  We&apos;ll recommend tools that fit your investment level
                </Text>

                <Flex direction="column" gap={{ base: 2.5, sm: 3 }}>
                  {budgetTiers.map((budget) => {
                    const IconComponent = budget.icon;
                    const isSelected = formData.budget === budget.value;
                    return (
                      <Button
                        key={budget.value}
                        onClick={() => setFormData({ ...formData, budget: budget.value as 'essential' | 'intermediate' | 'premium' })}
                        w="full"
                        px={{ base: 5, sm: 6 }}
                        py={{ base: 4, sm: 5 }}
                        borderRadius="xl"
                        borderWidth="1px"
                        minH="72px"
                        justifyContent="flex-start"
                        bg={isSelected ? "accent.500/20" : "primary.700/50"}
                        borderColor={isSelected ? "accent.500" : "primary.400"}
                        _hover={{ bg: isSelected ? "accent.500/30" : "primary.700/70", borderColor: isSelected ? "accent.500" : "primary.300" }}
                        _active={{ bg: isSelected ? "accent.500/30" : "primary.700/60", transform: "scale(0.99)" }}
                        transition="all 0.2s"
                      >
                        <Flex align="center" gap={4} w="full">
                          <Flex
                            w={12}
                            h={12}
                            bg={isSelected ? "accent.500/30" : "whiteAlpha.100"}
                            borderRadius="xl"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={IconComponent} w={6} h={6} color={isSelected ? "accent.400" : "whiteAlpha.700"} />
                          </Flex>
                          <Box flex={1} textAlign="left">
                            <Text color="white" fontWeight="semibold" fontSize={{ base: "base", sm: "lg" }}>
                              {budget.label}
                            </Text>
                            <Text color="whiteAlpha.600" fontSize={{ base: "xs", sm: "sm" }} mt={0.5}>
                              {budget.desc}
                            </Text>
                          </Box>
                          {isSelected && (
                            <Flex
                              w={7}
                              h={7}
                              bg="accent.400"
                              borderRadius="full"
                              align="center"
                              justify="center"
                              flexShrink={0}
                            >
                              <Box as={Check} w={4} h={4} color="white" strokeWidth={3} />
                            </Flex>
                          )}
                        </Flex>
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <Flex align="center" justify="space-between" mt={{ base: 6, sm: 8 }} gap={3}>
          <Button
            onClick={handleBack}
            disabled={step === 1}
            px={{ base: 5, sm: 6 }}
            py={3.5}
            bg="primary.600/50"
            borderWidth="1px"
            borderColor="primary.400"
            borderRadius="xl"
            color="whiteAlpha.700"
            _hover={{ color: "white", borderColor: "primary.300" }}
            _active={{ color: "white" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
            minH="48px"
            transition="all 0.2s"
          >
            ← Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.name) ||
              (step === 2 && formData.goals.length === 0)
            }
            flex={1}
            px={{ base: 6, sm: 8 }}
            py={3.5}
            bgGradient="linear(to-r, accent.500, accent.600)"
            color="white"
            fontWeight="semibold"
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
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            minH="48px"
            transition="all 0.2s"
          >
            {step === totalSteps ? 'Complete Setup ✨' : 'Next →'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
