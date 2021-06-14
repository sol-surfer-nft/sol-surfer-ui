import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { AddNFTForm } from '../components/forms/AddNFTForm'
import { StatusSurface } from '../components/surfaces/StatusSurface'
import { nftItemsState } from '../atoms'
import { useWallet } from '../contexts/wallet'
// import { useUserBalance } from '../hooks/useUserBalance'
export interface AddNFTFormData {
  title: string
  file: any
  owner: string
  price?: number
  usdcPrice?: number
  currency?: 'sol' | 'SOL' | 'usdc' | 'USDC'
}

const AddNFTPage = () => {
  const { connected, wallet } = useWallet()
  const history = useHistory()

  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nftItems, setNftItems] = useRecoilState(nftItemsState)

  // "mint" param is optional, is the account number of program desired
  // const userBalance = useUserBalance()

  useEffect(() => {
    

    // console.log('user balance changed:', userBalance)

    return () => {
      setIsSuccess(false)
      setError(null)
    }
  }, [])


  const addNft = (addNftFormData: AddNFTFormData) => {
    if(!connected || !wallet?.publicKey) {
      setError("User is not properly connected to wallet. Cannot Add NFT")
      return;
    }
    setNftItems((oldNftItems) => [
      ...oldNftItems,
      {
        id: (oldNftItems.length + 1).toString(),
        title: addNftFormData.title,
        owner:  `${wallet.publicKey}`, // should differentiate between address and owner's name
        price: addNftFormData.price,
        usdcPrice: addNftFormData.usdcPrice,
        currency: addNftFormData.currency,
        url: "https://source.unsplash.com/random?sig=" + nftItems.length + 1,
      }
    ])

    setIsSuccess(true)
    if(error) setError(null)
    // TODO: Mint NFT on Solana Blockchain using the JavaScript bindings
  }

  const onAddAgain = () => {
    setIsSuccess(false);
    setError(null)
    // Reset other variables
  }

  const navigateToMarketplace = () => history.push("/")

  return (
    <AddNFTPageContainer>
      {!isSuccess ? (
        <>
          <PageHeader title="Add NFT" />
          <AddNFTForm addNft={addNft} />
        </>
      ) : (
        <StatusSurface
          title="NFT Added Successfully!"
          success={true}
          buttons={[
            {
              title: "Add Another",
              action: onAddAgain
            },
            {
              title: "Back to Marketplace",
              action: navigateToMarketplace
            }
          ]}
        />
      )}
    </AddNFTPageContainer>
  )
}

const AddNFTPageContainer = styled.div`
  
`

export default AddNFTPage