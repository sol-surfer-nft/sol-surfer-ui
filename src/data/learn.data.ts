import { LearnItem } from '../types/LearnItem'
import { steps } from './steps.data'

const learnItems: LearnItem[] = [
  {
    id: "0",
    lessonTitle: "Getting Started",
    numberOfLessons: steps["0"].length
  },
  {
    id: "1",
    lessonTitle: "Adding an NFT",
    numberOfLessons: steps["1"].length
  },
  // {
  //   id: "4",
  //   lessonTitle: "Selling an NFT",
  //   numberOfLessons: steps["4"].length
  // },
  {
    id: "2",
    lessonTitle: "Trading NFTs - coming soon",
    numberOfLessons: steps["2"].length
  },
  {
    id: "3",
    lessonTitle: "Importing an NFT from Ethereum - coming soon",
    numberOfLessons: steps["3"].length
  },
]

export default learnItems