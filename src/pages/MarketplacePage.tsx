import React from 'react'
import styled from 'styled-components'
import { Typography, Row, Col, Image } from 'antd'
import { nftItems } from '../data/marketplace.data'
import { PageHeader } from '../components/PageHeader/PageHeader'
import usdcLogo from '../assets/usdc-coin-logo.png'
import solLogo from '../assets/sol-logo.png'

const MarketplacePage = () => {


  return (
    <StyledMarketplace>
      <PageHeader title="Marketplace Page!" />
       
       {/* Toolbar / Searchbar / Category Selector here?? Or only in top bar? Idk */}

       {/* NFT Grid here */}
      <div className="nft-marketplace-grid">
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          {nftItems.map(nftItem => (
            <Col key={nftItem.id} className="gutter-row" span={6}>
              <div className="nft-item">
                <div className="nft-item-image-container">
                  <Image
                    width={300}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    alt={`nft: ${nftItem.title}`}
                    className="nft-item-image"
                  />
                  {/* <img className="nft-item-image" alt={nftItem.description || `${nftItem.id}-${nftItem.title}`} /> */}
                </div>
                <div className="nft-item-bottom-bar">
                  <div className="nft-item-bottom-bar-left">
                    <Typography className="nft-item-owner">{nftItem.owner}</Typography>
                    <Typography className="nft-item-title">{nftItem.title}</Typography>
                  </div>
                  <div className="nft-item-bottom-bar-right">
                    {!(nftItem.usdcPrice || nftItem.price) ? (
                      <Typography>No price provided. Skip</Typography>
                    ) : (
                      <div className="price-logo-container">
                        <Typography>{nftItem.usdcPrice || nftItem.price}</Typography>
                        <Image
                          width={24}
                          src={nftItem.usdcPrice ? usdcLogo : solLogo}
                          alt={nftItem.usdcPrice ? "usdc logo" : "sol logo"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </StyledMarketplace>
  )
}

const StyledMarketplace = styled.div`
  .nft-item {
    background: 
    box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.75);

    .nft-item-bottom-bar {

    }
  }
  .nft-item-image-container{
  }
`

export default MarketplacePage