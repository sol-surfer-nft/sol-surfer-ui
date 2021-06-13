import React, { Suspense } from 'react';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Routes } from './routes';

import { ConnectionProvider } from './contexts/connection'
import { WalletProvider } from './contexts/wallet'
import { AccountsProvider } from './contexts/accounts'
import { MarketProvider } from './contexts/market'

import './App.less';

export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle />
      <ErrorBoundary>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <Suspense fallback={() => <Spin size="large" />}>
                  <Routes />
                </Suspense>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
