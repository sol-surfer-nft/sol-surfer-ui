import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typography, Image, Button, Tooltip } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useWallet } from '../contexts/wallet'
import { nftGalleryItemsState } from '../atoms'
import { StatusSurface } from '../components/surfaces/StatusSurface'
import { mockGalleryNfts } from '../data/marketplace.data'

// const MOCK_NAME = "demo owner"
const MOCK_ADDRESS = "abcdefghijklmnopqrstuvwxyz"

const GalleryPage = () => {
  const [isDemo, setIsDemo] = useState(false)
  const nfts = useRecoilValue(nftGalleryItemsState)

  const { connected, wallet } = useWallet()

  const getIsNftForSale = (id: string) => {
    return Math.random() > 0.4
  }

  const getAccountExplorerLink = () => {
    return "https://explorer.solana.com/address/" + wallet?.publicKey
  }

  if(!connected && !isDemo) {
    return (
      <StatusSurface
        title="Connect your Wallet before accessing the Gallery"
        error={true}
        buttons={[
          { title: "View Demo Gallery", action: () => setIsDemo(true) }
          // TODO: offer user to start 'Connect Wallet' tutorial
        ]}
      />
    )
  }
  else if(isDemo) {
    return (
      <StyledGallery>
        <div className="exit-demo-button" style={{textAlign: 'center', paddingTop: "2rem", paddingBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button onClick={() => setIsDemo(false)} size="large" icon={<ExportOutlined />}>Close Demo</Button>
        </div>
        <div className="gallery-page-header">
          <Typography.Title className="page-header-title">Your NFTs</Typography.Title>
          <Typography.Title level={5} className="page-header-description">
            <Tooltip title="Your Wallet Address">
              <a href={"https://explorer.solana.com"} target="_blank" rel="noopener noreferrer">
                {MOCK_ADDRESS}(fake)
                <ExportOutlined style={{marginLeft: 5}} />
              </a>
            </Tooltip>
          </Typography.Title>
        </div>

        <div className="nft-item-gallery" id="tour-3-nft-gallery-list">
          {mockGalleryNfts.map(nft => (
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
          ))}
        </div>
      </StyledGallery>
    )
  }

  return (
    <StyledGallery>
      <div className="gallery-page-header">
        <Typography.Title className="page-header-title">Your NFTs</Typography.Title>
        <Typography.Title level={5} className="page-header-description">
          <Tooltip title="Your Wallet Address">
            <a href={getAccountExplorerLink()} target="_blank" rel="noopener noreferrer">
              {`${wallet?.publicKey}`}
              <ExportOutlined style={{marginLeft: 5}} />
            </a>
          </Tooltip>
        </Typography.Title>
      </div>

      <div className="nft-item-gallery" id="tour-3-nft-gallery-list">
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

  .gallery-page-header {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .page-header-title {
      padding: 0;
      padding-top: 2rem;
      margin-bottom: 0;
    }
    .page-header-description {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 1rem;
      padding
      font-weight: normal;
      opacity: 0.85;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      a {
        color: ${props => props.theme.colors.font};
        text-decoration: inherit;
      }
    }
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