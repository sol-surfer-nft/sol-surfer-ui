import React from 'react'
import styled from 'styled-components'
import { Typography, Button, Collapse } from 'antd'
import { ExclamationCircleFilled, RedoOutlined } from '@ant-design/icons' // FrownFilled

interface Props {
  errorMessage?: string
}
export const ErrorSurface: React.FC<Props> = ({
  errorMessage,
}) => {
  return (
    <StyledErrorSurface>
      <Typography.Title className="error-title">
        <ExclamationCircleFilled style={{fontSize: 36}} />
        <span style={{marginLeft: 20}}>Something went wrong</span>
      </Typography.Title>
      {/* If error message, allow user to see details */}
      {errorMessage && (
        <Collapse bordered={false} defaultActiveKey={['1']} className="error-collapse-container">
          <Collapse.Panel header="See more info" key="1">
            {errorMessage}
          </Collapse.Panel>
        </Collapse>
      )}
      <Typography.Title level={2} className="error-title">Please Try Again Later</Typography.Title>
      <Button href="https://solsurfer.xyz" className="error-action-button" size="large" icon={<RedoOutlined style={{fontSize: 24}} />}>Refresh Page</Button>
    </StyledErrorSurface>
  )
}

const StyledErrorSurface = styled.div`
  width: 100%;
  text-align: center;
  margin: 4rem;
  padding: 2rem;

  .error-title {
    margin-bottom: 2rem;
  }
  .error-action-button {
    margin-bottom: 1rem;
  }
  .error-collapse-container {
    margin-bottom: 2rem;
  }
`