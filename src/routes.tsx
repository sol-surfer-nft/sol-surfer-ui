import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { theme, darkTheme } from './styles/themes'
import Joyride, { CallBackProps, } from 'react-joyride' //  ACTIONS, EVENTS, LIFECYCLE, STATUS
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

// TODO: Remove old Serum Pages
// import ListNewMarketPage from './pages/ListNewMarketPage';
// import NewPoolPage from './pages/pools/NewPoolPage';
// import PoolPage from './pages/pools/PoolPage';
// import PoolListPage from './pages/pools/PoolListPage';
// import BalancesPage from './pages/BalancesPage';
// import ConvertPage from './pages/ConvertPage';
// import TradePage from './pages/TradePage';
// import OpenOrdersPage from './pages/OpenOrdersPage';
import { ContentLayout } from './components/ContentLayout'
import { darkModeState, joyrideState, nftItemsState } from './atoms'
import { generateRandomNft } from './utils/generateRandomNft'
import { colors } from './styles/colors';

const MIN_NFT_LENGTH = 5

export function Routes() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState)
  const [{ steps, isJoyrideActive, activeLessonId }, setJoyrideState] = useRecoilState(joyrideState)
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

  const handleJoyrideCallback = (event: CallBackProps) => {
    // console.log('react joyride callback event:', event)
    if(event.lifecycle === "complete" && event.status === "finished") {
      setJoyrideState(oldJoyrideState => ({...oldJoyrideState, isJoyrideActive: false }))
    }
    else if(event.action === "stop") {
      setJoyrideState(oldJoyride => ({...oldJoyride, isJoyrideActive: false }))
    }
  }

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <HashRouter basename={'/'}>
        {/* ToDo: Move to its own component */}
        <Joyride
          continuous
          showProgress
          showSkipButton
          // stepIndex={progress[activeLessonId]}
          styles={{
            options: {
              primaryColor: colors.purple1
            }
          }}
          run={isJoyrideActive}
          steps={steps && activeLessonId && steps[activeLessonId] ? steps[activeLessonId] : []}
          callback={handleJoyrideCallback}
        />
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
