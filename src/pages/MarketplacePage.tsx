import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
                <Link to={`/marketplace/${nftItem.id}`}>
                  <div className="nft-item-image-container">
                    <Image
                      // width={300}
                      height={400}
                      preview={false}
                      src={nftItem.url || ""}
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
                      {(nftItem.usdcPrice || nftItem.price) && (
                        <div className="price-logo-container">
                          <Typography className="nft-item-price-text">{(nftItem.usdcPrice || nftItem.price || 0).toLocaleString()}</Typography>
                          <Image
                            width={24}
                            preview={false}
                            src={nftItem.usdcPrice ? usdcLogo : solLogo}
                            alt={nftItem.usdcPrice ? "usdc logo" : "sol logo"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
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
    cursor: pointer;
    background: ${props => props.theme.colors.bg2};
    box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.75);

    .nft-item-bottom-bar {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nft-item-bottom-bar-left {
        flex: 1;
        overflow-x: hidden;

        .nft-item-owner {
          opacity: 0.8;
        }
        .nft-item-title {
          font-size: 18px;
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
      }

      .nft-item-bottom-bar-right {
        margin-left: 5px;
      }
      .price-logo-container {
        display: flex;
        align-items: center;

        .nft-item-price-text {
          padding-right: 5px;
          font-size: 20px;
        }
      }
    }
  }
  .nft-item-image-container{
    text-align: center;
    margin: auto;
  }
`

export default MarketplacePage