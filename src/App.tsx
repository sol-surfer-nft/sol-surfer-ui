import React, { Suspense } from 'react';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import { ErrorSurface } from './components/surfaces/ErrorSurface';
import { Routes } from './routes';
import { ConnectionProvider } from './utils/connection';
import { WalletProvider } from './utils/wallet';
import { PreferencesProvider } from './utils/preferences';
import './App.less';

export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle />
      <ErrorSurface>
        {/* TODO:
          Rip out Serum Providers:
          [x] ConnectionProvider
          [x] WallerProvider
          [x] PreferencesProvider
        */}
        <ConnectionProvider>
          <WalletProvider>
            <PreferencesProvider>
              <Suspense fallback={() => <Spin size="large" />}>
                <Routes />
              </Suspense>
            </PreferencesProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ErrorSurface>
    </Suspense>
  );
}
