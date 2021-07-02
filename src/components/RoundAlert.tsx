import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface RoundAlertProps {
  close?: () => void
}

export const RoundAlert: React.FC<RoundAlertProps> = ({
  close
}) => {

  return (
    <RoundAlertLabel>
      <div className="round-alert-container">
        <Typography.Paragraph style={{fontWeight:"bold", marginRight: 5, color:"#fff", display:'inline'}}>Localnet Only</Typography.Paragraph>
        <Typography.Paragraph style={{color: "#fff", fontWeight: 400, display: "inline"}}>This app is still under development</Typography.Paragraph>
        {close && (
          <div className="close-container">
            <CloseOutlined onClick={() => close()} />
          </div>
        )}
      </div>
    </RoundAlertLabel>
  )
}

const RoundAlertLabel = styled.div`
  text-align: center;
  padding-top: 20px;

  .round-alert-container {
    font-family: 'Open Sans', sans-serif;
    display: inline-block;
    border-radius: 4em;
    padding: 9px 22px;
    padding-right: 44px;
    background-color: rgba(255, 255, 255, 0.15);
    position: relative;

    .close-container {
      position: absolute;
      right: 12px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
  
      // &:hover {
      //   background: 
      // }
    }
  }
`;