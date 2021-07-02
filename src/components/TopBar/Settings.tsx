import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components'
import { Switch, Typography } from 'antd';
import { isDevModeState } from '../../atoms';

// const settingsItems = [
//   "devMode",
//   // ...
// ]

export const Settings = () => {
  const [mockSetting, setMockSetting] = useState(false);
  const [isDevMode, setDevMode] = useRecoilState(isDevModeState);

  useEffect(() => {
    // get settings from localstorage, can use 'settingsItems' when more settings items exist
    const savedDevMode = localStorage.getItem("solsurfer.settings.devMode")
    if(savedDevMode) {
      if(savedDevMode === "true") setDevMode(true)
    }
  }, [setDevMode])

  useEffect(() => {
    localStorage.setItem("solsurfer.settings.devMode", isDevMode ? "true" : "false")
  }, [isDevMode])

  const changeDevMode = (isActive) => {
    setDevMode(isActive);
  };

  return (
    <StyledSettings className="topbar-settings-container">
      {/* Dev Mode */}
      <p className="topbar-settings-item">
        <Switch
          className="topbar-settings-switch"
          checked={isDevMode}
          onChange={changeDevMode}
        />{' '}
        Dev Mode:
        {isDevMode && (
          <Typography.Paragraph className="settings-helper-text">
            Dev Activated!
          </Typography.Paragraph>
        )}
      </p>
      {/* Mock Settings */}
      <p className="topbar-settings-item">
        <Switch
          className="topbar-settings-switch"
          checked={mockSetting}
          onChange={() => setMockSetting((prev) => !prev)}
        />{' '}
        Click Me
        {mockSetting && (
          <Typography.Paragraph className="settings-helper-text">
            You found an easter egg from the developer!
          </Typography.Paragraph>
        )}
      </p>
    </StyledSettings>
  );
}

const StyledSettings = styled.div`
  .topbar-settings-switch {
    margin-right: 10px;
  }

  .settings-helper-text {
    color: rgba(255,255,255,0.5);
    margin-top: 10px;
  }
`