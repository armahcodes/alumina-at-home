'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  Minimize2,
  Maximize2,
} from 'lucide-react';

/**
 * Alumina Assistant - Floating AI Chat Component
 * 
 * Based on: https://mastra.ai/guides/v1/getting-started/next-js
 * Uses @ai-sdk/react useChat() hook with Mastra backend
 */
export default function AluminaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // useChat hook from @ai-sdk/react - connects to /api/chat
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle opening chat
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  // Send message using AI SDK
  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    sendMessage({ text: inputValue.trim() });
    setInputValue('');
  };

  // Quick action suggestions
  const quickActions = [
    "What protocol should I do next?",
    "Tell me about cold exposure",
    "Best supplements for sleep?",
    "How can I improve my energy?",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              zIndex: 1000,
            }}
          >
            <Button
              onClick={handleOpen}
              aria-label="Open Alumina Assistant"
              w="60px"
              h="60px"
              borderRadius="full"
              bgGradient="linear(to-br, accent.500, accent.600)"
              color="white"
              boxShadow="0 4px 20px rgba(239, 194, 179, 0.4)"
              _hover={{
                bgGradient: 'linear(to-br, accent.600, accent.700)',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 24px rgba(239, 194, 179, 0.5)',
              }}
              _active={{ transform: 'scale(0.95)' }}
              transition="all 0.2s"
            >
              <Box as={Sparkles} w={6} h={6} />
            </Button>
            
            {/* Pulse animation */}
            <Box
              position="absolute"
              inset={0}
              borderRadius="full"
              bg="accent.500"
              opacity={0.3}
              animation="ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
              pointerEvents="none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 1001,
              width: isMinimized ? '300px' : '380px',
              maxWidth: 'calc(100vw - 40px)',
            }}
          >
            <Box
              bg="rgba(7, 18, 16, 0.95)"
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="accent.500/30"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              h={isMinimized ? 'auto' : '500px'}
              maxH="calc(100vh - 120px)"
            >
              {/* Header */}
              <Flex
                align="center"
                justify="space-between"
                px={4}
                py={3}
                borderBottom="1px solid"
                borderColor="whiteAlpha.100"
                bgGradient="linear(to-r, accent.500/10, transparent)"
              >
                <Flex align="center" gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bg="accent.500/20"
                    borderRadius="full"
                    align="center"
                    justify="center"
                  >
                    <Box as={Sparkles} w={5} h={5} color="accent.400" />
                  </Flex>
                  <Box>
                    <Heading as="h3" size="sm" color="white">
                      Alumina Assistant
                    </Heading>
                    <Flex align="center" gap={1}>
                      <Box w={2} h={2} bg="green.400" borderRadius="full" />
                      <Text fontSize="xs" color="whiteAlpha.600">Online</Text>
                    </Flex>
                  </Box>
                </Flex>
                
                <Flex gap={1}>
                  <Button
                    onClick={() => setIsMinimized(!isMinimized)}
                    aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                    size="sm"
                    variant="ghost"
                    color="whiteAlpha.600"
                    _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                    p={2}
                  >
                    <Box as={isMinimized ? Maximize2 : Minimize2} w={4} h={4} />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    size="sm"
                    variant="ghost"
                    color="whiteAlpha.600"
                    _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                    p={2}
                  >
                    <Box as={X} w={4} h={4} />
                  </Button>
                </Flex>
              </Flex>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <Box
                    flex={1}
                    overflowY="auto"
                    px={4}
                    py={3}
                    css={{
                      '&::-webkit-scrollbar': { width: '4px' },
                      '&::-webkit-scrollbar-track': { background: 'transparent' },
                      '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '4px' },
                    }}
                  >
                    {messages.length === 0 && !isLoading && (
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        h="full"
                        textAlign="center"
                        py={8}
                      >
                        <Flex
                          w={16}
                          h={16}
                          bg="accent.500/20"
                          borderRadius="full"
                          align="center"
                          justify="center"
                          mb={4}
                        >
                          <Box as={Sparkles} w={8} h={8} color="accent.400" />
                        </Flex>
                        <Heading as="h4" size="sm" color="white" mb={2}>
                          Hi, I&apos;m Alumina
                        </Heading>
                        <Text fontSize="sm" color="whiteAlpha.600" mb={4}>
                          Your personal longevity assistant
                        </Text>
                      </Flex>
                    )}

                    {messages.map((message) => (
                      <Flex
                        key={message.id}
                        justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                        mb={3}
                      >
                        <Flex
                          maxW="85%"
                          gap={2}
                          flexDir={message.role === 'user' ? 'row-reverse' : 'row'}
                        >
                          <Flex
                            w={7}
                            h={7}
                            bg={message.role === 'user' ? 'primary.600' : 'accent.500/20'}
                            borderRadius="full"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box
                              as={message.role === 'user' ? User : Bot}
                              w={4}
                              h={4}
                              color={message.role === 'user' ? 'whiteAlpha.700' : 'accent.400'}
                            />
                          </Flex>
                          <Box
                            bg={message.role === 'user' ? 'accent.500/20' : 'primary.600/50'}
                            borderRadius="xl"
                            borderTopRightRadius={message.role === 'user' ? 'sm' : 'xl'}
                            borderTopLeftRadius={message.role === 'assistant' ? 'sm' : 'xl'}
                            px={3}
                            py={2}
                          >
                            {message.parts?.map((part, i) => {
                              if (part.type === 'text') {
                                return (
                                  <Text
                                    key={i}
                                    fontSize="sm"
                                    color={message.role === 'user' ? 'accent.200' : 'whiteAlpha.900'}
                                    whiteSpace="pre-wrap"
                                  >
                                    {part.text}
                                  </Text>
                                );
                              }
                              return null;
                            })}
                          </Box>
                        </Flex>
                      </Flex>
                    ))}

                    {isLoading && (
                      <Flex justify="flex-start" mb={3}>
                        <Flex gap={2}>
                          <Flex
                            w={7}
                            h={7}
                            bg="accent.500/20"
                            borderRadius="full"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Box as={Bot} w={4} h={4} color="accent.400" />
                          </Flex>
                          <Box
                            bg="primary.600/50"
                            borderRadius="xl"
                            borderTopLeftRadius="sm"
                            px={4}
                            py={3}
                          >
                            <Flex gap={1}>
                              <Box w={2} h={2} bg="whiteAlpha.400" borderRadius="full" animation="bounce 1s infinite" />
                              <Box w={2} h={2} bg="whiteAlpha.400" borderRadius="full" animation="bounce 1s infinite 0.2s" />
                              <Box w={2} h={2} bg="whiteAlpha.400" borderRadius="full" animation="bounce 1s infinite 0.4s" />
                            </Flex>
                          </Box>
                        </Flex>
                      </Flex>
                    )}

                    <div ref={messagesEndRef} />
                  </Box>

                  {/* Quick Actions */}
                  {messages.length === 0 && !isLoading && (
                    <Flex
                      gap={2}
                      px={4}
                      pb={2}
                      overflowX="auto"
                      css={{
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                      }}
                    >
                      {quickActions.map((action, idx) => (
                        <Badge
                          key={idx}
                          as="button"
                          onClick={() => {
                            setInputValue(action);
                            inputRef.current?.focus();
                          }}
                          px={3}
                          py={1.5}
                          bg="primary.600/50"
                          color="whiteAlpha.700"
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="normal"
                          cursor="pointer"
                          whiteSpace="nowrap"
                          _hover={{ bg: 'primary.600/70', color: 'white' }}
                          transition="all 0.2s"
                        >
                          {action}
                        </Badge>
                      ))}
                    </Flex>
                  )}

                  {/* Input */}
                  <Flex
                    px={4}
                    py={3}
                    borderTop="1px solid"
                    borderColor="whiteAlpha.100"
                    gap={2}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Ask me anything..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading}
                      style={{
                        flex: 1,
                        background: 'rgba(35, 91, 78, 0.3)',
                        border: '1px solid rgba(35, 91, 78, 0.5)',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                      className="chat-input"
                    />
                    <Button
                      onClick={handleSendMessage}
                      aria-label="Send message"
                      w={10}
                      h={10}
                      borderRadius="xl"
                      bg={inputValue.trim() ? 'accent.500' : 'primary.600'}
                      color="white"
                      _hover={{
                        bg: inputValue.trim() ? 'accent.600' : 'primary.500',
                      }}
                      _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                      disabled={!inputValue.trim() || isLoading}
                      transition="all 0.2s"
                    >
                      {isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Box as={Send} w={4} h={4} />
                      )}
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .chat-input:focus {
          border-color: rgba(239, 194, 179, 0.5);
          box-shadow: 0 0 0 2px rgba(239, 194, 179, 0.2);
        }
        .chat-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
