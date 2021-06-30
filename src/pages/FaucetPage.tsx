import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PageHeader } from '../components/PageHeader/PageHeader'
import { useWallet } from '../contexts/wallet'
import { useNativeAccount } from '../contexts/accounts'
import { formatNumber } from '../utils/utils';

const SOL_PER_FAUCET = 2

const FaucetPage = () => {
  const { wallet, connected } = useWallet();
  const { account } = useNativeAccount();

  useEffect(() => {
    if(!connected) {
      console.log("not connected")
      return;
    }
    console.log('wallet:', wallet)
    console.log('native account:', account)
  }, [account, connected, wallet])

  const getFaucet = () => {
    console.log('getting faucet')
  }

  const getSolAmount = () => {
    return formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)
  }

  return (
    <StyledFaucetPage>
      <PageHeader title="Faucet" description="local, dev, testnets only" />

      <div className="faucet-section">
        <Typography.Paragraph>Address: {`${wallet?.publicKey}`}</Typography.Paragraph>
        <Typography.Title level={3}>SOL: {getSolAmount()}</Typography.Title>
      </div>

      <div className="faucet-section">
        <Button onClick={getFaucet}>Get Faucet</Button>{' '}<span style={{marginLeft: 8}}>{SOL_PER_FAUCET} SOL per faucet</span>
      </div>
    </StyledFaucetPage>
  )
}

const StyledFaucetPage = styled.div`
  .faucet-section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`

export default FaucetPage;