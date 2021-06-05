import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import MarketplacePage from './MarketplacePage'

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    // TODO: interface with local storage to detect if onboarding needed

  }, [])

  return (
    <HomePageStyled>
      {showOnboarding && (
        <div className="user-onboarding-container">
          <p>user onboarding here</p>
          <Button onClick={() => setShowOnboarding(false)}>Dismiss</Button>

          <div className="user-onboarding-exit">
            <Button type="ghost" ghost shape="circle" icon={<CloseOutlined />} style={{border: "none", outline: "none"}} />
          </div>
        </div>
      )}

      <MarketplacePage />
    </HomePageStyled>
  )
}

const HomePageStyled = styled.div`
  .user-onboarding-container {
    padding: 2rem;
    margin: 2rem auto;
    width: 75%;
    border: 1px solid #7879F1;  // TODO: Get THEME Color Here for Dark Mode!
    position: relative;
  }
  .user-onboarding-exit {
    position: absolute;
    top: 3px;
    right: 3px;
  }
`

export default HomePage