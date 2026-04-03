'use client';

import { Button, type ButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

/**
 * Primary CTA — Chakra v3: avoid bgGradient + color="white" on Button (broken/low-contrast).
 */
export const AccentButton = forwardRef<HTMLButtonElement, ButtonProps>(function AccentButton(props, ref) {
  return (
    <Button
      ref={ref}
      variant="plain"
      bg="accent.500"
      color="primary.900"
      borderWidth="1px"
      borderColor="accent.600"
      fontWeight="semibold"
      boxShadow="0 4px 18px rgba(7, 18, 16, 0.25)"
      _hover={{ bg: 'accent.400' }}
      _active={{ bg: 'accent.600' }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'accent.400',
        outlineOffset: '2px',
      }}
      {...props}
    />
  );
});
