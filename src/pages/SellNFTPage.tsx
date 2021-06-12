import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { SellNFTForm, SellNftFormData } from '../components/forms/SellNFTForm'
import { nftItemsState } from '../atoms'
import { SuccessSurface } from '../components/surfaces/SuccessSurface'

const SellNFTPage = () => {
  const params = useParams()
  const history = useHistory()
  const [nftId, setNftId] = useState<string | undefined>(undefined)
  const [isSuccess, setIsSuccess] = useState(false)
  const [nftItems, setNftItems] = useRecoilState(nftItemsState)

  useEffect(() => {
    if(params?.nftId) {
      setNftId(params.nftId)
    }
  }, [params, params.nftId])

  const sellNft = (data: SellNftFormData) => {
    setNftItems((oldNftItems) => [
      ...oldNftItems,
      {
        id: (oldNftItems.length + 1).toString(),
        title: data.title,
        owner: data.owner,
        price: data.price,
        usdcPrice: data.usdcPrice,
        url: "https://source.unsplash.com/random?sig=" + nftItems.length + 1,
        currency: data.currency
      }
    ])

    setIsSuccess(true)
  }

  const onSellAgain = () => {
    history.push("/sell-nft")
    setNftId(undefined)
    setIsSuccess(false);
  }

  const navigateToGallery = () => history.push("/gallery")

  return (
    <StyledSellNFTPage>
      {!isSuccess ? (
        <>
          <PageHeader title="Sell NFT" />
          <SellNFTForm nftId={nftId} sellNft={sellNft} />
        </>
      ) : (
        <SuccessSurface
          title="NFT Listed Successfully!"
          success={true}
          buttons={[
            {
              title: "Sell Another",
              action: onSellAgain
            },
            {
              title: "Back to Gallery",
              action: navigateToGallery
            }
          ]}
        />
      )}
    </StyledSellNFTPage>
  )
}

const StyledSellNFTPage = styled.div`

`;

export default SellNFTPage