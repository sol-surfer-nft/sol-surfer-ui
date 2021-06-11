import React, { Suspense } from 'react';
import { ConnectionProvider } from './utils/connection';
import { WalletProvider } from './utils/wallet';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes } from './routes';
import { PreferencesProvider } from './utils/preferences';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import './App.less';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
}

export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle />
      <ErrorBoundary>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme="dark">
          <ConnectionProvider>
            <WalletProvider>
              <PreferencesProvider>
                <Suspense fallback={() => <Spin size="large" />}>
                  <Routes />
                </Suspense>
              </PreferencesProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeSwitcherProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
