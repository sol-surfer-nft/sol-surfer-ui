import { Step } from 'react-joyride'

export interface TourSteps {
  [id: string]: TourStep[]
}
export interface TourStep extends Step {
  internalLink?: string
}
export interface TourProgress {
  [stepKey: string]: TourItem
}

export interface TourItem {
  progress: number
  maxSteps: number
}

export const initialTourProgress = {
  "0": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0
}

export const stepsIdMap = {
  "0": "getting-started",
  "1": "adding-an-nft",
  "2": "viewing-your-nfts",
  "3": "importing-nfts-from-ethereum",
  "4": "selling-nfts",
  "5": "connecting-wallet",
  "6": "buying-nfts",
}

// will all be '/' or '/marketplace for now
// export const stepPathsMap = {
//   "0": "/",
//   "1": "/", // or /add-nft
//   "2": "/", // viewing nfts
//   "3": "importing-your-nfts-from-ethereum",
//   "4": "selling-your-nfts",
//   "5": "connecting-your-wallet",
//   "6": "viewing-your-nfts"
// }

export const steps: TourSteps = {
  "0": [ // getting-started / connecting-wallet
    {
      target: "#tour-1-wallet",
      content: "connect your wallet",
      spotlightClicks: true, // allow user to click elements outside of modal
      disableBeacon: true
    },
    {
      target: "#tour-1-mainnet",
      content: "make sure you are on mainnet if you want the transaction to be real",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#tour-1-learn",
      content: "you can always go to the 'Learn' tab to get more help! FAQ is also helpful",
      spotlightClicks: true,
      disableBeacon: true
    },
  ],
  "1": [ // adding-an-nft
    {
      target: "#tour-1-wallet",
      content: "make sure your wallet is created and connected before continuing",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#tour-2-add-nft",
      content: "click on the 'Add Nft' tab to add your nft",
      spotlightClicks: true,
      disableBeacon: true,
      internalLink: "/add-nft"
    },
    {
      target: "#tour-2-title",
      content: "make sure to give your nft a title!",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#add-nft-price",
      content: "make sure you set a price for your nft, and specify the currency this price should be viewed in next to it.",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#tour-2-upload-image",
      content: "then upload the image of the nft you want to create!",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#add-nft-submit-button",
      content: "then submit the nft form to initiate the transaction to mint your NFT",
      disableBeacon: true
    },
  ],
  "2": [ // viewing-your-nfts
    {
      target: "#tour-1-wallet",
      content: "make sure your wallet is connected before viewing your NFTs",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#tour-3-gallery",
      content: "click the 'Gallery' tab to go to your gallery",
      spotlightClicks: true,
      disableBeacon: true,
      internalLink: "/gallery"
    },
    {
      target: "#tour-3-nft-gallery-list",
      content: "these are all of your nft's. you can sell the ones that aren't already listed, and view the status of nft's you own that are already on sale in the marketplace!",
      disableBeacon: true
    },
  ],
  "3": [ // selling-your-nfts
    {
      target: "#tour-4-nft-gallery-list",
      content: "make sure that you first own nfts so that you are able to sell one",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: ".tour-4-nft-sell-button",
      content: "click the 'sell' button below the nft to get started selling it",
      spotlightClicks: true,
      disableBeacon: true,
      internalLink: "/sell-nft"
    },
    {
      target: "#sell-nft-price",
      content: "set the price you would like to sell your nft for. you can choose 'SOL' or 'USDC'",
      spotlightClicks: true,
      disableBeacon: true
    },
    {
      target: "#submit-sell-nft-form-button",
      content: "click to sell the nft when you're ready",
      disableBeacon: true
    },
  ],
  // TODO: fill in with content
  "4": [
    {
      target: "#root",
      content: "selling-your-nfts",
      disableBeacon: true
    },
  ],
  "5": [
    {
      target: "#root",
      content: "connecting-your-wallet",
      disableBeacon: true
    },
  ],
  "6": [
    {
      target: "#buy-nfts-here",
      content: "here are all of the nfts we have listed. click one to continue",
      spotlightClicks: true,
      placementBeacon: "top",
      disableBeacon: true,
      showSkipButton: false,
      internalLink: "/marketplace/1"
    },
    {
      target: "#buy-nft-button",
      content: "if for sale, you will be able to click this button to buy the nft",
      disableBeacon: true
    },
  ]
}


// Other Notes
// export interface Step {
//   target: string
//   content: string
//   style?: any
// }

//   id: "1",
//   lessonTitle: "Getting Started",
//   numberOfLessons: 4

//   id: "2",
//   lessonTitle: "Adding an NFT",
//   numberOfLessons: 6

//   id: "3",
//   lessonTitle: "Trading NFTs",
//   numberOfLessons: 5

//   id: "4",
//   lessonTitle: "Importing an NFT from Ethereum",
//   numberOfLessons: 4

// Selling an NFT

// Viewing your NFTs

// Getting Help

// Connecting Your Wallet / Connection Details (Advanced)