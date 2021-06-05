export interface NFTItem {
  id: string
  title: string
  owner: string
  price?: number
  usdcPrice?: number
  description?: string
  url?: string
}

// Use to define the nft data in the smart contract
export interface NFTContractItem {
  nftId: string
}