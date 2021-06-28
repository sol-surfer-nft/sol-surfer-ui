import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { Button, Tooltip } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'
import MarketplacePage from './MarketplacePage'
import { UserOnboarding } from '../components/UserOnboarding'
import { RoundAlert } from '../components/RoundAlert'
import { showOnboardingState, showRoundAlertState } from '../atoms'

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useRecoilState(showOnboardingState)
  const [showRoundAlert, setShowRoundAlert] = useRecoilState(showRoundAlertState)

  useEffect(() => {
    let hasSeenOnboarding = localStorage.getItem("sol-surfer-has-seen-onboarding")
    if(hasSeenOnboarding && hasSeenOnboarding === "true") {
      setShowOnboarding(false)
    }
  }, [setShowOnboarding])

  const exitOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("sol-surfer-has-seen-onboarding", "true")
  }

  const startOnboarding = () => {
    window.scrollTo(0, 0)
    setShowOnboarding(true)
    localStorage.setItem("sol-surfer-has-seen-onboarding", "false")
  }

  const closeRoundAlert = () => {
    setShowRoundAlert(false)
  }

  return (
    <HomePageStyled>
      {showRoundAlert && (
        <RoundAlert close={closeRoundAlert} />
      )}
      {showOnboarding ? (
        <UserOnboarding exitOnboarding={exitOnboarding} />
      ) : (
        // Little widget in bottom right corner to begin onboarding
        <div className="widget-container">
          <Tooltip title="Start Onboarding">
            <Button
              icon={<QuestionOutlined style={{fontSize: 24}} />}
              shape="circle"
              size="large"
              type="primary"
              onClick={startOnboarding}
            />
          </Tooltip>
        </div>
      )}

      <MarketplacePage />
    </HomePageStyled>
  )
}

const HomePageStyled = styled.div`
  .widget-container {
    position: fixed;
    z-index: 10000;
    bottom: 50px;
    right: 50px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}px) {
    .user-onboarding-container {
      width: 75%;
    }
    .widget-container {
      height: 50px;
      width: 50px;
    }
  }
`

export default HomePage