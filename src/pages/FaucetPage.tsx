import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PageHeader } from '../components/PageHeader/PageHeader'
import { useWallet } from '../contexts/wallet'
import { useConnection } from '../contexts/connection'
import { useNativeAccount } from '../contexts/accounts'
import { formatNumber } from '../utils/utils';
import { notify } from "../utils/notifications";

const SOL_PER_AIRDROP = 2

const FaucetPage = () => {
  const { wallet, connected } = useWallet();
  const { account } = useNativeAccount();
  const connection = useConnection()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!connected) {
      console.log("not connected")
      return;
    }
    console.log('wallet:', wallet)
    console.log('native account:', account)
    console.log('connection:', connection)
  }, [account, connected, wallet, connection])

  const getFaucet = async () => {
    console.log('getting faucet')
    if(!wallet?.publicKey) return;
    setLoading(true)
    try {
      let response = await connection.requestAirdrop(wallet.publicKey, SOL_PER_AIRDROP * LAMPORTS_PER_SOL)
      if(response) {
        console.log('response:', response)
        notify({
          message: "Airdrop success",
          type: "success"
        })
      }
    }
    catch (error) {
      console.log('error with airdrop:', error)
      notify({
        message: "Airdrop failed",
        description: error.toString(),
        type: "error"
      })
    }
    setLoading(false)
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
        <Button onClick={getFaucet} disabled={loading}>{loading ? "..." : "Get Faucet"}</Button>
        {' '}
        <span style={{marginLeft: 8}}>{SOL_PER_AIRDROP} SOL per faucet</span>
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