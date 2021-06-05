import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { theme, darkTheme } from './styles/themes'

import BasicLayout from './components/BasicLayout';

import HomePage from './pages/HomePage';
import AddNFTPage from './pages/AddNFTPage';
import MarketplacePage from './pages/MarketplacePage';
import NFTDetailPage from './pages/NFTDetailPage';
import GalleryPage from './pages/GalleryPage';
import LearnPage from './pages/LearnPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';

// TODO: Remove old Serum Pages
import ListNewMarketPage from './pages/ListNewMarketPage';
import NewPoolPage from './pages/pools/NewPoolPage';
import PoolPage from './pages/pools/PoolPage';
import PoolListPage from './pages/pools/PoolListPage';
import BalancesPage from './pages/BalancesPage';
import ConvertPage from './pages/ConvertPage';
import TradePage from './pages/TradePage';
import OpenOrdersPage from './pages/OpenOrdersPage';

export function Routes() {
  return (
    // TODO: toggle theme with context
    <StyledThemeProvider theme={darkTheme}>
      <HashRouter basename={'/'}>
        <BasicLayout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/add-nft" component={AddNFTPage} />
            <Route exact path="/marketplace" component={MarketplacePage} />
            <Route exact path="/nft-gallery" component={GalleryPage} />
            <Route exact path="/marketplace/:nft-id" component={NFTDetailPage} />
            <Route exact path="/learn" component={LearnPage} />
            <Route exact path="/faq" component={FAQPage} />

            {/* TODO: Remove old Serum Routes */}
            <Route exact path="/market/:marketAddress">
              <TradePage />
            </Route>
            <Route exact path="/orders" component={OpenOrdersPage} />
            <Route exact path="/balances" component={BalancesPage} />
            <Route exact path="/convert" component={ConvertPage} />
            <Route
              exact
              path="/list-new-market"
              component={ListNewMarketPage}
            />
            <Route exact path="/pools">
              <PoolListPage />
            </Route>
            <Route exact path="/pools/new">
              <NewPoolPage />
            </Route>
            <Route exact path="/pools/:poolAddress">
              <PoolPage />
            </Route>
            
            {/* Not Found catch-all, prompts to redirect user back to Home */}
            <Route path="/">
              <NotFoundPage />
            </Route>
          </Switch>
        </BasicLayout>
      </HashRouter>
    </StyledThemeProvider>
  );
}
