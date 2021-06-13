import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { ExclamationCircleFilled, RedoOutlined } from '@ant-design/icons' // FrownFilled
import { errorState } from '../../atoms'

export const ErrorSurface = ({
  children
}) => {
  const { hasError } = useRecoilValue(errorState)

  if(hasError) {
    return (
      <StyledErrorSurface>
        <Typography.Title className="error-title">
          <ExclamationCircleFilled style={{fontSize: 36}} />
          <span style={{marginLeft: 20}}>Something went wrong</span>
        </Typography.Title>
        <Typography.Title level={2} className="error-title">Please Try Again Later</Typography.Title>
        <Button href="https://solsurfer.xyz" className="error-action-button" size="large" icon={<RedoOutlined style={{fontSize: 24}} />}>Refresh Page</Button>
      </StyledErrorSurface>
    )
  }

  return children;
}

const StyledErrorSurface = styled.div`
  width: 100%;
  text-align: center;
  margin: 4rem;
  padding: 2rem;
  background: ${props => props.theme.colors.bg2};

  .error-title {
    margin-bottom: 2rem;
  }
  .error-action-button {
    margin-bottom: 1rem;
  }
`