'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStoreDb } from '@/lib/store-db';
import { useTodayTasks, useCompleteTask, useUserStats } from '@/lib/hooks/useUserData';
import ProtocolTimer from './ProtocolTimer';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Spinner
} from '@chakra-ui/react';
import { Flame, Star, Trophy, CheckCircle, type LucideIcon } from 'lucide-react';

export default function DashboardWithQuery() {
  const { userId } = useStoreDb();
  const { data: tasksData, isLoading: tasksLoading } = useTodayTasks(userId);
  const { data: stats } = useUserStats(userId);
  const completeTaskMutation = useCompleteTask(userId || '');
  
  const [activeTimer, setActiveTimer] = useState<{ id: string; name: string; duration: number } | null>(null);

  const completedTaskIds = tasksData?.map((t: { taskId: string }) => t.taskId) || [];

  const todayProtocols = [
    { id: 'morning-light', title: 'Morning Light Exposure', time: '6:30 AM', duration: 15, durationStr: '15 min', category: 'circadian' },
    { id: 'cold-shower', title: 'Cold Shower', time: '7:00 AM', duration: 3, durationStr: '3 min', category: 'contrast' },
    { id: 'breathwork', title: 'Breathwork Session', time: '7:15 AM', duration: 10, durationStr: '10 min', category: 'restoration' },
    { id: 'morning-supps', title: 'Morning Supplements', time: '8:00 AM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'movement', title: 'Movement Practice', time: '5:00 PM', duration: 30, durationStr: '30 min', category: 'movement' },
    { id: 'evening-supps', title: 'Evening Supplements', time: '7:00 PM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'wind-down', title: 'Evening Wind-Down', time: '9:00 PM', duration: 20, durationStr: '20 min', category: 'restoration' },
  ];

  const startTimer = (protocol: typeof todayProtocols[0]) => {
    setActiveTimer({
      id: protocol.id,
      name: protocol.title,
      duration: protocol.duration * 60
    });
  };

  const handleToggleTask = async (protocol: typeof todayProtocols[0]) => {
    if (!userId || completedTaskIds.includes(protocol.id)) return;

    await completeTaskMutation.mutateAsync({
      taskId: protocol.id,
      taskName: protocol.title,
      taskCategory: protocol.category,
      pointsEarned: 10
    });
  };

  const completionRate = Math.round((completedTaskIds.length / todayProtocols.length) * 100);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  if (tasksLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="accent.400" />
      </Flex>
    );
  }

  return (
    <>
      {/* Timer Modal */}
      {activeTimer && (
        <ProtocolTimer
          protocolName={activeTimer.name}
          duration={activeTimer.duration}
          onComplete={() => {
            handleToggleTask(todayProtocols.find(p => p.id === activeTimer.id)!);
            setActiveTimer(null);
          }}
          onClose={() => setActiveTimer(null)}
        />
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            bgGradient="linear(to-br, accent.500, accent.600)"
            opacity={0.1}
            borderWidth="1px"
            borderColor="accent.500"
            borderRadius="2xl"
            p={{ base: 5, sm: 6, lg: 8 }}
          >
            <Heading as="h2" size={{ base: "lg", sm: "xl", lg: "2xl" }} color="white" mb={1}>
              Good {getTimeOfDay()}!
            </Heading>
            <Text color="accent.200" opacity={0.7} fontSize={{ base: "sm", sm: "base" }} mb={{ base: 4, sm: 5 }}>
              Your longevity journey continues
            </Text>

            {/* Progress Ring */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Flex align="center" gap={{ base: 4, sm: 6 }}>
                <Box position="relative" w={{ base: 20, sm: 24 }} h={{ base: 20, sm: 24 }}>
                  <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="#EFC2B3"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionRate / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                  </svg>
                  <Flex
                    position="absolute"
                    inset="0"
                    align="center"
                    justify="center"
                    flexDir="column"
                  >
                    <Text color="white" fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold">
                      {completionRate}%
                    </Text>
                  </Flex>
                </Box>

                <Box>
                  <Text color="white" fontSize={{ base: "base", sm: "lg" }} fontWeight="semibold" mb={1}>
                    Daily Progress
                  </Text>
                  <Text color="whiteAlpha.600" fontSize={{ base: "xs", sm: "sm" }}>
                    {completedTaskIds.length} of {todayProtocols.length} protocols
                  </Text>
                </Box>
              </Flex>
            </motion.div>
          </Box>
        </motion.div>

        {/* Quick Stats */}
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={{ base: 4, sm: 5 }}>
          {[
            { label: 'Current Streak', value: `${stats?.currentStreak || 0} days`, icon: Flame, color: 'orange.400' },
            { label: 'Total Points', value: (stats?.totalPoints || 0).toLocaleString(), icon: Star, color: 'yellow.400' },
            { label: 'Level', value: `${stats?.level || 1}`, icon: Trophy, color: 'accent.400' },
            { label: 'Completed', value: `${completedTaskIds.length}/${todayProtocols.length}`, icon: CheckCircle, color: 'green.400' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <Box
                bg="primary.800"
                borderWidth="1px"
                borderColor="primary.700"
                borderRadius="xl"
                p={{ base: 4, sm: 5 }}
              >
                <Text color="whiteAlpha.500" fontSize="xs" mb={2}>
                  {stat.label}
                </Text>
                <Flex align="center" gap={2}>
                  <Box as={stat.icon} w={6} h={6} color={stat.color} />
                  <Text color="white" fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold">
                    {stat.value}
                  </Text>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </Grid>

        {/* Today's Protocols */}
        <Box>
          <Heading as="h3" size="lg" color="white" mb={4}>
            Today&apos;s Protocols
          </Heading>

          <Flex flexDir="column" gap={3}>
            {todayProtocols.map((protocol, idx) => {
              const isCompleted = completedTaskIds.includes(protocol.id);

              return (
                <motion.div
                  key={protocol.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Box
                    bg={isCompleted ? 'green.900' : 'primary.800'}
                    opacity={isCompleted ? 0.3 : 0.5}
                    borderWidth="1px"
                    borderColor={isCompleted ? 'green.700' : 'primary.700'}
                    borderRadius="xl"
                    p={{ base: 4, sm: 5 }}
                    cursor="pointer"
                    onClick={() => !isCompleted && handleToggleTask(protocol)}
                    _hover={{
                      opacity: 0.7,
                      borderColor: isCompleted ? 'green.600' : 'accent.500'
                    }}
                    transition="all 0.2s"
                  >
                    <Flex justify="space-between" align="center" gap={4}>
                      <Flex align="center" gap={3} flex="1">
                        <Box
                          w={{ base: 8, sm: 10 }}
                          h={{ base: 8, sm: 10 }}
                          borderRadius="full"
                          border="2px solid"
                          borderColor={isCompleted ? 'green.400' : 'whiteAlpha.400'}
                          bg={isCompleted ? 'green.400' : 'transparent'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {isCompleted && <Text color="white" fontWeight="bold">✓</Text>}
                        </Box>

                        <Box flex="1">
                          <Text
                            color="white"
                            fontSize={{ base: "base", sm: "lg" }}
                            fontWeight="semibold"
                            textDecoration={isCompleted ? 'line-through' : 'none'}
                          >
                            {protocol.title}
                          </Text>
                          <Flex gap={2} mt={1} flexWrap="wrap">
                            <Text color="whiteAlpha.500" fontSize="xs">
                              {protocol.time}
                            </Text>
                            <Badge size="sm" colorScheme="accent">
                              {protocol.durationStr}
                            </Badge>
                          </Flex>
                        </Box>
                      </Flex>

                      {!isCompleted && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            startTimer(protocol);
                          }}
                          bg="accent.500"
                          color="white"
                          _hover={{ bg: 'accent.600' }}
                        >
                          Start
                        </Button>
                      )}
                    </Flex>
                  </Box>
                </motion.div>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

