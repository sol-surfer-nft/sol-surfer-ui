import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { SellNFTForm } from '../components/forms/SellNFTForm'

const SellNFTPage = () => {
  const params = useParams()
  const [nftId, setNftId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if(params?.nftId) {
      setNftId(params.nftId)
    }
  }, [params, params.nftId])

  return (
    <StyledSellNFTPage>
      <PageHeader title="Sell NFT" />

      <SellNFTForm nftId={nftId} />
    </StyledSellNFTPage>
  )
}

const StyledSellNFTPage = styled.div`
  // background: black;
`;

export default SellNFTPage