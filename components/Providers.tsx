'use client'

import { ChakraProvider } from '@chakra-ui/react'
import system from '@/lib/theme'
import { QueryProvider } from '@/lib/query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ChakraProvider>
  )
}
