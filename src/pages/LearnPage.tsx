import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from 'antd'
import { CheckOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { PageHeader } from '../components/PageHeader/PageHeader'
import lessonItems from '../data/learn.data'
import { joyrideState } from '../atoms'
import { JoyrideState, JoyrideProgress } from '../utils/Joyride'
// import { Step } from 'react-joyride'

const LearnPage = () => {
  const { progress, steps } = useRecoilValue(joyrideState)
  const setJoyrideState = useSetRecoilState(joyrideState)

  const history = useHistory()

  const handleItemClick = (lessonId: string) => {
    // Begin intro with the given id
    let activeSteps = steps[lessonId]
    if(!activeSteps) {
      alert("error starting lesson")
      return;
    }

    setJoyrideState(oldJoyride => ({
      ...oldJoyride,
      isJoyrideActive: true,
      activeLessonId: lessonId
    }))

    let lesson = lessonItems[lessonId]
    if(!lesson) return;
    if(lesson.internalLink) {
      history.push(lesson.internalLink)
    }
  }

  const isLessonComplete = (lessonId: string, numberOfLessons: number) => {
    if(progress[lessonId] && progress[lessonId].progress > 0)
      return progress[lessonId].progress > progress[lessonId].maxSteps
    return false;
  }

  const getLessonProgress = (lessonId: string) => {
    if(progress[lessonId] && progress[lessonId].progress > 0) return progress[lessonId].progress.toString()
    return "0"
  }

  return (
    <StyledLearnPage>
      <div className="lessons-container">
        <div id="tour-1-question">
          <PageHeader title="Learn" />
        </div>
        {lessonItems.map((lessonItem, index) => (
          <div className="lesson-item" onClick={() => handleItemClick(lessonItem.id)}>
            {/* Icon Left */}
            <div className="lesson-icon-container">
              {isLessonComplete(lessonItem.id, lessonItem.numberOfLessons) ? (
                <CheckOutlined type="success" style={{fontSize: 24, opacity: .9}} />
              ) : (
                <PlayCircleOutlined style={{fontSize: 24, opacity: .9 }} />
              )}
            </div>

            {/* Title Center */}
            <div className="lesson-title-container">
              <Typography>{index}: {lessonItem.lessonTitle}</Typography>
            </div>

            {/* Number of Lessons */}
            <div className="lesson-progress-container">
              <Typography>{getLessonProgress(lessonItem.id)} / {lessonItem.numberOfLessons}</Typography>
            </div>
          </div>
        ))}
      </div>
    </StyledLearnPage>
  )
}

const StyledLearnPage = styled.div`
  .lessons-container {
    width: 100%;
    margin: auto;
  }
  .lesson-item {
    background: ${props => props.theme.colors.bg2};
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.colors.bg1};
    transition: .05s ease-in-out border-color;

    &:hover {
      transition: .05s ease-in-out border-color;
      border-color: ${props => props.theme.colors.purple2};
    }

    .lesson-title-container {
      flex: 1;
      font-size: 20px;
      margin-left: 20px;
      margin-right: 10px;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }
    .lesson-progress-container {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  @media(min-width: ${props => props.theme.breakpoints.md}px) {
    .lessons-container {
      width: 50%;
    }
  }
`

export default LearnPage