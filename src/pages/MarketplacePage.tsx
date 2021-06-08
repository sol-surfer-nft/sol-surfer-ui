import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography, Image } from 'antd'
// import { HeartOutlined } from '@ant-design/icons'
import { PageHeader } from '../components/PageHeader/PageHeader'
import usdcLogo from '../assets/usdc-coin-logo.png'
import solLogo from '../assets/sol-logo.png'
import { nftItemsState } from '../atoms'

const MarketplacePage = () => {
  const nftItems = useRecoilValue(nftItemsState)

  // const handleItemHeartClick = (e: any, nftId: string) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log('user tried to favorite nft with id:', nftId);
  // }

  return (
    <StyledMarketplace>
      <PageHeader title="NFT Marketplace" />
       
       {/* Toolbar / Searchbar / Category Selector here?? Or only in top bar? Idk */}

       {/* NFT Grid here */}
      <div className="nft-marketplace-grid">
        {nftItems.map(nftItem => (
          <article className="nft-item" key={nftItem.id}>
            <Link to={`/marketplace/${nftItem.id}`}>
              <div className="nft-item-image-container">
                <Image
                  width="auto"
                  height={400}
                  preview={false}
                  src={nftItem.url || ""}
                  alt={`nft item: ${nftItem.title}`}
                  className="nft-item-image"
                  
                  placeholder={true}
                />
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

            {/* Heart Icon */}

          </article>
        ))}
      </div>
    </StyledMarketplace>
  )
}

const StyledMarketplace = styled.div`
  .nft-marketplace-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .nft-item {
    position: relative;
    flex-grow: 1;
    flex-basis: 400px;
    width: 400px;
    max-width: 400px;
    margin: 8px;
    background: ${props => props.theme.colors.bg2};
    // border-radius: 5px;
    // box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
    cursor: pointer;
	  transition: transform 0.1s ease-in-out, box-shadow 0.1s;

    &:hover {
      transform: translateY(-0.5rem) scale(1.0125);
      box-shadow: 0 0.5em 3rem -1rem rgba(0,0,0,0.5);
    }

    .nft-item-bottom-bar {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      // border-top: 1px solid ${props => props.theme.colors.bg1};

      .nft-item-bottom-bar-left {
        flex: 1;
        overflow-x: hidden;

        .nft-item-owner {
          opacity: 0.8;
          overflow-wrap: normal;
        }
        .nft-item-title {
          font-size: 18px;
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
          overflow-wrap: normal;
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

    .nft-item-like-button {
      background: transparent;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      vertical-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        border-color: ${props => props.theme.colors.primary};
        transition: .1s ease-in-out ${props => props.theme.colors.primary};
      }
    }
  }
  .nft-item-image-container{
    text-align: center;
    margin: auto;

    .nft-item-image {
      background-color: ${props => props.theme.colors.bg2};
      object-fit: contain;
      max-width: 100%;
      width: 100%;
    }
  }
`

export default MarketplacePage