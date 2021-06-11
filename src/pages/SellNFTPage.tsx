import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { SellNFTForm, SellNftFormData } from '../components/forms/SellNFTForm'
import { nftItemsState } from '../atoms'

const SellNFTPage = () => {
  const params = useParams()
  const history = useHistory()
  const [nftId, setNftId] = useState<string | undefined>(undefined)
  const [isSuccess, setIsSuccess] = useState(false)
  const setNftItems = useSetRecoilState(nftItemsState)

  useEffect(() => {
    if(params?.nftId) {
      setNftId(params.nftId)
    }
  }, [params, params.nftId])

  const sellNft = (data: SellNftFormData) => {
    setNftItems((oldNftItems) => [
      ...oldNftItems,
      {
        id: (oldNftItems.length + 1).toString(),
        title: data.title,
        owner: data.owner,
        price: data.price,
        usdcPrice: data.usdcPrice,
        url: "https://source.unsplash.com/random",
        currency: data.currency
      }
    ])

    setIsSuccess(true)

    // TODO: Add to Solana Blockchain with the React hooks / JS bindings if success
// Interchain NFT Marketplace to Buy and Sell on-chain NFTs or import from ERC20
// NFT Marketplace bringing NFT over wormhole
// Explore, Trade, and Learn about NFTs.

// - Code Demo
// - Powrpoint
// - Documentation Overview Page

  }

  const onSellAgain = () => {
    history.push("/sell-nft")
    setNftId(undefined)
    setIsSuccess(false);
  }

  const navigateToMarketplace = () => history.push("/")

  return (
    <StyledSellNFTPage>
      <PageHeader title="Sell NFT" />

      {!isSuccess ? (
        <SellNFTForm nftId={nftId} sellNft={sellNft} />
      ) : (
        <div className="submitted-container">
          <Typography.Title level={1} className="submitted-success-text">NFT Listed Successfully!</Typography.Title>
          <div className="submitted-button-bar">
            <Button className="submitted-success-button ssb-1" onClick={onSellAgain}>Sell Again</Button>
            <Button className="submitted-success-button" onClick={navigateToMarketplace}>Go to Marketplace</Button>
          </div>
        </div>
      )}
    </StyledSellNFTPage>
  )
}

const StyledSellNFTPage = styled.div`
  // background: black;

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
`;

export default SellNFTPage