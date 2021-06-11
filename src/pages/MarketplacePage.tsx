import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography, Image, Button } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { PageHeader } from '../components/PageHeader/PageHeader'
import usdcLogo from '../assets/usdc-coin-logo.png'
import solLogo from '../assets/sol-logo.png'
import { nftItemsState } from '../atoms'

const MarketplacePage = () => {
  const nftItems = useRecoilValue(nftItemsState)
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Get favorites from local storage
    const favoriteNftIds = localStorage.getItem("solsurfer.nfts.favorites")
    if(favoriteNftIds) {
      const parsedIds = JSON.parse(favoriteNftIds)
      if(parsedIds.length) {
        setFavorites(parsedIds)
      }
    }
  }, [])

  useEffect(() => {
    // each time the favorites change, update the local storage
    if(favorites) {
      localStorage.setItem("solsurfer.nfts.favorites", JSON.stringify(favorites))
    }
  }, [favorites])

  const handleItemHeartClick = (e: any, nftId: string) => {
    e.preventDefault()
    e.stopPropagation()

    if(nftId) {
      if(favorites.includes(nftId)) {
        // remove first occurence of nft id
        setFavorites(oldFavorites => oldFavorites.filter(oldId => oldId !== nftId));
      } else {
        // add to favorites
        setFavorites(oldFavorites => [...oldFavorites, nftId])
      }
    }
  }

  const handleMouseEnter = (nftIndex: number) => {
    setHoverIndex(nftIndex)
  }
  const handleMouseExit = () => {
    setHoverIndex(-1)
  }

  return (
    <StyledMarketplace>
      <PageHeader title="NFT Marketplace" />
       
       {/* Toolbar / Searchbar / Category Selector here?? Or only in top bar? Could set # per page, filtering, categorization, etc... */}
       <div className="nft-marketplace-toolbar">
         {/* Coming Soon... */}

       </div>

       {/* NFT Grid here */}
      <div className="nft-marketplace-grid">
        {nftItems.map((nftItem, nftItemIndex) => (
          <article className="nft-item" key={nftItem.id}>
            <Link to={`/marketplace/${nftItem.id}`}>
              <div
                className={`nft-item-image-container ${(nftItemIndex === hoverIndex || favorites.includes(nftItem.id)) && "nft-item-image-hover"}`}
                onMouseEnter={() => handleMouseEnter(nftItemIndex)}
                onMouseLeave={handleMouseExit}
              >
                <Image
                  width="auto"
                  height={400}
                  preview={false}
                  placeholder={true}
                  src={nftItem.url || ""}
                  alt={`nft item: ${nftItem.title}`}
                  className="nft-item-image"
                />
                <Button
                  className="nft-item-image-button"
                  shape="circle"
                  size="large"
                  icon={favorites.includes(nftItem.id) ? <HeartFilled /> : <HeartOutlined />}
                  onClick={(e) => handleItemHeartClick(e, nftItem.id)}
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
    .nft-item-image-hover {
      position: relative;
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
    position: relative;

    &:hover {
      .nft-item-image-button {
        background-color: #333;
        transition: .12s ease-in-out background-color;
      }
    }

    .nft-item-image-button {
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      outline: none;
      transition: .1s ease-in-out display;
    }

    &.nft-item-image-hover {
      .nft-item-image-button {
        display: inline-block;
        text-align: center;
        transition: .12s ease-in-out display;
      }
    }

    .nft-item-image {
      background-color: ${props => props.theme.colors.bg2};
      object-fit: contain;
      max-width: 100%;
      width: 100%;
    }
  }
`

export default MarketplacePage