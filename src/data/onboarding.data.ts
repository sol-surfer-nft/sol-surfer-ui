export interface OnboardingQuestion {
  id: string
  question: string
  answers: QuestionAnswer[]
  helperQuestion?: HelperQuestion
}

export interface QuestionAnswer {
  text: string
  action?: () => void
  nextQuestionId?: string // if question is answered with this option, then this is the next question to be called
  tutorialId?: string // if tutorial id, then will end onboarding and go to the tutorial, but will not toggle off onboarding
  internalLink?: string
  externalLink?: string
}

export interface HelperQuestion {
  text: string
  faqLink: string
}

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "0",
    question: "Do you have a Solana Wallet?",
    answers: [
      {
        text: "Yes",
        nextQuestionId: "1"
      },
      {
        text: "No", // If no, show them how to create the wallet (react-joyride for wallet?) (embed faq q&a?)
        nextQuestionId: "2"
      }
    ],
    helperQuestion: {
      text: "What is a Solana Wallet?",
      faqLink: "/faq" // "what-is-a-wallet"
    }
  },
  {
    id: "1",
    question: "What do you want to do with NFT's?",
    answers: [
      {
        text: "Buy Them",
        nextQuestionId: "3"
      },
      {
        text: "Sell Them",
        nextQuestionId: "4"
      },
      // { text: "Both" } // start both(?)
    ],
    helperQuestion: {
      text: "What is an NFT?",
      faqLink: "/faq", // "what-is-an-nft"
    }
  },
  {
    id: "2",
    question: "Start tutorial for connecting your wallet?",
    answers: [
      {
        text: "Let's Begin!",
        // start tutorial: Connecting Wallet
        tutorialId: "0"
      },
      {
        text: "Next question",
        nextQuestionId: "1",
      }
    ],
    helperQuestion: {
      text: "Take me to this section in the FAQ page",
      faqLink: "/faq#connect-wallet", // or "/faq/connect-wallet"
    }
  },
  // Buy NFTs
  {
    id: "3",
    question: "Start tutorial for buying NFTs?",
    answers: [
      {
        text: "Let's Begin!",
        // start tutorial: Buying NFTs
        tutorialId: "6"
      },
      {
        text: "Next question",
        nextQuestionId: "5"
      }
    ],
    helperQuestion: {
      text: "Take me to this section in the FAQ page",
      faqLink: "/faq#buying-nfts-on-solsurfer"
    }
  },
  // Sell NFTs preliminary question
  {
    id: "4",
    question: "Do you already own an NFT that you would like to sell?",
    answers: [
      {
        text: "Yes",
        nextQuestionId: "6"
      },
      {
        text: "No, I need to create one",
        nextQuestionId: "5"
      },
      {
        text: "How do I know if I own an NFT already?",
        // start tutorial: Viewing your NFTs in Gallery (or importing, when available)
        tutorialId: "2"
      }
    ],
    helperQuestion: {
      text: "Take me to this section in the FAQ page",
      faqLink: "/faq#selling-nfts-on-solsurfer"
    }
  },
  // Creating NFTs
  {
    id: "5",
    question: "Are you interested in creating your own NFTs?",
    answers: [
      {
        text: "Yes, show me the tutorial!",
        // start tutorial: adding an nft
        tutorialId: "1"
      },
      {
        text: "Next question",
        nextQuestionId: "7"
      }
    ],
    helperQuestion: {
      text: "Take me to this section in the FAQ page",
      faqLink: "/faq#creating-nfts-on-solsurfer"
    }
  },
  // Sell NFT that user already owns
  {
    id: "6",
    question: "Start tutorial for Selling NFTs?",
    answers: [
      {
        text: "Let's Begin!",
        // start tutorial: Selling an NFT from Gallery (implement gallery toolbar to filter/sort)
        tutorialId: "4"
      },
      {
        text: "No",
        nextQuestionId: "7"
      }
    ],
    helperQuestion: {
      text: "Take me to this section in the FAQ page",
      faqLink: "/faq#selling-nfts-on-solsurfer"
    }
  },
  {
    id: "7",
    question: "Any more questions?",
    answers: [
      {
        text: "Visit FAQ",
        internalLink: "/faq"
      },
      {
        text: "Visit Docs",
        externalLink: "https://sol-surfer.gitbook.io/solsurfer/"
      },
      {
        text: "Finish",
      }
    ]
  }
]