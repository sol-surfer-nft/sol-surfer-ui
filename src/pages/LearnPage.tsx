import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CheckOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { PageHeader } from '../components/PageHeader/PageHeader'
import lessonItems from '../data/learn.data'

interface LessonProgress {
  lessonId: string
  progress: number
}

const initialProgress: LessonProgress[] = [
  {
    lessonId: "1",
    progress: 4
  }
]

const LearnPage = () => {
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(initialProgress)

  useEffect(() => {
    // query local storage for lesson item progress
    console.log('lessons mounted. query local storage for user progress')
  }, [])

  const handleItemClick = (lessonId: string) => {
    console.log('clicked lesson with id:', lessonId)
    // Begin intro with the given id
  }

  const isLessonComplete = (lessonId: string, numberOfLessons: number) => {
    let lesson = lessonProgress.find(progressItem => progressItem.lessonId === lessonId);
    if(lesson && lesson.progress >= numberOfLessons)
      return true;
    return false;
  }

  const getLessonProgress = (lessonId: string) => {
    let lesson = lessonProgress.find(progressItem => progressItem.lessonId === lessonId);
    if(lesson) return lesson.progress;
    return "0";
  }

  return (
    <StyledLearnPage>
      <PageHeader title="Learn Page!" />
      <div className="lessons-container">
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
    width: 50%;
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
`

export default LearnPage