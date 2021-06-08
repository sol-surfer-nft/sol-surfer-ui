import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { AddNFTForm } from '../components/forms/AddNFTForm'
import { useUserBalance } from '../hooks/useUserBalance'
export interface AddNFTFormData {
  title: string
  file: any
}

const AddNFTPage = () => {
  // "mint" param is optional, is the account number of program desired
  const userBalance = useUserBalance()

  useEffect(() => {
    
    console.log('user balance changed:', userBalance)
  }, [userBalance])


  const addNft = (addNftFormData: AddNFTFormData) => {
    console.log('nft form data submitted:', addNftFormData)

    // Mint NFT on Solana Blockchain
    
  }

  return (
    <AddNFTPageContainer>
      <PageHeader title="Add NFT" />

      {/* Form on Left, Upload on Right */}
      <AddNFTForm
        addNft={addNft}
      />
    </AddNFTPageContainer>
  )
}

const AddNFTPageContainer = styled.div`

`

export default AddNFTPage