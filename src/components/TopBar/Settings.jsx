import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Switch, Typography } from 'antd';
import { devModeState } from '../../atoms';

const { Paragraph } = Typography;

export default function Settings() {
  const [mockSetting, setMockSetting] = useState(false);
  const [devMode, setDevMode] = useRecoilState(devModeState);

  const changeDevMode = (isActive) => {
    setDevMode((prevMode) => ({ ...prevMode, active: isActive }));
  };

  return (
    <div className="topbar-settings-container">
      {/* Dev Mode */}
      <p>
        <Switch
          style={{ marginRight: 10 }}
          checked={devMode.active}
          onChange={changeDevMode}
        />{' '}
        Dev Mode:
        {devMode.active && (
          <Paragraph style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
            Dev Activated!
          </Paragraph>
        )}
      </p>
      {/* Mock Settings */}
      <Switch
        style={{ marginRight: 10 }}
        checked={mockSetting}
        onChange={() => setMockSetting((prev) => !prev)}
      />{' '}
      Click Me
      {mockSetting && (
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
          You found an easter egg from the developer!
        </Paragraph>
      )}
    </div>
  );
}
