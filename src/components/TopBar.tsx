import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import AppSearch from './AppSearch';
import learnItems from '../data/learn.data';
import { colors } from '../styles/colors';

const Wrapper = styled.div`
  // background-color: #0d1017;
  background-color: ${props => props.theme.colors.bg2};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const EXTERNAL_LINKS = {
  '/docs': 'https://gitbook.com',
};

export default function TopBar() {
  const { connected, wallet } = useWallet();
  const {
    endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [searchFocussed, setSearchFocussed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS) && e.key[0] !== '_') {
        history.push(e.key);
      }
    },
    [history],
  );

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then((result) => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleLearnItemClick = (event) => {
    console.log('learn item clicked with event:', event);
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <LogoWrapper onClick={() => history.push('/')}>
          <img src={logo} alt="solsurfer logo" />
          {'SolSurfer'}
        </LogoWrapper>
        <Menu
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[location.pathname]}
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          {(!searchFocussed || location.pathname === '/add-nft') && (
            <Menu.Item
              id="tour-2-add-nft"
              key="/add-nft"
              style={{ margin: '0 10px 0 20px', textTransform: 'uppercase' }}
            >
              Add Nft
            </Menu.Item>
          )}
          {(!searchFocussed || location.pathname === '/nft-gallery') && (
            <Menu.Item
              key="/nft-gallery"
              style={{ margin: '0 10px', textTransform: 'uppercase' }}
            >
              Gallery
            </Menu.Item>
          )}
          {(!searchFocussed || location.pathname === '/faq') && (
            <Menu.Item
              key="/faq"
              style={{ margin: '0 10px', textTransform: 'uppercase' }}
            >
              Faq
            </Menu.Item>
          )}
          {!searchFocussed && (
            <Menu.SubMenu
              key="/learn"
              title={<span id="tour-1-learn">Learn</span>}
              onTitleClick={() => history.push('/learn')}
              style={{ margin: '0 0px 0 10px', textTransform: 'uppercase', background: '#212121 !important' }}
            >
              {learnItems.map((learnItem) => (
                <Menu.Item
                  key={`_learn-${learnItem.id}-${learnItem.lessonTitle}`}
                  style={{background: "#212121 !important"}}
                  onClick={handleLearnItemClick}
                >
                  {learnItem.lessonTitle}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )}
          {!searchFocussed && (
            <Menu.Item
              key="/docs"
              style={{ margin: '0 10px', textTransform: 'uppercase' }}
            >
              <a
                href={"https://sol-surfer.gitbook.io/solsurfer/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </Menu.Item>
          )}
        </Menu>

        {/* TopBar - Right Side */}
        <div className="dark-toggle-container" style={{paddingRight: 10, paddingLeft: 5}}>
          <Tooltip title={isDarkMode ? 'go light' : 'go dark'}>
            <Button
              style={{ border: 'none', outline: 'none', textAlign:'center' }}
              type="primary"
              ghost
              shape="circle"
              size="large"
              icon={isDarkMode ? <BulbOutlined /> : <BulbFilled />}
              onClick={toggleDarkMode}
            />
          </Tooltip>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: 5,
          }}
        >
          <AppSearch
            onFocus={() => setSearchFocussed(true)}
            onBlur={() => setSearchFocussed(false)}
            focussed={searchFocussed}
            width={searchFocussed ? '350px' : '35px'}
          />
        </div>
        <div>
          <Row
            align="middle"
            style={{ paddingLeft: 5, paddingRight: 5 }}
            gutter={16}
          >
            <Col>
              <PlusCircleOutlined
                style={{ color: colors.purple2 }}
                onClick={() => setAddEndpointVisible(true)}
              />
            </Col>
            <Col>
              <Popover
                content={endpoint}
                placement="bottomRight"
                title="URL"
                trigger="hover"
              >
                <InfoCircleOutlined style={{ color: colors.purple2 }} />
              </Popover>
            </Col>
            <Col>
              <Select
                id="tour-1-mainnet"
                onSelect={setEndpoint}
                value={endpoint}
                style={{ marginRight: 8, width: '150px' }}
              >
                {availableEndpoints.map(({ name, endpoint }) => (
                  <Select.Option value={endpoint} key={endpoint}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        {connected && (
          <div>
            <Popover
              content={<Settings autoApprove={wallet?.autoApprove} />}
              placement="bottomRight"
              title="Settings"
              trigger="click"
            >
              <Button style={{ marginRight: 8 }}>
                <SettingOutlined />
                Settings
              </Button>
            </Popover>
          </div>
        )}
        <div>
          <WalletConnect />
        </div>
      </Wrapper>
    </>
  );
}
