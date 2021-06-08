export interface FaqItem {
  questionId: string
  questionTitle: string
  questionAnswer: string
  url?: string
}

export const faqItems: FaqItem[] = [
  {
    questionId: "what-is-a-wallet",
    questionTitle: "What is a Solana Wallet?",
    questionAnswer: "A wallet is a place to safely store and access your crypto tokens! Since you are using Solana on sol-surfer, you need to have a Solana Wallet in order to store and transact SPL tokens. More on SPL tokens here: ...",
  },
  {
    questionId: "how-to-create-wallet",
    questionTitle: "How do I create a Solana wallet?",
    questionAnswer: "There are several 'wallet providers' that will help walk you through the process of creating a wallet on Solana. Certain providers only work on certain platforms, such as your browser, or your mobile device. You can refere here to help pick the one that's right for you: ..."
  },
  {
    questionId: "what-is-an-nft",
    questionTitle: "What is an NFT?",
    questionAnswer: "An NFT is something that's pretty cool, like digital artwork. For more information, ..."
  },
  {
    questionId: "how-do-i-trade-an-nft",
    questionTitle: "How do I trade an NFT?",
    questionAnswer: "People can trade NFT's just like they trade things on other online marketplaces like e-Bay. The primary difference is that you connect your wallet first and then you can initiate and approve transactions on the Solana network. Once these transactions are verified (usually a matter of seconds), your NFT will belong in your wallet! You can view all of your user-owned NFT's in the 'Gallery' section of this app!"
  },
  {
    questionId: "solana-ethereum-nft",
    questionTitle: "What is the difference between an NFT on Solana vs Ethereum?",
    questionAnswer: "Ethereum has a set of standard NFT smart contracts with the most popular ones being the ERC-721 and ERC-1155. NFT development on Solana is a bit more flexible, and is still under development in many ways. But almost everything that can be done on Ethereum with NFT can be done on Solana if developers support it."
  },
  {
    questionId: "can-i-create-my-own-nft",
    questionTitle: "Can I create my own NFT?",
    questionAnswer: "Yes! Since NFT is digital ownership, you could create an NFT out of almost anything you own. As an artist, for example, you could upload your artwork as an NFT and list it to be sold!"
  },
]