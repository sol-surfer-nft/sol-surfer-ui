import React, { Suspense } from 'react';
import { ConnectionProvider } from './utils/connection';
import { WalletProvider } from './utils/wallet';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes } from './routes';
import { PreferencesProvider } from './utils/preferences';
import './App.less';
// import AppProvider from './context/AppProvider'

export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle />
      <ErrorBoundary>
        <ConnectionProvider>
          <WalletProvider>
            <PreferencesProvider>
              <Suspense fallback={() => <Spin size="large" />}>
                <Routes />
              </Suspense>
            </PreferencesProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
