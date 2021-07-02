import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil'
import styled from 'styled-components';
import { Typography, Button, Popover, Tooltip, notification } from 'antd'
import { CopyOutlined, DownOutlined, ExportOutlined, CheckCircleFilled } from '@ant-design/icons';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Identicon } from './Identicon';
import { useWallet } from '../../contexts/wallet';
import { useNativeAccount } from '../../contexts/accounts';
import { ENDPOINTS } from '../../contexts/connection'
import { formatNumber, shortenAddress } from '../../utils/utils';
import { activeEndpointState } from '../../atoms';

export const CurrentUserBadge = (props: {}) => {
  const { wallet, disconnect } = useWallet();
  const { account } = useNativeAccount();
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const activeEndpoint = useRecoilValue(activeEndpointState)

  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if(copied) {
      notification.info({
        message: "Copied Address",
        placement: "bottomLeft",
        icon: <CheckCircleFilled style={{color: "#52c41a"}} />
      })
      setCopied(false)
    }
  }, [copied])

  const getExplorerLink = () => {
    // Gets the link to the account on solana's explorer
    // console.log('active endpoint:', activeEndpoint)
    
    let link = "https://explorer.solana.com/address/" + wallet?.publicKey

    // 1. Need to determine if on Mainnet Beta, Testnet, or Devnet (or custom?)
    switch(activeEndpoint) {
      case "localnet":
        link += "?cluster=custom&customUrl=" + ENDPOINTS[3].endpoint
        break;
      case "testnet":
        link += "?cluster=testnet"
        break;
      case "devnet":
        link += "?cluster=devnet"
        break;
      default:
        break;;
    }

    return link
  }

  if (!wallet?.publicKey) {
    return null;
  }

  const renderAccountPopoverContent = () => {
    return (
      <StyledAccountOverlay className="account-overlay-container">
        <Typography.Title level={5} style={{textAlign: 'center', marginBottom: 0, opacity: 0.8, fontSize: 16}}>Account</Typography.Title>
        <Typography.Title level={5} style={{textAlign: 'center', marginTop: 0}}>
          <span>{shortenAddress(`${wallet.publicKey}`)}</span>
          <Tooltip title="Copy Address">
            <CopyToClipboard text={wallet?.publicKey} onCopy={() => setCopied(true)}>
              <Button shape="circle" icon={<CopyOutlined />} style={{border: 0, outline: 0}} />
            </CopyToClipboard>
          </Tooltip>
        </Typography.Title>
        <div className="account-overlay-price-container">
          <Typography.Title level={3} style={{textAlign: 'center'}}>{formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)}&nbsp;<span style={{fontSize: 18}}>SOL</span></Typography.Title>
        </div>
        <div className="account-overlay-button-group">
          <Button onClick={disconnect} className="account-overlay-button">Disconnect</Button>
          <Button href={getExplorerLink()} target="_blank" rel="noopener noreferrer" icon={<ExportOutlined />} className="account-overlay-button">
            View Account
          </Button>
        </div>
        <div className="account-overlay-tokens-list">
          {/* TODO: Show user tokens here */}
          <Typography.Title level={5} style={{textAlign: 'center'}}>Your Tokens List</Typography.Title>
          <Typography.Paragraph style={{textAlign: 'center'}}>coming soon!</Typography.Paragraph>
        </div>
      </StyledAccountOverlay>
    )
  }

  return (
    <StyledUserBadge>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={renderAccountPopoverContent}
        visible={isOpen}
        onVisibleChange={(visible) => setIsOpen(visible)}
        // style={{marginTop: 0}}
      >
        <div className="account-display-container">
          <div className="wallet-key">
            <span className="account-address-text">{shortenAddress(`${wallet.publicKey}`)}</span>
            <Identicon address={wallet.publicKey.toBase58()} />
          </div>
          <DownOutlined />
        </div>
      </Popover>
    </StyledUserBadge>
  );
};

const StyledAccountOverlay = styled.div`
  background: ${props => props.theme.colors.bg2};
  min-width: 200px;

  .account-overlay-price-container {
    padding: .5rem;
    margin-bottom: 1rem;
  }

  .account-overlay-button-group {
    display: flex;
    flex-direction: column;
    align-items: center;

    .account-overlay-button {
      margin-bottom: .5rem;
    }
  }

  .account-overlay-tokens-list {
    margin-top: .75rem;
    padding-top: .75rem;
    border-top: 1px solid ${props => props.theme.colors.iconBg};
  }

  @media(min-width: ${props => props.theme.breakpoints.md}px) {
    .account-overlay-container {
      min-width: 500px;

      .account-overlay-price-container {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
  }
`

const StyledUserBadge = styled.div`
  // wallet wrapper
  padding-left: 0.7rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  white-space: nowrap;

  

  .account-display-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-right: 0.5rem;

    &:hover {
      background-color: ${props => props.theme.colors.iconBg};
      
    }
  }
  .account-address-text {
    height: 100%;
    display: inline-block;
    padding-right: 5px;
  }

  .wallet-key {
    padding: 0.1rem 0.5rem 0.1rem 0.7rem;
    margin-left: 0.3rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
  }
`;
