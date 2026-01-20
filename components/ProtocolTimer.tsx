'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box, Flex, Heading, Text, Button, Center } from '@chakra-ui/react';
import { X, RotateCcw, Play, Pause, CheckCircle } from 'lucide-react';
import FocusTrap from './FocusTrap';

interface ProtocolTimerProps {
  protocolName: string;
  duration: number; // in seconds
  onComplete: () => void;
  onClose: () => void;
}

export default function ProtocolTimer({ protocolName, duration, onComplete, onClose }: ProtocolTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowCelebration(true);
            // Play completion sound
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            setTimeout(() => {
              onComplete();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  if (showCelebration) {
    return (
      <Flex
        position="fixed"
        inset={0}
        zIndex={50}
        bg="rgba(16, 36, 46, 0.98)"
        backdropFilter="blur(16px)"
        align="center"
        justify="center"
        p={4}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
      >
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : undefined}
        >
          <Box textAlign="center">
            <Flex justify="center" mb={4}>
              <Flex
                w={24}
                h={24}
                bg="accent.500/20"
                borderRadius="full"
                align="center"
                justify="center"
                borderWidth="3px"
                borderColor="accent.400"
              >
                <Box as={CheckCircle} w={12} h={12} color="accent.400" aria-hidden="true" />
              </Flex>
            </Flex>
            <Heading as="h2" id="celebration-title" size="2xl" color="accent.400" mb={2}>
              Protocol Complete!
            </Heading>
            <Text color="whiteAlpha.700" aria-live="polite">+10 points earned</Text>
          </Box>
        </motion.div>
      </Flex>
    );
  }

  return (
    <FocusTrap
      active={true}
      focusTrapOptions={{
        onDeactivate: onClose,
        clickOutsideDeactivates: false,
        escapeDeactivates: true,
      }}
    >
      <Flex
        position="fixed"
        inset={0}
        zIndex={50}
        bg="rgba(16, 36, 46, 0.98)"
        backdropFilter="blur(16px)"
        align="center"
        justify="center"
        p={4}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timer-title"
      >
        <Box maxW="md" w="full">
          <Box
            bg="primary.600"
            borderWidth="1px"
            borderColor="primary.400"
            borderRadius="2xl"
            p={8}
            position="relative"
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              position="absolute"
              top={4}
              right={4}
              w={10}
              h={10}
              minW={10}
              variant="ghost"
              color="whiteAlpha.600"
              _hover={{ color: "white", bg: "primary.500" }}
              aria-label="Close timer"
              borderRadius="full"
            >
              <Box as={X} w={6} h={6} aria-hidden="true" />
            </Button>

            {/* Protocol Name */}
            <Heading as="h2" id="timer-title" size="xl" color="white" mb={8} textAlign="center">
              {protocolName}
            </Heading>

            {/* Timer Circle */}
            <Box position="relative" w={64} h={64} mx="auto" mb={8} role="timer" aria-live="off">
              <svg className="transform -rotate-90 w-64 h-64" style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  color="var(--chakra-colors-primary-500)"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progress * 7.54} 754`}
                  color="var(--chakra-colors-accent-400)"
                  style={{ transition: shouldReduceMotion ? 'none' : 'all 1s' }}
                />
              </svg>
              <Center position="absolute" inset={0}>
                <Text fontSize="6xl" fontWeight="bold" color="white" aria-label={`Time remaining: ${formatTime(timeLeft)}`}>
                  {formatTime(timeLeft)}
                </Text>
              </Center>
            </Box>

            {/* Controls */}
            <Flex align="center" justify="center" gap={4}>
              <Button
                onClick={resetTimer}
                w={14}
                h={14}
                minW={14}
                bg="primary.500"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="full"
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "primary.400" }}
                aria-label="Reset timer"
              >
                <Box as={RotateCcw} w={6} h={6} />
              </Button>

              <Button
                onClick={toggleTimer}
                w={20}
                h={20}
                minW={20}
                bgGradient="linear(to-r, accent.500, accent.600)"
                borderRadius="full"
                color="white"
                boxShadow="lg"
                _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
                _active={{ transform: "scale(0.98)" }}
                transition="all 0.2s"
                aria-label={isRunning ? "Pause timer" : "Start timer"}
              >
                {isRunning ? (
                  <Box as={Pause} w={10} h={10} />
                ) : (
                  <Box as={Play} w={10} h={10} ml={1} />
                )}
              </Button>

              <Button
                onClick={() => setTimeLeft(Math.max(0, timeLeft - 60))}
                w={14}
                h={14}
                minW={14}
                bg="primary.500"
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="full"
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "primary.400" }}
                aria-label="Skip 1 minute"
              >
                <Text fontSize="sm" fontWeight="semibold">
                  -1m
                </Text>
              </Button>
            </Flex>

            {/* Progress Text */}
            <Text textAlign="center" color="whiteAlpha.600" fontSize="sm" mt={6} aria-live="polite">
              {isRunning ? 'Timer running...' : 'Press play to start'}
            </Text>
          </Box>
        </Box>

        {/* Audio element for completion sound */}
        <audio ref={audioRef} src="/sounds/complete.mp3" />
      </Flex>
    </FocusTrap>
  );
}
