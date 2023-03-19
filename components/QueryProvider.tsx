'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
})

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CookiesProvider>
  )
}
