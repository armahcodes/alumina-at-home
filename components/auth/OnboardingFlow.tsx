'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Grid,
  Icon
} from '@chakra-ui/react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
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
        email: useStore.getState().user?.email || ''
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    completeOnboarding({
      name: formData.name || 'Friend',
      email: useStore.getState().user?.email || '',
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
            <Text color="accent.400" fontSize="sm">
              {Math.round((step / totalSteps) * 100)}%
            </Text>
          </Flex>
          <Box h={2} bg="primary.600/50" borderRadius="full" overflow="hidden">
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, var(--chakra-colors-accent-400), var(--chakra-colors-accent-500))',
                width: `${(step / totalSteps) * 100}%`
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
                  _focus={{ borderColor: "accent.400", outline: "none" }}
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
                  {[
                    { label: 'Increase energy', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    { label: 'Improve sleep quality', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
                    { label: 'Reduce stress', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                    { label: 'Optimize body composition', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                    { label: 'Enhance mental clarity', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                    { label: 'Reverse biological age', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Build healthy habits', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Improve athletic performance', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                  ].map((goal) => (
                    <Button
                      key={goal.label}
                      onClick={() => toggleGoal(goal.label)}
                      px={{ base: 4, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="56px"
                      justifyContent="flex-start"
                      bg={formData.goals.includes(goal.label) ? "accent.500/20" : "primary.700/50"}
                      borderColor={formData.goals.includes(goal.label) ? "accent.500" : "primary.400"}
                      color={formData.goals.includes(goal.label) ? "accent.300" : "whiteAlpha.700"}
                      _active={{ bg: formData.goals.includes(goal.label) ? "accent.500/30" : "primary.700/60" }}
                    >
                      <Flex align="center" gap={{ base: 2.5, sm: 3 }}>
                        <Flex
                          w={{ base: 8, sm: 9 }}
                          h={{ base: 8, sm: 9 }}
                          bg={formData.goals.includes(goal.label) ? "accent.500/20" : "whiteAlpha.50"}
                          borderRadius="lg"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Icon viewBox="0 0 24 24" w={{ base: 4, sm: 5 }} h={{ base: 4, sm: 5 }} color={formData.goals.includes(goal.label) ? "accent.400" : "whiteAlpha.600"}>
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={goal.icon}
                            />
                          </Icon>
                        </Flex>
                        <Text fontWeight="medium" flex={1}>{goal.label}</Text>
                        <Box
                          w={5}
                          h={5}
                          borderRadius="full"
                          borderWidth="2px"
                          borderColor={formData.goals.includes(goal.label) ? "accent.400" : "whiteAlpha.300"}
                          bg={formData.goals.includes(goal.label) ? "accent.400" : "transparent"}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          {formData.goals.includes(goal.label) && (
                            <Icon viewBox="0 0 24 24" w={3} h={3} color="white">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </Icon>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  ))}
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
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'New to wellness and longevity practices', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with biohacking', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                    { value: 'advanced', label: 'Advanced', desc: 'Experienced with wellness optimization', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
                  ].map((level) => (
                    <Button
                      key={level.value}
                      onClick={() => setFormData({ ...formData, experienceLevel: level.value as 'beginner' | 'intermediate' | 'advanced' })}
                      w="full"
                      px={{ base: 5, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="68px"
                      justifyContent="flex-start"
                      bg={formData.experienceLevel === level.value ? "accent.500/20" : "primary.700/50"}
                      borderColor={formData.experienceLevel === level.value ? "accent.500" : "primary.400"}
                      _active={{ bg: formData.experienceLevel === level.value ? "accent.500/30" : "primary.700/60" }}
                    >
                      <Flex align="center" gap={3} w="full">
                        <Flex
                          w={10}
                          h={10}
                          bg={formData.experienceLevel === level.value ? "accent.500/20" : "whiteAlpha.50"}
                          borderRadius="lg"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Icon viewBox="0 0 24 24" w={5} h={5} color={formData.experienceLevel === level.value ? "accent.400" : "whiteAlpha.600"}>
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={level.icon}
                            />
                          </Icon>
                        </Flex>
                        <Box flex={1}>
                          <Text color="white" fontWeight="semibold" fontSize="base">
                            {level.label}
                          </Text>
                          <Text color="whiteAlpha.600" fontSize="sm" mt={0.5}>
                            {level.desc}
                          </Text>
                        </Box>
                      </Flex>
                    </Button>
                  ))}
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
                  <Flex align="center" justify="space-between" mb={4}>
                    <Text color="white" fontSize="lg" fontWeight="semibold">
                      {formData.availableTime} minutes
                    </Text>
                  </Flex>
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
                  />
                  <Flex justify="space-between" color="whiteAlpha.400" fontSize="xs" mt={2}>
                    <Text>15 min</Text>
                    <Text>120 min</Text>
                  </Flex>
                </Box>

                <Box bg="primary.700/30" borderRadius="xl" p={4} borderWidth="1px" borderColor="primary.400">
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {formData.availableTime < 30 && "We'll focus on essential quick wins"}
                    {formData.availableTime >= 30 && formData.availableTime < 60 && "Perfect for building core habits"}
                    {formData.availableTime >= 60 && "Great! You'll have time for advanced protocols"}
                  </Text>
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
                  {[
                    { value: 'essential', label: 'Essential ($0-$500)', desc: 'Start with free protocols and minimal equipment', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { value: 'intermediate', label: 'Intermediate ($500-$2,500)', desc: 'Add helpful tools for better results', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
                    { value: 'premium', label: 'Premium ($2,500+)', desc: 'Invest in advanced optimization equipment', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' }
                  ].map((budget) => (
                    <Button
                      key={budget.value}
                      onClick={() => setFormData({ ...formData, budget: budget.value as 'essential' | 'intermediate' | 'premium' })}
                      w="full"
                      px={{ base: 5, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="68px"
                      justifyContent="flex-start"
                      bg={formData.budget === budget.value ? "accent.500/20" : "primary.700/50"}
                      borderColor={formData.budget === budget.value ? "accent.500" : "primary.400"}
                      _active={{ bg: formData.budget === budget.value ? "accent.500/30" : "primary.700/60" }}
                    >
                      <Flex align="center" gap={3} w="full">
                        <Flex
                          w={10}
                          h={10}
                          bg={formData.budget === budget.value ? "accent.500/20" : "whiteAlpha.50"}
                          borderRadius="lg"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Icon viewBox="0 0 24 24" w={5} h={5} color={formData.budget === budget.value ? "accent.400" : "whiteAlpha.600"}>
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={budget.icon}
                            />
                          </Icon>
                        </Flex>
                        <Box flex={1}>
                          <Text color="white" fontWeight="semibold" fontSize="base">
                            {budget.label}
                          </Text>
                          <Text color="whiteAlpha.600" fontSize="sm" mt={0.5}>
                            {budget.desc}
                          </Text>
                        </Box>
                      </Flex>
                    </Button>
                  ))}
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
            _active={{ color: "white" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
            minH="48px"
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
            _active={{
              bgGradient: "linear(to-r, accent.600, accent.700)"
            }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            minH="48px"
          >
            {step === totalSteps ? 'Complete Setup' : 'Next →'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
