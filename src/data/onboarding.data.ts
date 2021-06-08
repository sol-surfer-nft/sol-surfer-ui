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
        action: () => null
      },
      {
        text: "No", // If no, show them how to create the wallet (react-joyride for wallet?) (embed faq q&a?)
        action: () => null
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
      },
      {
        text: "Sell Them"
      }
    ],
    helperQuestion: {
      text: "What is an NFT?",
      faqLink: "/faq", // "what-is-an-nft"
    }
  }
]