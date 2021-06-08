import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { CloseOutlined, QuestionOutlined } from '@ant-design/icons'
import MarketplacePage from './MarketplacePage'
import { onboardingQuestions as questions, OnboardingQuestion } from '../data/onboarding.data'

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [onboardingQuestions, setOnboardingQuestions] = useState<OnboardingQuestion[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // TODO: interface with local storage to detect if onboarding needed
    let hasSeenOnboarding = localStorage.getItem("sol-surfer-has-seen-onboarding")
    setOnboardingQuestions(questions)
    if(hasSeenOnboarding && hasSeenOnboarding === "true") {
      setShowOnboarding(false)
    }
  }, [])

  const exitOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("sol-surfer-has-seen-onboarding", "true")
  }

  const startOnboarding = () => {
    window.scrollTo(0, 0)
    setShowOnboarding(true)
    localStorage.setItem("sol-surfer-has-seen-onboarding", "false")
  }

  const handleQuestionClick = () => {
    // TODO: make point to next question index, as provided by onboardingQuestions object
    setActiveIndex(prev => prev + 1);
    if(activeIndex === onboardingQuestions.length - 1) {
      setShowOnboarding(false)
      setActiveIndex(0);
    }
  }

  return (
    <HomePageStyled>
      {showOnboarding ? (
        onboardingQuestions.map((question, index) => index===activeIndex && (
          <div className="user-onboarding-container">
              <>
                <Typography.Title level={3} id="tour-1-question" className="user-onboarding-question-text">{question.question}</Typography.Title>
                <div className="user-onboarding-button-bar">
                  {question.answers.map(answer => (
                    <Button key={`${index}-${answer.text}`} size="large" shape="round" className="user-onboarding-answer-button" onClick={handleQuestionClick}>{answer.text}</Button>
                  ))}
                </div>

                {question.helperQuestion && (
                  <Link to={question.helperQuestion.faqLink}>
                    <Typography.Paragraph className="user-onboarding-alternate-question">{question.helperQuestion.text}</Typography.Paragraph>
                  </Link>
                )}

                <div className="user-onboarding-exit">
                  <Button onClick={exitOnboarding} type="ghost" ghost shape="circle" icon={<CloseOutlined />} style={{border: "none", outline: "none"}} />
                </div>
              </>
          </div>
        ))
      ) : (
        // Little widget in bottom right corner to begin onboarding
        <div className="widget-container">
          <Button
            icon={<QuestionOutlined style={{fontSize: 24}} />}
            shape="circle"
            size="large"
            type="primary"
            onClick={startOnboarding}
          />
        </div>
      )}

      <MarketplacePage />
    </HomePageStyled>
  )
}

const HomePageStyled = styled.div`
  .user-onboarding-container {
    position: relative;
    padding: 2rem;
    padding-bottom: 1.5rem;
    margin: 2rem auto;
    width: 100%;
    border-radius: 1px;
    border: 1px solid ${props => props.theme.colors.purple2};
    background: ${props => props.theme.colors.bg2};

    .user-onboarding-question-text {
      text-align: center;
    }
    .user-onboarding-button-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
    }
    .user-onboarding-answer-button {
      margin-right: 2rem;
      margin-left: 2rem;
    }
    .user-onboarding-alternate-question {
      text-align: center;
      margin-top: 2rem;
      margin-bottom: 0;
      padding-bottom: 0;
      font-size: 18px;
      color: ${props => props.theme.colors.purple3};
      transition: .15s ease-in-out text-decoration;

      &:hover {
        text-decoration: underline;
        transition: .15s ease-in-out text-decoration;
      }
    }
  }
  .user-onboarding-exit {
    position: absolute;
    top: 3px;
    right: 3px;
  }

  .widget-container {
    position: fixed;
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
  }
`

export default HomePage