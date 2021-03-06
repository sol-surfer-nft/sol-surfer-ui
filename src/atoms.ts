import { atom } from 'recoil'
import { nftItems } from './data/marketplace.data'
import { steps, initialTourProgress } from './data/steps.data'

export const darkModeState = atom({
  key: 'isDarkMode',
  default: true
})

export const nftItemsState = atom({
  key: 'nftItems',
  default: nftItems
})

export const nftGalleryItemsState = atom({
  key: 'nftGalleryItems',
  // gets the even nft items
  default: nftItems.filter((nftItem, index) => index % 2 === 0)
})

export const joyrideState = atom({
  key: 'joyride',
  default: {
    steps: steps,
    progress: initialTourProgress,
    isJoyrideActive: false,
    activeLessonId: ""
  }
})

export const onboardingState = atom({
  key: 'onboarding',
  default: []
})

// TODO: Can Combine to the one state above when ready
export const activeIndexState = atom({
  key: 'activeIndex',
  default: 0
})

export const showOnboardingState = atom({
  key: 'showOnboarding',
  default: true
})

export const showRoundAlertState = atom({
  key: 'showRoundAlert',
  default: true
})


// Global App Error State
export const errorState = atom({
  key: "errorState",
  default: {
    hasError: false
  }
})

// export const devModeState = atom({
//   key: "devMode",
//   default: {
//     active: false
//   }
// })

export const isDevModeState = atom({
  key: "isDevMode",
  default: false
})

export const activeEndpointState = atom({
  key: "activeEndpoint",
  default: "mainnet-beta"
})