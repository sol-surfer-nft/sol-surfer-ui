import React, { useState } from 'react';
import { Switch, Typography } from 'antd';
// import { usePreferences } from '../utils/preferences';

const { Paragraph } = Typography;

export default function Settings(/*{ autoApprove }*/) {
  // const { autoSettleEnabled, setAutoSettleEnabled } = usePreferences();
  const [mockSetting, setMockSetting] = useState(false);

  return (
    <div>
      <Switch
        style={{ marginRight: 10 }}
        checked={mockSetting}
        onChange={() => setMockSetting((prev) => !prev)}
      />{' '}
      Settings Not Implemented Yet
      {mockSetting && (
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
          You found an easter egg from the developer!
        </Paragraph>
      )}
    </div>
  );
}
