import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { onboardingQuestions, OnboardingQuestion, QuestionAnswer } from '../data/onboarding.data'
// import { stepsIdMap } from '../data/steps.data'
import { activeIndexState, joyrideState } from '../atoms'

interface Props {
  exitOnboarding: () => void
}

export const UserOnboarding: React.FC<Props> = ({
  exitOnboarding
}) => {
  const history = useHistory()

  const [joyrideData, setJoyrideData] = useRecoilState(joyrideState)
  const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState)
  const [question, setQuestion] = useState<OnboardingQuestion | undefined>(undefined)
  
  useEffect(() => {
    if(onboardingQuestions[activeIndex]) {
      setQuestion(onboardingQuestions[activeIndex])
    }
  }, [activeIndex])

  // move question click function here? pass in the data from the questions
  const handleQuestionClick = (question: OnboardingQuestion, answer: QuestionAnswer) => {
    if(answer.tutorialId) {
      // do tutorial
      if(joyrideData.steps[answer.tutorialId]) {
        console.log('tutorial starting:', joyrideData.steps[answer.tutorialId])
        setJoyrideData(oldJoyrideState => ({
          ...oldJoyrideState,
          isJoyrideActive: true,
          activeLessonId: answer.tutorialId || "0"
        }))
        history.push("/")
      }
    }
    else if(answer.nextQuestionId) {
      setActiveIndex(Number(answer.nextQuestionId));
    }
    else if(!(answer.externalLink || answer.internalLink)) {
      // close onboarding and reset active onboarding index
      exitOnboarding()
      setActiveIndex(0)
    }
  }
  
  return (
    <StyledUserOnboarding className ="user-onboarding-container" >
      {question && (
        <div className="onboarding-question-item">
          <Typography.Title level={3} id="tour-1-question" className="user-onboarding-question-text">{question.question}</Typography.Title>
          <div className="user-onboarding-button-bar">
            {question.answers.map((answer, index) => {
              if(answer.internalLink) {
                return (
                  <Link to={answer.internalLink} key={`${index}-${answer.text}`}>
                    <Button key={`${index}-${answer.text}`} size="large" shape="round" className="user-onboarding-answer-button" onClick={() => handleQuestionClick(question, answer)}>
                      {answer.text}
                    </Button>
                  </Link>
                )
              }
              else if(answer.externalLink) {
                return (
                  <a href={answer.internalLink} key={`${index}-${answer.text}`} target="_blank" rel="noopener noreferrer">
                    <Button key={`${index}-${answer.text}`} size="large" shape="round" className="user-onboarding-answer-button" onClick={() => handleQuestionClick(question, answer)}>
                      {answer.text}
                    </Button>
                  </a>
                )
              }
              return (
                <Button key={`${index}-${answer.text}`} size="large" shape="round" className="user-onboarding-answer-button" onClick={() => handleQuestionClick(question, answer)}>
                  {answer.text}
                </Button>
              )
            })}
          </div>

          {question.helperQuestion && (
            <Link to={question.helperQuestion.faqLink}>
              <Typography.Paragraph className="user-onboarding-alternate-question">{question.helperQuestion.text}</Typography.Paragraph>
            </Link>
          )}

          <div className="user-onboarding-exit">
            <Button
              className="user-onboarding-exit-button"
              type="ghost"
              shape="circle"
              icon={<CloseOutlined />}
              style={{border: "none", outline: "none"}}
              onClick={exitOnboarding}
            />
          </div>
        </div>
      )}
    </StyledUserOnboarding>
  )
}

const StyledUserOnboarding = styled.div`
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
    color: ${props => props.theme.colors.purple2};
    transition: .15s ease-in-out text-decoration;

    &:hover {
      text-decoration: underline;
      transition: .15s ease-in-out text-decoration;
    }
  }
  
  .user-onboarding-exit {
    position: absolute;
    top: 3px;
    right: 3px;

    .user-onboarding-exit-button {
      color: ${props => props.theme.colors.font};

      &:hover {
        background-color: ${props => props.theme.colors.lightGray};
      }
    }
  }
`