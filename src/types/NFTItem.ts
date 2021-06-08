export interface NFTItem {
  id: string
  title: string
  owner: string
  price?: number
  usdcPrice?: number
  description?: string
  url?: string
  currency?: 'sol' | "SOL" | 'usdc' | 'USDC'
}

// Use to define the nft data in the smart contract
export interface NFTContractItem {
  nftId: string
}