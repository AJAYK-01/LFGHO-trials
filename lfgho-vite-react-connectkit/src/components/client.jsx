import { createPublicClient, http } from 'viem'
import { sepolia, polygonMumbai } from 'viem/chains'

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
})