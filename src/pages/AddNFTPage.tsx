import React from 'react'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { AddNFTForm } from '../components/forms/AddNFTForm'

const AddNFTPage = () => {


  return (
    <AddNFTPageContainer>
      <PageHeader title="Add NFT" />

      {/* Form on Left, Upload on Right */}
      <AddNFTForm
      
      />
    </AddNFTPageContainer>
  )
}

const AddNFTPageContainer = styled.div`

`

export default AddNFTPage