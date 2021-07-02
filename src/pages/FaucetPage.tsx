import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Button, Typography, Input, InputNumber } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { useWallet } from '../contexts/wallet'
import { useConnection } from '../contexts/connection'
import { useNativeAccount } from '../contexts/accounts'
import { formatNumber } from '../utils/utils';
import { printObject } from '../utils/surfer-utils'
import { notify } from "../utils/notifications";

import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const SOL_PER_AIRDROP = 2

const TEST_RECIPIENT_ADDRESS = "4FvypZ9Q9e2Hg6Y5nNMfq5dadQbLBuA24msh4PAcpiMA"
const TEST_ADDRESS_2 = "HwsLSSa6sHpAcxxHUskK9AZLKmin4HRbswcokGSJM6dq"
// const TEST_ADDRESS_SOLFLARE = "4sam79hQK2QNaWitt9cedK5jvBCc52YNMyaCedTV9Dh5"

const FaucetPage = () => {
  const { wallet, connected } = useWallet();
  const { account } = useNativeAccount();
  const connection = useConnection()

  const [loadingFaucet, setLoadingFaucet] = useState(false)
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [formData, setFormData] = useState({
    recipientAddress: TEST_RECIPIENT_ADDRESS,
    amount: 1
  })

  const solAmount = useMemo(() => {
    if(!connected) return formatNumber.format(0);
    return formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)
  }, [account, connected])

  useEffect(() => {
    const logConnection = () => {
      console.log('----wallet info----')
      console.log('wallet:', wallet)
      console.log('native account:', account)
      console.log('connection:', connection)
    }
    if(!connected) {
      console.log("not connected")
      return;
    }
    
    logConnection()
  }, [account, connected, wallet, connection])

  useEffect(() => {
    if(connected) {
      if(`${wallet?.publicKey}` === TEST_RECIPIENT_ADDRESS) {
        setFormData(prevState => ({...prevState, recipientAddress: TEST_ADDRESS_2}))
      }
    }
  }, [connected, wallet])

  const getFaucet = async () => {
    if(!wallet?.publicKey) return;
    setLoadingFaucet(true)
    try {
      let response = await connection.requestAirdrop(wallet.publicKey, SOL_PER_AIRDROP * LAMPORTS_PER_SOL)
      if(response) {
        notify({
          message: "Airdrop success",
          type: "success"
        })
      }
    }
    catch (error) {
      notify({
        message: "Airdrop failed",
        description: error.toString(),
        type: "error"
      })
    }
    setLoadingFaucet(false)
  }

  const handleChange = (e) => setFormData(data => ({ ...data, [e.target.name]: e.target.value }))

  const handleNumberChange = (value) => setFormData(data => ({ ...data, amount: Number(value) }))

  const sendTransaction = async () => {
    if(!formData.amount || !formData.recipientAddress) {
      notify({ type: "error", message: "Missing recipient address or amount to send. Please fix and try again" });
      return;
    }
    else {
      printObject(formData, "form data")
    }

    notify({ type: "info", message: "Sending transaction" })
    setLoadingTransaction(true)

    try {
      // Get Wallets and Accounts info needed for transaction
      const destinationPubkey = new PublicKey(formData.recipientAddress)
      const walletAccountInfo = await connection.getAccountInfo(wallet!.publicKey!)
      console.log('destination pubkey:', destinationPubkey)
      console.log("wallet data size", walletAccountInfo?.data.length);
      
      const receiverAccountInfo = await connection.getAccountInfo(destinationPubkey);
      console.log('receiver account info:', receiverAccountInfo)
      console.log("receiver data size", receiverAccountInfo?.data.length);

      const lamportsToSend = formData.amount * LAMPORTS_PER_SOL;

      console.log('wallet pub key:', wallet!.publicKey!)

      // Prepare instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: wallet!.publicKey!,
        toPubkey: destinationPubkey,
        lamports: lamportsToSend 
      });

      console.log('instruction:', instruction)

      // Prepare transaction
      let transaction = new Transaction();
      transaction.add(instruction);
      transaction.feePayer = wallet!.publicKey!;

      // Is this hash correct?? Says "blockhash not found"
      // let hash = await connection.getRecentBlockhash(); // singleGossip
      // let singleGossipHash = await connection.getRecentBlockhash("singleGossip")
      // let recentHash = await connection.getRecentBlockhash("recent")
      // console.log('blockhash:', hash)
      // console.log('single gossip blockhash:', singleGossipHash)
      // console.log('recent blockhash:', recentHash)
      transaction.recentBlockhash = (await connection.getRecentBlockhash("max")).blockhash;

      // transaction.setSigners(wallet.publicKey, ...signers.map((s)))
      // transaction.recentBlockhash = RECENT_BLOCKHASH

      // console.log('transaction:', transaction)

      // solana transfer --from test_wallet_1.json 8d6JZYG7edkX6aEaPyZpJYuPbGaALjHqVHGo2p8mmHgS 1 --allow-unfunded-recipient --fee-payer test_wallet_1.json

      // await sendAndConfirmTransaction(
      //   connection,
      //   transaction,
      //   [walletAccountInfo, receiverAccountInfo],
      //   {
      //     commitment: 'singleGossip',
      //     preflightCommitment: 'singleGossip',
      //   },
      // );

      // Prepare Signature
      const signedTransaction = await wallet!.signTransaction(transaction);
      // const simulatedTransaction = await wallet!.simulateTransaction(transaction);
      // console.log('simulated transaction:', simulatedTransaction);
      console.log('signed transaction:', signedTransaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      console.log('sent raw transaction')

      // Get Result, Output Results
      const result = await connection.confirmTransaction(signature, "singleGossip")
      console.log('transaction result (LAMPORTS were sent):', result)
    }
    catch (error) {
      console.log("error sending transaction:", error)
      notify({ type: "error", message: "Error sending transaction: " + error.toString() })
    }

    setLoadingTransaction(false)

    // const minimumAmount = await connection.getMinimumBalanceForRentExemption(0)

    // const transactionInstruction = new TransactionInstruction({
    //   keys: [{ pubkey: destPubkey, isSigner: false, isWritable: true }],
    //   programId
    // })

    // const connection = new Connection(url, 'singleGossip')
    // const sender = new Account()
    // const recipient = new Account()

    
    // 1. const signature = await connection.sendTransaction(transaction, signers, sendOptions)
    // 2. const status = await connection.confirmTransaction(signature, options?); let { value, err } = status;
    // 3. return signature;
  }

  return (
    <StyledFaucetPage>
      <PageHeader title="Faucet" />

      <div className="faucet-section">
        <Typography.Paragraph>Address: {`${wallet?.publicKey}`}</Typography.Paragraph>
        <Typography.Title level={3}>SOL: {solAmount}</Typography.Title>
      </div>

      <div className="faucet-section">
        <Button onClick={getFaucet} disabled={loadingFaucet}>{loadingFaucet ? "..." : "Get Faucet"}</Button>
        {' '}
        <span style={{marginLeft: 8}}>{SOL_PER_AIRDROP} SOL per faucet</span>
      </div>

      {/* Send Transaction */}
      <div className="faucet-section">
        <Typography.Title level={4}>Send a Transaction</Typography.Title>

        <div className="faucet-subsection">
          <Input value={formData.recipientAddress} onChange={handleChange} name="recipientAddress" placeholder="Recipient Address" />
          <br />
          <InputNumber min={0.00000001} max={10000} value={formData.amount} onChange={handleNumberChange} placeholder="Amount" name="amount" />
          <br />
          <br />
          <Button onClick={sendTransaction} disabled={loadingTransaction}>{loadingFaucet ? "..." : "Send Transaction"}</Button>
        </div>
      </div>
    </StyledFaucetPage>
  )
}

const StyledFaucetPage = styled.div`
  .faucet-section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .faucet-subsection {

  }
`

export default FaucetPage;