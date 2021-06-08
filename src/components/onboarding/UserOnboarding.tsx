import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export const UserOnboarding = () => {
  const exitOnboarding = () => {
    
  }

  return (
    <StyledUserOnboarding>
      <div className="user-onboarding-container">
        <Typography.Title level={3} id="tour-1-question" className="user-onboarding-question-text">Do you have a solana wallet?</Typography.Title>
        <div className="user-onboarding-button-bar">
          <Button size="large" shape="round" className="user-onboarding-answer-button" onClick={exitOnboarding}>Yes</Button>
          <Button size="large" shape="round" className="user-onboarding-answer-button" onClick={exitOnboarding}>No</Button>
        </div>

        <Link to="/faq">
          <Typography.Paragraph className="user-onboarding-alternate-question">What is a Solana Wallet?</Typography.Paragraph>
        </Link>

        <div className="user-onboarding-exit">
          <Button onClick={exitOnboarding} type="ghost" ghost shape="circle" icon={<CloseOutlined />} style={{border: "none", outline: "none"}} />
        </div>
      </div>
    </StyledUserOnboarding>
  )
}

const StyledUserOnboarding = styled.div`

`