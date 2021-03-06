import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Typography, Image, Button, Table } from 'antd'
// TODO: move the bids to recoil as well. only load per item loaded as well
import { nftBids } from '../data/marketplace.data'
import { NFTItem } from '../types/NFTItem'
import { nftItemsState } from '../atoms'

const bidTableColumns = [
  {
    title: "Bidder",
    dataIndex: "bidder",
    key: "bidder"
  },
  {
    title: "Bid Price",
    dataIndex: "bidPrice",
    key: "bidPrice"
  },
  {
    title: "Timestamp",
    dataIndex: "bidTimestamp",
    key: "bidTimestamp"
  },
]

const NFTDetailPage = () => {
  const params = useParams();
  const nfts = useRecoilValue(nftItemsState)
  const [nftItem, setNftItem] = useState<NFTItem | undefined>(undefined)

  useEffect(() => {
    let newItem = nfts.find(item => item.id === params.nftId)
    setNftItem(newItem)
  }, [params.nftId, nfts])

  const handleBuyNft = (id: string) => {
    // TODO: Add solana hooks functionality here
  }

  const getIsNFTForSale = (id: string) => {
    return Math.random() > 0.2
  }

  return (
    <StyledNFTDetailPage>
      {/* <PageHeader title="NFT Detail Page!" /> */}
      {nftItem && (
        <div className="nft-detail-container">
          <div className="nft-detail-left">
            <Image src={nftItem.url} alt={`nft item: ${nftItem.title}`} className="nft-detail-image" />

            {/* Buy Button */}
            <div className="nft-buy-button-container" id="buy-nft-button">
              {nftItem.usdcPrice ? (
                <Button className="nft-item-price-button" shape="round" type="primary" onClick={() => handleBuyNft(nftItem.id)}>Buy for {nftItem.usdcPrice} USDC</Button>
                ) : nftItem.price && (
                <Button className="nft-item-price-button" shape="round" type="primary" onClick={() => handleBuyNft(nftItem.id)}>Buy for {nftItem.price} SOL</Button>
              )}
            </div>
          </div>
          <div className="nft-detail-right">
            <div className="nft-detail-header">
              <Typography.Title level={2} style={{marginBottom: 8, marginTop: 0}}>{nftItem.title}</Typography.Title>
              <Typography.Title level={5} style={{marginBottom: 8, marginTop: 8}}>By {nftItem.owner}</Typography.Title>
              <Typography.Title level={5} style={{marginBottom: 8, marginTop: 8}}>Qty. 1</Typography.Title>
            </div>
            <div className="nft-detail-body">
              {nftItem.description && <Typography.Paragraph>{nftItem.description}</Typography.Paragraph>}
              {/* Price Info, Other Info, etc. */}
            </div>
          </div>
        </div>
      )}
      {nftItem && (
        <div className="nft-detail-bids">
          {getIsNFTForSale(nftItem.id) ? (
            <>
              <Typography.Title level={3} style={{paddingLeft: "1rem"}}>Bids for "{nftItem.title}"</Typography.Title>

              <Table columns={bidTableColumns} dataSource={nftBids.map(bid => {
                return {
                  key: bid.id,
                  bidder: bid.bidder,
                  bidPrice: `${bid.bidPrice} ${bid.bidCurrency}`,
                  bidTimestamp: bid.timestamp
                }
              })} />

              {/* {nftBids.map(bid => (
                <div className="nft-detail-bid-item" key={bid.id}>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-bidder-text">{bid.bidder}: </Typography.Paragraph>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-price-text">{bid.bidPrice} {bid.bidCurrency}</Typography.Paragraph>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-timestamp-text">{bid.timestamp}</Typography.Paragraph>
                </div>
              ))} */}
              {/* {nftBids.map(bid => (
                <div className="nft-detail-bid-item" key={bid.id}>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-bidder-text">{bid.bidder}: </Typography.Paragraph>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-price-text">{bid.bidPrice} {bid.bidCurrency}</Typography.Paragraph>
                  <Typography.Paragraph className="nft-detail-bid-text nft-detail-timestamp-text">{bid.timestamp}</Typography.Paragraph>
                </div>
              ))} */}
            </>
          ) : (
            <div style={{textAlign: 'center', padding: '1rem 2rem'}}>
              <Typography.Title level={2}>This NFT is not listed for sale</Typography.Title>
              <Typography.Paragraph>No Data</Typography.Paragraph>
            </div>
          )}
        </div>
      )}
    </StyledNFTDetailPage>
  )
}

const StyledNFTDetailPage = styled.div`
  .nft-detail-bids {
    margin-top: calc(60px + 2rem);
    padding: 2rem;
    padding-bottom: 1rem;
    background: ${props => props.theme.colors.bg2};
    // border-radius: 10px;

    .nft-detail-bid-item {
      border-bottom: 1px solid #333;
      padding: .5rem 1rem;
      display: flex;
      align-items: center;

      .nft-detail-bid-text {
        margin-bottom: 0;
      }
      .nft-detail-bid-price-text {
        flex: 1;
      }
    }
  }

  .nft-detail-container {
    // border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    margin: 2rem auto;
    display: flex;
    
    .nft-detail-left {
      width: 50%;
      text-align: center;
      // border: 1px solid ${props => props.theme.colors.primary};
      position: relative;

      .nft-detail-image {
        object-fit: contain;
        width: 100%;
        height: 50vh;
        background-color: ${props => props.theme.colors.bg2};
      }

      .nft-buy-button-container {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        
        .nft-item-price-button {
        }
      }
    }
    .nft-detail-right {
      width: 50%;
      padding: 1rem 1.5rem;
    }

  }
  @media(max-width: ${props => props.theme.breakpoints.md}px) {
    .nft-detail-container {
      flex-direction: column;

      .nft-detail-left {
        width: 100%;
      }
      .nft-detail-right {
        width: 100%;
      }
    }
  }
`

export default NFTDetailPage