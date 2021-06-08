import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typography, Image, Button } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { nftGalleryItemsState } from '../atoms'

const GalleryPage = () => {
  const [profileName, setProfileName] = useState("")
  const nfts = useRecoilValue(nftGalleryItemsState)

  useEffect(() => {
    // query for user's name
    setProfileName("temp user")
  }, [])

  const getIsNftForSale = (id: string) => {
    return Math.random() > 0.5
  }

  return (
    <StyledGallery>
      <PageHeader title={`${profileName}'s NFTs`} />

      <div className="nft-item-gallery">
        {nfts?.length > 0 ? (
          nfts.map(nft => (
            <div className="gallery-nft-item" key={nft.id}>
              <div className="gallery-nft-image-container">
                <Image src={nft.url} alt={`nft gallery item: ${nft.title}`} className="gallery-nft-imgae" />
              </div>
              <Typography.Title level={2} className="gallery-nft-title-text">{nft.title}</Typography.Title>
              {getIsNftForSale(nft.id) ? (
                <Link to={`/marketplace/${nft.id}`} className="gallery-nft-action-link">
                  <Button size="large" shape="round" className="gallery-nft-action-button">View Bids</Button>
                </Link>
              ) : (
                <Link to={`/sell-nft/${nft.id}`} className="gallery-nft-action-link">
                  <Button size="large" shape="round" className="gallery-nft-action-button">Sell NFT</Button>
                </Link>
              )}
            </div>
          ))
        ) : (
          <Typography.Paragraph style={{fontSize: 24}}>No items found yet. Make sure your wallet is connected</Typography.Paragraph>
        )}
      </div>
      
      {/* Could prompt to begin the walkthrough */}
    </StyledGallery>
  )
}

const StyledGallery = styled.div`
  .nft-item-gallery {
    display: flex;
    flex-wrap: wrap;
  }

  .gallery-nft-item {
    width: 400px;
    margin-right: 40px;
    max-width: 400px;
    flex-basis: 400px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .gallery-nft-image-container {


      .gallery-nft-image {
        object-fit: contain;
      }
    }

    .gallery-nft-title-text {
      margin-top: 1rem;
      text-align: center;
    }

    .gallery-nft-action-link {
      margin-top: .5rem;
      margin-bottom: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      display: inline-block;
      align-self: center;
    }
  }
`

export default GalleryPage