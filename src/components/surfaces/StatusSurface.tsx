import React from 'react'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

interface IButton {
  title: string
  action: any
}
interface Props {
  title: string
  buttons?: IButton[]
  success?: boolean
  error?: boolean
}

export const StatusSurface: React.FC<Props> = ({
  title,
  buttons,
  success,
  error,
}) => {
  return (
    <StyledStatusSurface>
      {success && (
        <div className="status-image-container">
          <CheckCircleOutlined style={{fontSize: 48, color: "#52c41a"}} />
        </div>
      )}
      {error && (
        <div className="status-image-container">
          <ExclamationCircleOutlined style={{fontSize: 48, color: "#ff7875"}} />
        </div>
      )}
      <div className="status-surface-container">
        <Typography.Title level={1} className="submitted-status-text">{title}</Typography.Title>
        {buttons && (
          <div className="submitted-button-bar">
          {buttons.map((button, index) => (
            <Button size="large" className={`submitted-status-button ${index !== buttons.length - 1 && "ssb-1"}`} onClick={button.action}>{button.title}</Button>
          ))}
          </div>
        )}
      </div>
    </StyledStatusSurface>
  )
}

const StyledStatusSurface = styled.div`
  margin-top: 2rem;

  .status-surface-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .status-image-container {
    padding-top: 2rem;
    text-align: center;
  }

  background: ${props => props.theme.colors.bg2};

  .submitted-button-bar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submitted-status-text {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .ssb-1 {
    margin-right: 1.5rem;
  }
`