import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { AddNFTForm } from '../components/forms/AddNFTForm'
import { SuccessSurface } from '../components/surfaces/SuccessSurface'
import { nftItemsState } from '../atoms'
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
  const [isSuccess, setIsSuccess] = useState(false)
  const setNftItems = useSetRecoilState(nftItemsState)
  const history = useHistory()

  // "mint" param is optional, is the account number of program desired
  // const userBalance = useUserBalance()

  useEffect(() => {
    

    // console.log('user balance changed:', userBalance)

    return () => {
      setIsSuccess(false)
    }
  }, [])


  const addNft = (addNftFormData: AddNFTFormData) => {
    setNftItems((oldNftItems) => [
      ...oldNftItems,
      {
        id: (oldNftItems.length + 1).toString(),
        title: addNftFormData.title,
        owner:  addNftFormData.owner,
        price: addNftFormData.price,
        usdcPrice: addNftFormData.usdcPrice,
        currency: addNftFormData.currency,
        url: "https://source.unsplash.com/random"
      }
    ])

    setIsSuccess(true)

    // TODO: Mint NFT on Solana Blockchain using the JavaScript bindings
  }

  const onAddAgain = () => {
    setIsSuccess(false);
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
        <SuccessSurface
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