import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { theme, darkTheme } from './styles/themes'
import { useThemeSwitcher } from 'react-css-theme-switcher'

import BasicLayout from './components/BasicLayout';

import HomePage from './pages/HomePage';
import AddNFTPage from './pages/AddNFTPage';
import SellNFTPage from './pages/SellNFTPage';
import MarketplacePage from './pages/MarketplacePage';
import NFTDetailPage from './pages/NFTDetailPage';
import GalleryPage from './pages/GalleryPage';
import LearnPage from './pages/LearnPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import FaucetPage from './pages/FaucetPage';

// TODO: Remove old Serum Pages
// [x] import ListNewMarketPage from './pages/ListNewMarketPage';
// [x] import NewPoolPage from './pages/pools/NewPoolPage';
// [x] import PoolPage from './pages/pools/PoolPage';
// [x] import PoolListPage from './pages/pools/PoolListPage';
// [x] import BalancesPage from './pages/BalancesPage';
// [x] import ConvertPage from './pages/ConvertPage';
// [x] import TradePage from './pages/TradePage';
// [x] import OpenOrdersPage from './pages/OpenOrdersPage';
import { JoyrideContainer } from './components/JoyrideContainer'
import { ContentLayout } from './components/ContentLayout'
import { darkModeState, nftItemsState } from './atoms'
import { generateRandomNft } from './utils/generateRandomNft'

const MIN_NFT_LENGTH = 5

export function Routes() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState)
  const [nftItems, setNftItems] = useRecoilState(nftItemsState)
  const { currentTheme, status, switcher } = useThemeSwitcher()

  useEffect(() => {
    const savedTheme = localStorage.getItem('solsurfer.theme');
    if(savedTheme) {
      if(savedTheme === "light") {
        switcher({ theme: "light" })
        setIsDarkMode(false)
      }
    }
  }, [setIsDarkMode, switcher])

  useEffect(() => {
    // Initialize the number if nft items
    if(nftItems.length < MIN_NFT_LENGTH) {
      let remainingNFTLength = MIN_NFT_LENGTH - nftItems.length;
      for(let i=remainingNFTLength; i > 0; i--) {
        let nextLength = nftItems.length + i - 1
        let newItem = generateRandomNft(nextLength);
        setNftItems(oldItems => [...oldItems, newItem])
      }
    }
  }, [nftItems.length, setNftItems])

  useEffect(() => {
    if(status === "loading")
      return;

    if(currentTheme)
      setIsDarkMode(currentTheme === "dark")
  }, [currentTheme, setIsDarkMode, status])

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <HashRouter basename={'/'}>
        <JoyrideContainer />        
        <BasicLayout>
          <ContentLayout isContainer={true}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/add-nft" component={AddNFTPage} />
              <Route exact path="/sell-nft/" component={SellNFTPage} />
              <Route exact path="/sell-nft/:nftId" component={SellNFTPage} />
              <Route exact path="/marketplace" component={MarketplacePage} />
              <Route exact path="/gallery" component={GalleryPage} />
              <Route exact path="/marketplace/:nftId" component={NFTDetailPage} />
              <Route exact path="/learn" component={LearnPage} />
              <Route exact path="/faq" component={FAQPage} />

              <Route exact path="/faucet" component={FaucetPage} />

              {/* Not Found catch-all, prompts to redirect user back to Home */}
              <Route path="/">
                <NotFoundPage />
              </Route>
            </Switch>
          </ContentLayout>
        </BasicLayout>
      </HashRouter>
    </StyledThemeProvider>
  );
}
