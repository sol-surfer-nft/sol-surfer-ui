import { LearnItem } from '../types/LearnItem'
import { steps, /*stepsIdMap*/ } from './steps.data'

export const lessonIdMap = {
  "0": "getting-started",
  "1": "adding-an-nft",
  "2": "buying-nfts", // viewing-your-nfts in stepsMap
  "3": "importing-nfts-from-ethereum", // selling-nfts in stepsMap
  "4": "selling-nfts",
  "5": "connecting-wallet",
  "6": "viewing-your-nfts" // or 'viewing-your-gallery'
}

const learnItems: LearnItem[] = [
  {
    id: "0",
    lessonTitle: "Getting Started",
    numberOfLessons: steps["0"].length,
    stepId: lessonIdMap["0"],
  },
  {
    id: "1",
    lessonTitle: "Adding an NFT",
    numberOfLessons: steps["1"].length,
    stepId: lessonIdMap["1"],
  },
  {
    id: "2",
    lessonTitle: "Buying NFTs - coming soon",
    numberOfLessons: steps["2"].length,
    stepId: lessonIdMap["2"],

  },
  {
    id: "3",
    lessonTitle: "Importing an NFT from Ethereum - coming soon",
    numberOfLessons: steps["3"].length,
    stepId: lessonIdMap["3"],

  },
  {
    id: "4",
    lessonTitle: "Selling an NFT",
    numberOfLessons: steps["4"].length,
    stepId: lessonIdMap["4"],
  },
  {
    id: "5",
    lessonTitle: "Connecting your Wallet",
    numberOfLessons: steps["5"].length,
    stepId: lessonIdMap["5"],
  },
  {
    id: "6",
    lessonTitle: "Viewing your NFT Gallery",
    numberOfLessons: steps["6"].length,
    stepId: lessonIdMap["6"],
  }
]

export default learnItems