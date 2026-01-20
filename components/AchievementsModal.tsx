'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  Button
} from '@chakra-ui/react';
import { X, Check, Trophy, Flame, Target, Zap, Snowflake, Users, Clock, Star } from 'lucide-react';
import FocusTrap from './FocusTrap';
import { LucideIcon } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const achievements: Achievement[] = [
    {
      id: 'first-day',
      title: 'First Steps',
      description: 'Complete your first day of protocols',
      icon: Trophy,
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      points: 50
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      unlocked: false,
      points: 100
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day streak',
      icon: Target,
      unlocked: false,
      points: 300
    },
    {
      id: 'streak-90',
      title: 'Quarterly Champion',
      description: 'Maintain a 90-day streak',
      icon: Star,
      unlocked: false,
      points: 1000
    },
    {
      id: 'all-protocols',
      title: 'Protocol Perfectionist',
      description: 'Complete all daily protocols in one day',
      icon: Check,
      unlocked: false,
      points: 150
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Complete morning protocol before 7 AM',
      icon: Zap,
      unlocked: false,
      points: 75
    },
    {
      id: 'cold-plunge-10',
      title: 'Ice Warrior',
      description: 'Complete 10 cold exposure sessions',
      icon: Snowflake,
      unlocked: false,
      points: 200
    },
    {
      id: 'community-engage',
      title: 'Community Champion',
      description: 'Help 5 members in the community',
      icon: Users,
      unlocked: false,
      points: 250
    },
    {
      id: 'bio-age-reverse',
      title: 'Time Traveler',
      description: 'Reverse your biological age by 5+ years',
      icon: Clock,
      unlocked: false,
      points: 500
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            onDeactivate: onClose,
            clickOutsideDeactivates: true,
            escapeDeactivates: true,
          }}
        >
          <Flex
            position="fixed"
            inset={0}
            zIndex={50}
            align={{ base: "flex-end", sm: "center" }}
            justify="center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievements-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(16, 36, 46, 0.95)',
                backdropFilter: 'blur(16px)'
              }}
            />

            {/* Modal */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: '100%' }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { type: 'spring', damping: 25, stiffness: 300 }}
            >
              <Box
                position="relative"
                w="full"
                maxW="2xl"
                maxH={{ base: "90vh", sm: "80vh" }}
                bg="primary.600"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius={{ base: "2xl 2xl 0 0", sm: "2xl" }}
                overflow="hidden"
                m={{ sm: 4 }}
              >
                {/* Close Button */}
                <Button
                  onClick={onClose}
                  position="absolute"
                  top={3}
                  right={3}
                  zIndex={10}
                  minW="44px"
                  minH="44px"
                  w={11}
                  h={11}
                  aria-label="Close achievements modal"
                  bg="primary.500"
                  borderRadius="full"
                  color="whiteAlpha.700"
                  _hover={{ color: "white", bg: "primary.400" }}
                  _active={{ color: "white" }}
                >
                  <Box as={X} w={6} h={6} />
                </Button>

                {/* Header */}
                <Box p={{ base: 4, sm: 6 }} borderBottomWidth="1px" borderColor="primary.500">
                  <Heading as="h2" id="achievements-modal-title" size={{ base: "xl", sm: "2xl" }} color="white" mb={2}>
                    Achievements
                  </Heading>
                  <Flex align="center" gap={{ base: 3, sm: 4 }} fontSize={{ base: "xs", sm: "sm" }}>
                    <Flex align="center" gap={2}>
                      <Text color="whiteAlpha.600">Unlocked:</Text>
                      <Text color="accent.400" fontWeight="semibold">
                        {unlockedCount}/{achievements.length}
                      </Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Text color="whiteAlpha.600">Total Points:</Text>
                      <Text color="accent.400" fontWeight="semibold">
                        {totalPoints}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                {/* Achievements Grid */}
                <Box
                  p={{ base: 4, sm: 6 }}
                  overflowY="auto"
                  maxH={{ base: "calc(90vh - 140px)", sm: "calc(80vh - 140px)" }}
                >
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                    {achievements.map((achievement) => {
                      const IconComponent = achievement.icon;
                      return (
                        <Box
                          key={achievement.id}
                          p={{ base: 3.5, sm: 4 }}
                          borderRadius="xl"
                          borderWidth="1px"
                          transition="all 0.2s"
                          bg={achievement.unlocked ? "accent.500/15" : "primary.700/50"}
                          borderColor={achievement.unlocked ? "accent.500" : "primary.500"}
                          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                        >
                          <Flex align="flex-start" gap={{ base: 2.5, sm: 3 }}>
                            <Flex
                              align="center"
                              justify="center"
                              w={14}
                              h={14}
                              borderRadius="xl"
                              borderWidth="1px"
                              bg={achievement.unlocked ? "accent.500/20" : "primary.600"}
                              borderColor={achievement.unlocked ? "accent.500" : "primary.400"}
                              flexShrink={0}
                            >
                              <Box
                                as={IconComponent}
                                w={6}
                                h={6}
                                color={achievement.unlocked ? "accent.400" : "whiteAlpha.400"}
                              />
                            </Flex>
                            <Box flex={1}>
                              <Heading
                                as="h3"
                                size="sm"
                                mb={1}
                                color={achievement.unlocked ? "white" : "whiteAlpha.500"}
                              >
                                {achievement.title}
                              </Heading>
                              <Text
                                fontSize="sm"
                                mb={2}
                                color={achievement.unlocked ? "whiteAlpha.700" : "whiteAlpha.400"}
                              >
                                {achievement.description}
                              </Text>
                              <Flex align="center" gap={2}>
                                <Text
                                  fontSize="xs"
                                  fontWeight="semibold"
                                  color={achievement.unlocked ? "accent.400" : "whiteAlpha.400"}
                                >
                                  +{achievement.points} points
                                </Text>
                                {achievement.unlocked && achievement.unlockedAt && (
                                  <Text fontSize="xs" color="whiteAlpha.400">
                                    • {new Date(achievement.unlockedAt).toLocaleDateString()}
                                  </Text>
                                )}
                              </Flex>
                            </Box>
                            {achievement.unlocked && (
                              <Flex
                                w={8}
                                h={8}
                                bg="accent.500"
                                borderRadius="full"
                                align="center"
                                justify="center"
                                flexShrink={0}
                              >
                                <Box as={Check} w={5} h={5} color="white" strokeWidth={3} />
                              </Flex>
                            )}
                          </Flex>
                        </Box>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </motion.div>
          </Flex>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
