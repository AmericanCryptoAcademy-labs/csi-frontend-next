import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const projectId = process.env.WALLET_CONNECT_PROJECT_ID;
if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'CSI LCerts',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})