import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'

const GalleryPage = () => {
  useEffect(() => {
    // query for user's nft / connection
  }, [])

  return (
    <StyledGallery>
      <PageHeader title="Gallery Page!" />
      <Typography.Paragraph>No items found yet. Make sure your wallet is connected</Typography.Paragraph>
      {/* Could prompt to begin the walkthrough */}
    </StyledGallery>
  )
}

const StyledGallery = styled.div`

`

export default GalleryPage