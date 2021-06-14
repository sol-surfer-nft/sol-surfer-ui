import { LearnItem } from '../types/LearnItem'
import { steps, stepsIdMap } from './steps.data'


const learnItems: LearnItem[] = [
  {
    id: "0",
    lessonTitle: "Getting Started",
    numberOfLessons: steps["0"].length,
    stepId: stepsIdMap["0"],
    internalLink: "/"
  },
  {
    id: "1",
    lessonTitle: "Adding an NFT",
    numberOfLessons: steps["1"].length,
    stepId: stepsIdMap["1"],
    internalLink: "/add-nft"
  },
  {
    id: "2",
    lessonTitle: "Buying NFTs",
    numberOfLessons: steps["2"].length,
    stepId: stepsIdMap["2"],
    internalLink: "/"
  },
  {
    id: "3",
    lessonTitle: "Viewing your NFT Gallery",
    numberOfLessons: steps["3"].length,
    stepId: stepsIdMap["3"],
    internalLink: "/gallery"
  },
  {
    id: "4",
    lessonTitle: "Selling an NFT",
    numberOfLessons: steps["4"].length,
    stepId: stepsIdMap["4"],
    internalLink: "/gallery"
  },
  {
    id: "5",
    lessonTitle: "Connecting your Wallet (coming soon)",
    numberOfLessons: steps["5"].length,
    stepId: stepsIdMap["5"],
  },
  
  {
    id: "6",
    lessonTitle: "Importing an NFT from Ethereum - coming soon",
    numberOfLessons: steps["6"].length,
    stepId: stepsIdMap["6"],
  },
]

export default learnItems