import { TourSteps } from '../data/steps.data'

export interface JoyrideState {
  steps: TourSteps;
  progress: {
      [id: string]: number
  };
  isJoyrideActive: boolean;
  activeLessonId: string;
}
export interface JoyrideProgress {
  [id: string]: number
}

export const incrementJoyrideState = (progressId: string, progress: JoyrideProgress) => {
  return {
    ...progress,
    [progressId]: progress[progressId] + 1
  }
}

export const decrementJoyrideState = (progressId: string, progress: JoyrideProgress) => {
  return {
    ...progress,
    [progressId]: progress[progressId] > 0 ? progress[progressId] - 1 : 0
  }
}