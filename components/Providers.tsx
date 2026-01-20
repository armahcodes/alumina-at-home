'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { NeonAuthUIProvider } from '@neondatabase/auth/react'
import system from '@/lib/theme'
import { QueryProvider } from '@/lib/query-client'
import { authClient } from '@/lib/auth/client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      // @ts-expect-error - Type mismatch due to peer dependency version differences
      authClient={authClient}
      redirectTo="/"
      emailOTP
      credentials={{ forgotPassword: true }}
    >
      <ChakraProvider value={system}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ChakraProvider>
    </NeonAuthUIProvider>
  )
}
