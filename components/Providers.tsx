'use client'

import { ChakraProvider } from '@chakra-ui/react'
import system from '@/lib/theme'
import { QueryProvider } from '@/lib/query-client'
import UserDataSync from '@/components/UserDataSync'
import { useAuth } from '@/lib/hooks/useAuth'

function UserDataSyncGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return (
    <>
      <UserDataSync userId={user?.id ?? null} />
      {children}
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <QueryProvider>
        <UserDataSyncGate>{children}</UserDataSyncGate>
      </QueryProvider>
    </ChakraProvider>
  )
}
