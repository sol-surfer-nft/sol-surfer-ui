import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { nftItems } from '../data/marketplace.data'
import { NFTItem } from '../types/NFTItem'
import { Typography } from 'antd'

const NFTDetailPage = () => {
  const params = useParams();

  const [nftItem, setNftItem] = useState<NFTItem | undefined>(undefined)

  useEffect(() => {
    console.log('mounted nft detail page. params:', params.nftId)
    getNftItemById(params.nftId)
  }, [params.nftId])

  const getNftItemById = (id: string) => {
    let newItem = nftItems.find(item => item.id === id)
    setNftItem(newItem)
  }

  return (
    <StyledNFTDetailPage>
      <PageHeader title="NFT Detail Page!" />
      {nftItem && (
        <div className="nft-detail-container">
          <div className="nft-detail-header">
            <Typography.Title level={3}>{nftItem.title}</Typography.Title>
            <Typography.Title level={5}>By {nftItem.owner}</Typography.Title>
          </div>
          <div className="nft-detail-body">
            {nftItem.description && <Typography.Paragraph>{nftItem.description}</Typography.Paragraph>}
            {/* Price Info, Other Info, etc. */}
          </div>
        </div>
      )}
    </StyledNFTDetailPage>
  )
}

const StyledNFTDetailPage = styled.div`
  .nft-detail-container {
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    padding: 2rem;
    margin: 2rem auto;
    width: 75%;
  }
`

export default NFTDetailPage