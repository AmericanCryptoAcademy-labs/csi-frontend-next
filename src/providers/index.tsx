"use client";
import React, { ReactNode } from 'react'
import { config, projectId } from '@/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()
if (!projectId) throw new Error('Please provide your project ID')

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  enableWalletFeatures: true,
});

function Providers({ children, initalState }: { children: ReactNode; initalState?: State }) {
  return (
    <WagmiProvider config={config} initialState={initalState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers