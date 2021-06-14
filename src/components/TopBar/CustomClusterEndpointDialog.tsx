import React from 'react';
import { Col, Input, Modal, Row } from 'antd';
// import { EndpointInfo } from '../../utils/types';

export default function CustomClusterEndpointDialog({
  visible,
  // testingConnection,
  // onAddCustomEndpoint,
  onClose,
}: {
  visible: boolean;
  // testingConnection: boolean;
  // onAddCustomEndpoint: (info: EndpointInfo) => void;
  onClose?: () => void;
}) {
  // const [customEndpoint, setCustomEndpoint] = useState('');
  // const [customEndpointName, setCustomEndpointName] = useState('');

  // const onSubmit = () => {
  //   const fullEndpoint = 'https://' + customEndpoint;
  //   const params = {
  //     name: customEndpointName,
  //     endpoint: fullEndpoint,
  //     custom: true,
  //   };
  //   onAddCustomEndpoint(params);
  //   onDoClose();
  // };
  const onDoClose = () => {
    // setCustomEndpoint('');
    // setCustomEndpointName('');
    onClose && onClose();
  };
  // const canSubmit = customEndpoint !== '' && customEndpointName !== '';

  return (
    <Modal
      title={'Add custom endpoint (not implemented)'}
      visible={visible}
      // onOk={onSubmit}
      okText={'Add'}
      onCancel={onDoClose}
      // okButtonProps={{ disabled: !canSubmit, loading: testingConnection }}
    >
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Input
            placeholder="Cluster Name (not implemented)"
            disabled
            // value={customEndpointName}
            // onChange={(e) => setCustomEndpointName(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Input
            placeholder="Cluster Endpoint (not implemented)"
            disabled
            // value={customEndpoint}
            addonBefore={'https://'}
            // onChange={(e) => setCustomEndpoint(e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  );
}
