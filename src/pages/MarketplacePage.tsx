import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography, Image, Button, Spin, /*List*/  } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { PageHeader } from '../components/PageHeader/PageHeader'
import usdcLogo from '../assets/usdc-coin-logo.png'
import solLogo from '../assets/sol-logo.png'
import { nftItemsState } from '../atoms'
import { generateRandomNft } from '../utils/generateRandomNft'
// import { NFTItem } from '../types/NFTItem'

// Virtualized and Infinite Scroll stuff:
// import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import VList from 'react-virtualized/dist/commonjs/List';
// import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
// import InfiniteScroll from 'react-infinite-scroller'


const NFT_ROWS_PER_LOAD = 2
const NFT_ITEM_WIDTH = 400
const NFT_TOTAL_ITEM_WIDTH = 400 + 16
// const MAX_NFT_ITEMS = 100 // TODO: Pagination or Virtualization

const LG_BREAKPOINT = 992
const XL_BREAKPOINT = 1200

const DEBOUNCE_TIME = 100
// const SCROLL_THRESHOLD = 100

function debounce(fn, ms) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      // @ts-ignore
      fn.apply(this, arguments)
    }, ms)
  };
}

const MarketplacePage = () => {
  const [nftItems, setNftItems] = useRecoilState(nftItemsState)
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [favorites, setFavorites] = useState<string[]>([])

  const [loadingNfts, setLoadingNfts] = useState(false)

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const [numberNftsPerRow, setNumberNftsPerRow] = useState(1)
  const [gridLeftPadding, setGridLeftPadding] = useState(0)

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

  // Handle Resize
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, DEBOUNCE_TIME)

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    // Now, calculate how many rows there need to be according to the dimensions and page padding
    let pagePadding = 15 * 2;
    if(dimensions.width >= XL_BREAKPOINT)
      pagePadding = Math.floor(dimensions.width * .165)
    else if(dimensions.width >= LG_BREAKPOINT)
      pagePadding = Math.floor(dimensions.width * .0825)

    const availableSpace = dimensions.width - pagePadding
    const wastedSpace = availableSpace % NFT_TOTAL_ITEM_WIDTH
    const numberOfNftItems = Math.floor(availableSpace / NFT_TOTAL_ITEM_WIDTH)
    const paddingLeft = Math.floor(wastedSpace / 2)

    setNumberNftsPerRow(numberOfNftItems)
    setGridLeftPadding(paddingLeft)
  }, [dimensions.width])


// Eric's Idea:
// - modulus flexbox width - all of the padding and margins from the page inside the container
// - can then modulus the widths to see how many nfts can fit
// - --> which gives total number of nfts that can fit
// - can calculate an offset variable, keep track of last offset.


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

  const addMoreNFTs = (quantity: number) => {
    for(let i = 0; i < quantity; i++) {
      let newNft = generateRandomNft(nftItems.length + i + 1);
      setNftItems(oldNfts => [...oldNfts, newNft])
    }
  }

  const handleLoadMore = () => {
    setLoadingNfts(true)
    // if current # nfts does not fit evenly into # rendered per row, there's gaps that need to be filled
    // fill by adding the remainder which represents # of gaps
    if(nftItems.length % numberNftsPerRow !== 0) {
      let remainder = numberNftsPerRow - (nftItems.length % numberNftsPerRow)
      addMoreNFTs((NFT_ROWS_PER_LOAD * numberNftsPerRow) + remainder)
    }
    // else load 2 full new rows, should not be gaps left
    else {
      addMoreNFTs(NFT_ROWS_PER_LOAD * numberNftsPerRow)
    }

    setLoadingNfts(false)
  }

  return (
    <StyledMarketplace>
      <PageHeader title="NFT Marketplace" />

        {/* Toolbar / Searchbar / Category Selector here?? Or only in top bar? Could set # per page, filtering, categorization, etc... */}
        <div className="nft-marketplace-toolbar">
          {/* Coming Soon... */}
          
        </div>

       {/* NFT Grid here */}
      <div className="nft-marketplace-grid" style={{paddingLeft: gridLeftPadding }}>
        {/* <InfiniteScroll
          className="nft-marketplace-grid"
          pageStart={0}
          hasMore={!loadingNfts && nftItems.length < MAX_NFT_ITEMS}
          loadMore={handleLoadMore}
          // loader={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "450px", width: NFT_ITEM_WIDTH, margin: 8}}><Spin /></div>}
          // threshold={SCROLL_THRESHOLD}
          // useWindow={false}
        > */}
          {nftItems.map((nftItem, nftItemIndex) => (
            <article className="nft-item" key={`nft-${nftItemIndex}-${nftItem.id}`}>
              <Link to={`/marketplace/${nftItem.id}`}>
                <div
                  className={`nft-item-image-container ${(nftItemIndex === hoverIndex || favorites.includes(nftItem.id)) && "nft-item-image-hover"}`}
                  onMouseEnter={() => handleMouseEnter(nftItemIndex)}
                  onMouseLeave={handleMouseExit}
                >
                  <Image
                    width="auto"
                    height={NFT_ITEM_WIDTH}
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
            </article>
          ))}
        {/* </InfiniteScroll> */}
      </div>

      {/* Load More */}
      <div className="load-more-button-container">
        {!loadingNfts ? (
          <Button size="large" onClick={handleLoadMore}>Load More</Button>
        ) : (
          <Spin />
        )}
      </div>
    </StyledMarketplace>
  )
}

const StyledMarketplace = styled.div`
  .load-more-button-container {
    text-align: center;
    margin-top: 2rem;
  }

  .nft-marketplace-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .nft-item {
    flex-grow: 1;
    flex-basis: ${NFT_ITEM_WIDTH}px;
    width: ${NFT_ITEM_WIDTH}px;
    max-width: ${NFT_ITEM_WIDTH}px;
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