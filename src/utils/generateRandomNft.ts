import { NFTItem } from '../types/NFTItem'

export const generateRandomNft = (nftItemLength: number) => {
  let isUsdc = Math.random() >= 0.5;
  return {
    id: (nftItemLength + 1).toString(),
    title: getRandomTitle(nftItemLength),
    owner: getRandomOwner(nftItemLength),
    url: "https://source.unsplash.com/random?sig=" + (nftItemLength + 1).toString(),
    currency: isUsdc ? "usdc" : "sol",
    price: isUsdc ? undefined : generateRandomSolPrice(),
    usdcPrice: isUsdc ? generateRandomUsdcPrice() : undefined
  } as NFTItem
}

const getRandomTitle = (length: number) => {
  return `Crypto Kittie #${length}`
}

const getRandomOwner = (length: number) => {
  return `CyberPunk #${length}${length + 1}${length + 2}${length + 3}`
}

// generates random price between 1 - 100
const generateRandomSolPrice = () => {
  let base = 100
  return Math.floor(Math.random() * (Math.floor(Math.random() * base)))
}

// generates random price between 400 - 6400
const generateRandomUsdcPrice = () => {
  let multiplier = 16;
  let base = 400
  return Math.floor(Math.random() * ((Math.floor(Math.random() * base) * multiplier)))
}
