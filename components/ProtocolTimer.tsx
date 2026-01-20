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
  const circumference = 2 * Math.PI * 110; // radius = 110
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
        bg="rgba(7, 18, 16, 0.95)"
        backdropFilter="blur(20px)"
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
          transition={shouldReduceMotion ? { duration: 0.1 } : { type: 'spring', damping: 15 }}
        >
          <Box textAlign="center">
            <Flex justify="center" mb={6}>
              <Flex
                w={28}
                h={28}
                bg="accent.500/20"
                borderRadius="full"
                align="center"
                justify="center"
                borderWidth="3px"
                borderColor="accent.400"
                boxShadow="0 0 40px rgba(239, 194, 179, 0.3)"
              >
                <Box as={CheckCircle} w={14} h={14} color="accent.400" aria-hidden="true" />
              </Flex>
            </Flex>
            <Heading as="h2" id="celebration-title" size="2xl" color="accent.400" mb={3}>
              Protocol Complete!
            </Heading>
            <Text color="whiteAlpha.800" fontSize="lg" aria-live="polite">+10 points earned</Text>
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
        bg="rgba(7, 18, 16, 0.95)"
        backdropFilter="blur(20px)"
        align="center"
        justify="center"
        p={4}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timer-title"
      >
        <Box maxW="md" w="full">
          <Box
            bg="linear-gradient(135deg, rgba(35, 91, 78, 0.9) 0%, rgba(28, 73, 62, 0.95) 100%)"
            borderWidth="1px"
            borderColor="accent.500/30"
            borderRadius="3xl"
            p={{ base: 6, sm: 8 }}
            position="relative"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(239, 194, 179, 0.1)"
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              position="absolute"
              top={4}
              right={4}
              w={11}
              h={11}
              minW={11}
              bg="whiteAlpha.100"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              color="whiteAlpha.700"
              _hover={{ color: "white", bg: "whiteAlpha.200", borderColor: "accent.400" }}
              _active={{ transform: "scale(0.95)" }}
              aria-label="Close timer"
              borderRadius="full"
              transition="all 0.2s"
            >
              <Box as={X} w={5} h={5} aria-hidden="true" />
            </Button>

            {/* Protocol Name */}
            <Heading 
              as="h2" 
              id="timer-title" 
              size={{ base: "lg", sm: "xl" }} 
              color="white" 
              mb={{ base: 6, sm: 8 }} 
              textAlign="center"
              pr={8}
            >
              {protocolName}
            </Heading>

            {/* Timer Circle */}
            <Box position="relative" w={{ base: 56, sm: 64 }} h={{ base: 56, sm: 64 }} mx="auto" mb={{ base: 6, sm: 8 }} role="timer" aria-live="off">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 240 240"
                style={{ transform: 'rotate(-90deg)' }} 
                aria-hidden="true"
              >
                {/* Background circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="110"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="110"
                  stroke="url(#timerGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ 
                    transition: shouldReduceMotion ? 'none' : 'stroke-dashoffset 1s ease-out',
                  }}
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EFC2B3" />
                    <stop offset="100%" stopColor="#EA9B82" />
                  </linearGradient>
                </defs>
              </svg>
              <Center position="absolute" inset={0}>
                <Text 
                  fontSize={{ base: "5xl", sm: "6xl" }} 
                  fontWeight="bold" 
                  color="white" 
                  fontFamily="mono"
                  letterSpacing="wider"
                  aria-label={`Time remaining: ${formatTime(timeLeft)}`}
                >
                  {formatTime(timeLeft)}
                </Text>
              </Center>
            </Box>

            {/* Controls */}
            <Flex align="center" justify="center" gap={{ base: 3, sm: 4 }}>
              <Button
                onClick={resetTimer}
                w={{ base: 12, sm: 14 }}
                h={{ base: 12, sm: 14 }}
                minW={{ base: 12, sm: 14 }}
                bg="whiteAlpha.100"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                borderRadius="full"
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "whiteAlpha.200", borderColor: "accent.400" }}
                _active={{ transform: "scale(0.95)" }}
                aria-label="Reset timer"
                transition="all 0.2s"
              >
                <Box as={RotateCcw} w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }} />
              </Button>

              <Button
                onClick={toggleTimer}
                w={{ base: 18, sm: 20 }}
                h={{ base: 18, sm: 20 }}
                minW={{ base: 18, sm: 20 }}
                bgGradient="linear(to-br, accent.400, accent.600)"
                borderRadius="full"
                color="white"
                boxShadow="0 10px 30px -5px rgba(239, 194, 179, 0.4)"
                _hover={{ transform: "scale(1.05)", boxShadow: "0 15px 40px -5px rgba(239, 194, 179, 0.5)" }}
                _active={{ transform: "scale(0.98)" }}
                transition="all 0.2s"
                aria-label={isRunning ? "Pause timer" : "Start timer"}
              >
                {isRunning ? (
                  <Box as={Pause} w={{ base: 8, sm: 10 }} h={{ base: 8, sm: 10 }} />
                ) : (
                  <Box as={Play} w={{ base: 8, sm: 10 }} h={{ base: 8, sm: 10 }} ml={1} />
                )}
              </Button>

              <Button
                onClick={() => setTimeLeft(Math.max(0, timeLeft - 60))}
                w={{ base: 12, sm: 14 }}
                h={{ base: 12, sm: 14 }}
                minW={{ base: 12, sm: 14 }}
                bg="whiteAlpha.100"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                borderRadius="full"
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "whiteAlpha.200", borderColor: "accent.400" }}
                _active={{ transform: "scale(0.95)" }}
                aria-label="Skip 1 minute"
                transition="all 0.2s"
              >
                <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="semibold">
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
