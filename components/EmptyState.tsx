'use client';

import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      py={{ base: 12, sm: 16 }}
      px={4}
      textAlign="center"
    >
      <Flex
        w={{ base: 20, sm: 24 }}
        h={{ base: 20, sm: 24 }}
        bg="primary.600/30"
        borderRadius="full"
        align="center"
        justify="center"
        mb={4}
      >
        {icon}
      </Flex>
      <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
        {title}
      </Heading>
      <Text 
        color="whiteAlpha.600" 
        fontSize={{ base: 'sm', sm: 'base' }} 
        maxW="sm"
        mb={actionLabel ? 6 : 0}
      >
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          px={6}
          py={3}
          bgGradient="linear(to-r, accent.500, accent.600)"
          color="white"
          fontWeight="semibold"
          borderRadius="xl"
          _hover={{
            bgGradient: 'linear(to-r, accent.600, accent.700)',
          }}
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Flex>
  );
}
