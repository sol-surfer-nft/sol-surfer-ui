import { NFTItem } from '../types/NFTItem'

export interface NFTBid {
  id: string
  bidPrice: number
  timestamp: any
  bidder: string
  bidCurrency: 'sol' | 'SOL' | 'usdc' | 'USDC'
}

export const nftItems: NFTItem[] = [
  {
    id: "1",
    title: "Nico's Cool NFT",
    owner: "Nico",
    usdcPrice: 50,
    url: "https://source.unsplash.com/random?sig=1"
  },
  {
    id: "2",
    title: "NyonCat OG",
    owner: "User345",
    usdcPrice: 240,
    url: "https://source.unsplash.com/random?sig=2"
  },
  {
    id: "3",
    title: "Surf's Up! Limited Edition NFT Artwork Collectible",
    owner: "SolSurfer",
    usdcPrice: 75,
    url: "https://source.unsplash.com/random?sig=3"
  },
  {
    id: "4",
    title: "Leo D.",
    owner: "Mona Lisa",
    usdcPrice: 500000,
    url: "https://source.unsplash.com/random?sig=4"
  },
  {
    id: "5",
    title: "Hark...",
    owner: "LegitSalt",
    usdcPrice: 1,
    url: "https://source.unsplash.com/random?sig=5"
  },
]

export const nftBids: NFTBid[] = [
  {
    id: "1",
    bidPrice: 50,
    bidCurrency: 'SOL',
    // generates a day between 1 and 10 days in the past
    timestamp: new Date().setDate((new Date().getDate()) - (Math.ceil(Math.random() * 10))),
    bidder: "nico"
  },
  {
    id: "2",
    bidPrice: 125,
    bidCurrency: 'SOL',
    // generates a day between 1 and 10 days in the past
    timestamp: new Date().setDate((new Date().getDate()) - (Math.ceil(Math.random() * 10))),
    bidder: "eric"
  },
  {
    id: "3",
    bidPrice: 500,
    bidCurrency: 'SOL',
    // generates a day between 1 and 10 days in the past
    timestamp: new Date().setDate((new Date().getDate()) - (Math.ceil(Math.random() * 10))),
    bidder: "conor"
  },
]