import React from 'react'
import { ErrorSurface } from './surfaces/ErrorSurface'

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log('error received in global error boundary')
    console.log('error:', error)
    console.log('errorInfo:', errorInfo)
  }

  render() {
    if(this.state.hasError) {
      return <ErrorSurface />
    }
    return this.props.children
  }
}