import React from 'react'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

interface IButton {
  title: string
  action: any
}
interface Props {
  title: string
  buttons?: IButton[]
  success?: boolean
}

export const SuccessSurface: React.FC<Props> = ({
  title,
  buttons,
  success,
}) => {
  return (
    <StyledSuccessSurface>
      {success && (
        <div className="success-image-container">
          <CheckCircleOutlined color="success" style={{fontSize: 48, color: "#52c41a"}} />
        </div>
      )}
      <div className="success-surface-container">
        <Typography.Title level={1} className="submitted-success-text">{title}</Typography.Title>
        {buttons && (
          <div className="submitted-button-bar">
          {buttons.map((button, index) => (
            <Button size="large" className={`submitted-success-button ${index !== buttons.length - 1 && "ssb-1"}`} onClick={button.action}>{button.title}</Button>
            ))}
          </div>
        )}
      </div>
    </StyledSuccessSurface>
  )
}

const StyledSuccessSurface = styled.div`
  margin-top: 2rem;

  .success-surface-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .success-image-container {
    padding-top: 2rem;
    text-align: center;
  }

  background: ${props => props.theme.colors.bg2};

  .submitted-button-bar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submitted-success-text {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .ssb-1 {
    margin-right: 1.5rem;
  }
`