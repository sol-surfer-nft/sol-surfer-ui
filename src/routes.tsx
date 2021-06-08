import React, { useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Button } from 'antd'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { /*theme,*/ darkTheme } from './styles/themes'
import Joyride, { CallBackProps, } from 'react-joyride' //  ACTIONS, EVENTS, LIFECYCLE, STATUS
import allSteps from './data/steps.data'
import { Step } from 'react-joyride'

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
import ListNewMarketPage from './pages/ListNewMarketPage';
import NewPoolPage from './pages/pools/NewPoolPage';
import PoolPage from './pages/pools/PoolPage';
import PoolListPage from './pages/pools/PoolListPage';
import BalancesPage from './pages/BalancesPage';
import ConvertPage from './pages/ConvertPage';
import TradePage from './pages/TradePage';
import OpenOrdersPage from './pages/OpenOrdersPage';
import { ContentLayout } from './components/ContentLayout'
import { colors } from './styles/colors';

export function Routes() {
  const [activeSteps, setActiveSteps] = useState<Step[]>([])
  const [isJoyrideActive, setIsJoyrideActive] = useState(false)
  
  const handleJoyrideCallback = (event: CallBackProps) => {
    console.log('react joyride callback event:', event)
    if(event.action === "stop") {
      setIsJoyrideActive(false)
    }
  }

  const getStepsById = (id: string) => allSteps[id]

  const toggleJoyride = (lessonId: string) => {
    setActiveSteps(getStepsById(lessonId))
    setIsJoyrideActive(prevActive => !prevActive)
  }

  return (
    // TODO: toggle theme with context
    <StyledThemeProvider theme={darkTheme}>
      <HashRouter basename={'/'}>
        {/* ToDo: Move to its own component */}
        <Joyride
          continuous
          showProgress
          showSkipButton
          styles={{
            options: {
              primaryColor: colors.purple1
            }
          }}
          run={isJoyrideActive}
          steps={activeSteps}
          callback={handleJoyrideCallback}
        />
        <BasicLayout>
          <ContentLayout isContainer={true}>
            <Button onClick={() => toggleJoyride("0")}>{isJoyrideActive ? "end joyride 1" : "start joyride 1"}</Button>
            <Button onClick={() => toggleJoyride("1")}>{isJoyrideActive ? "end joyride 2" : "start joyride 2"}</Button>
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
          </ContentLayout>
        </BasicLayout>
      </HashRouter>
    </StyledThemeProvider>
  );
}
