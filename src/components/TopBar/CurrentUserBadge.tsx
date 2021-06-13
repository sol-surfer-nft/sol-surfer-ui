import React from 'react';
import styled from 'styled-components';
import { useWallet } from '../../contexts/wallet';
import { formatNumber, shortenAddress } from '../../utils/utils';
import { Identicon } from './Identicon';
import { useNativeAccount } from '../../contexts/accounts';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const CurrentUserBadge = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();

  if (!wallet?.publicKey) {
    return null;
  }

  // should use SOL ?

  return (
    <StyledUserBadge>
      <span>
        {formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL
      </span>
      <div className="wallet-key">
        <span style={{height: "100%", display: "inline-block", paddingRight: 4}}>{shortenAddress(`${wallet.publicKey}`)}</span>
        <Identicon address={wallet.publicKey.toBase58()} />
      </div>
    </StyledUserBadge>
  );
};

const StyledUserBadge = styled.div`
  // for wallet wrapper
  padding-left: 0.7rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  white-space: nowrap;

  .wallet-key {
    padding: 0.1rem 0.5rem 0.1rem 0.7rem;
    margin-left: 0.3rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
  }
`;
