import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Joyride, { CallBackProps } from 'react-joyride'
// import { useHistory, useLocation } from 'react-router-dom'
import { joyrideState } from '../atoms'

interface Props {

}

export const JoyrideContainer: React.FC<Props> = () => {
  // const history = useHistory()
  // const location = useLocation()
  const { steps, isJoyrideActive, activeLessonId } = useRecoilValue(joyrideState)
  const setJoyrideState = useSetRecoilState(joyrideState)

  const handleJoyrideCallback = (event: CallBackProps) => {
    if(event.action === "next" && event.lifecycle === "complete") {
      // user clicked next option
      console.log('question index:', event.index)

      // let activeSteps = steps[activeLessonId];

      // TODO: save to local storage based on callback action, lifecycle, and other helpful properties in joyride object
      

      // get question data from the index
      // if(steps[activeLessonId][event.index]) {
      //   // get action info from the step
      //   const question = steps[activeLessonId][event.index]
      //   if(question.internalLink) {
      //     console.log('internal link:', question.internalLink)
      //     console.log('location pathname:', location.pathname)
      //     if(location.pathname.includes(question.internalLink) && location.pathname !== "/") {
      //       // then user has already completed the step;
      //     }
      //     else {
      //       history.push(question.internalLink)
      //       console.log('is pushing')
      //     }
      //   }
      // }
    }
    console.log('react joyride callback event:', event)
    if(event.lifecycle === "complete" && event.status === "finished") {
      setJoyrideState(oldJoyrideState => ({...oldJoyrideState, isJoyrideActive: false }))
    }
    else if(event.action === "stop") {
      setJoyrideState(oldJoyride => ({...oldJoyride, isJoyrideActive: false }))
    }
  }

  return (
    <Joyride
      continuous
      showProgress
      showSkipButton
      debug
      // stepIndex={progress[activeLessonId]}
      styles={{
        options: {
          primaryColor: "#5D5FEF"
        }
      }}
      run={isJoyrideActive}
      steps={steps && activeLessonId && steps[Number(activeLessonId)] ? steps[Number(activeLessonId)] : []}
      callback={handleJoyrideCallback}
    />
  )
}