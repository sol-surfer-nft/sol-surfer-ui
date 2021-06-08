import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { AddNFTForm } from '../components/forms/AddNFTForm'
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
    console.log('valid nft form data submitted:', addNftFormData)

    setNftItems((oldNftItems) => [
      ...oldNftItems,
      {
        id: (oldNftItems.length + 1).toString(),
        title: addNftFormData.title,
        owner:  addNftFormData.owner,
        price: addNftFormData.price,
        usdcPrice: addNftFormData.usdcPrice,
        currency: addNftFormData.currency
      }
    ])

    setIsSuccess(true)

    // TODO: Mint NFT on Solana Blockchain using the JavaScript bindings
  }

  const onAddAgain = () => {
    setIsSuccess(false);

  }

  const navigateToMarketplace = () => history.push("/")

  return (
    <AddNFTPageContainer>
      {!isSuccess && <PageHeader title="Add NFT" />}

      {!isSuccess ? (
        <AddNFTForm addNft={addNft} />
      ) : (
        <div className="submitted-container">
          <Typography.Title level={1} className="submitted-success-text">NFT Added Successfully!</Typography.Title>
          <div className="submitted-button-bar">
            <Button className="submitted-success-button ssb-1" onClick={onAddAgain}>Add Again</Button>
            <Button className="submitted-success-button" onClick={navigateToMarketplace}>Go to Marketplace</Button>
          </div>
        </div>
      )}
    </AddNFTPageContainer>
  )
}

const AddNFTPageContainer = styled.div`
  .submitted-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    background: ${props => props.theme.colors.bg2};

    .submitted-button-bar {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submitted-success-text {
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    .ssb-1 {
      margin-right: 1.5rem;
    }
  }
`

export default AddNFTPage