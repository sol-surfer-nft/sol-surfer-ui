import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { theme, darkTheme } from './styles/themes'
import Joyride, { CallBackProps, } from 'react-joyride' //  ACTIONS, EVENTS, LIFECYCLE, STATUS

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
import { darkModeState, joyrideState } from './atoms'
import { colors } from './styles/colors';

export function Routes() {
  const isDarkMode = useRecoilValue(darkModeState)
  const { steps, isJoyrideActive, activeLessonId } = useRecoilValue(joyrideState)
  const setJoyrideState = useSetRecoilState(joyrideState)
  
  const handleJoyrideCallback = (event: CallBackProps) => {
    console.log('react joyride callback event:', event)
    if(event.lifecycle === "complete" && event.status === "finished") {
      setJoyrideState(oldJoyrideState => ({...oldJoyrideState, isJoyrideActive: false }))
    }
    else if(event.action === "stop") {
      setJoyrideState(oldJoyride => ({...oldJoyride, isJoyrideActive: false }))
    }
  }

  // const toggleJoyride = (lessonId: string) => {
  //   setJoyrideState(oldJoyride => ({...oldJoyride, activeLessonId: lessonId, isJoyrideActive: !oldJoyride.isJoyrideActive }))
  // }

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
            {/* <Button onClick={() => toggleJoyride("0")}>{(isJoyrideActive && activeLessonId==="0") ? "end tutorial 1" : "start tutorial 1"}</Button>
            <Button onClick={() => toggleJoyride("1")}>{(isJoyrideActive && activeLessonId==="1") ? "end tutorial 2" : "start tutorial 2"}</Button> */}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/add-nft" component={AddNFTPage} />
              <Route exact path="/sell-nft/" component={SellNFTPage} />
              <Route exact path="/sell-nft/:nftId" component={SellNFTPage} />
              <Route exact path="/marketplace" component={MarketplacePage} />
              <Route exact path="/nft-gallery" component={GalleryPage} />
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
