import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useHistory, useLocation } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher'
import styled from 'styled-components';
// import { Connection } from '@solana/web3.js';
import { Button, Col, Menu, Popover, Row, Select, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
// import WalletConnect from './ConnectWallet/WalletConnect';
import { ConnectButton } from './ConnectButton'
import { CurrentUserBadge } from './CurrentUserBadge'
import AppSearch from './AppSearch';
// import { EndpointInfo } from '../utils/types';
// import { notify } from '../utils/notifications';
import learnItems from '../../data/learn.data';
import { colors } from '../../styles/colors';
import logo from '../../assets/logo.svg';
import { darkModeState, joyrideState } from '../../atoms';

import { ENDPOINTS, useConnectionConfig } from '../../contexts/connection';
import { useWallet } from '../../contexts/wallet';

const Wrapper = styled.div`
  // background-color: #0d1017;
  background-color: ${props => props.theme.colors.bg2};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap;

  .navbar-menu-item-link {
    color: ${props => props.theme.colors.font};
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.font};
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const EXTERNAL_LINKS = {
  '/docs': 'https://sol-surfer.gitbook.io/solsurfer/',
};

export default function TopBar() {
  const { connected } = useWallet();
  const {
    endpoint,
    setEndpoint,
    // endpointInfo,
    // availableEndpoints,
    // setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  // const [testingConnection, setTestingConnection] = useState(false);
  const [searchFocussed, setSearchFocussed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { switcher, themes } = useThemeSwitcher()

  const isDarkMode = useRecoilValue(darkModeState)
  const setIsDarkMode = useSetRecoilState(darkModeState)
  const { steps/*, progress, activeLessonId, isJoyrideActive*/ } = useRecoilValue(joyrideState)
  const setJoyrideState = useSetRecoilState(joyrideState)

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS) && e.key[0] !== '_') {
        history.push(e.key);
      }
    },
    [history],
  );

  // const onAddCustomEndpoint = (info: EndpointInfo) => {
  //   const existingEndpoint = availableEndpoints.some(
  //     (e) => e.endpoint === info.endpoint,
  //   );
  //   if (existingEndpoint) {
  //     notify({
  //       message: `An endpoint with the given url already exists`,
  //       type: 'error',
  //     });
  //     return;
  //   }

  //   const handleError = (e) => {
  //     console.log(`Connection to ${info.endpoint} failed: ${e}`);
  //     notify({
  //       message: `Failed to connect to ${info.endpoint}`,
  //       type: 'error',
  //     });
  //   };

  //   try {
  //     const connection = new Connection(info.endpoint, 'recent');
  //     connection
  //       .getEpochInfo()
  //       .then((result) => {
  //         setTestingConnection(true);
  //         console.log(`testing connection to ${info.endpoint}`);
  //         const newCustomEndpoints = [
  //           ...availableEndpoints.filter((e) => e.custom),
  //           info,
  //         ];
  //         setEndpoint(info.endpoint);
  //         setCustomEndpoints(newCustomEndpoints);
  //       })
  //       .catch(handleError);
  //   } catch (e) {
  //     handleError(e);
  //   } finally {
  //     setTestingConnection(false);
  //   }
  // };

  const handleLearnItemClick = (lessonId: string) => {
    if(steps[lessonId]) {
      if(lessonId === "0")
        history.push("/")
      else if(lessonId === "1")
        history.push("/add-nft")
      else
        history.push("/") // TODO: update for rest of tutorials as they become available

      setJoyrideState(oldJoyrideState => ({
        ...oldJoyrideState,
        activeLessonId: lessonId,
        isJoyrideActive: true
      }))
    }
  };

  // const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  // useEffect(() => {
  //   const handler = () => {
  //     if (endpointInfoCustom) {
  //       setEndpoint(ENDPOINTS[0].endpoint);
  //     }
  //   };
  //   window.addEventListener('beforeunload', handler);
  //   return () => window.removeEventListener('beforeunload', handler);
  // }, [endpointInfoCustom, setEndpoint]);

  const toggleDarkMode = () => {
    localStorage.setItem("solsurfer.theme", isDarkMode ? "light" : "dark")
    switcher({ theme: isDarkMode ? themes.light : themes.dark })
    setIsDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        // testingConnection={testingConnection}
        // onAddCustomEndpoint={onAddCustomEndpoint}
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
          {(!searchFocussed || location.pathname === '/gallery') && (
            <Menu.Item
              id="tour-3-gallery"
              key="/gallery"
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
                  onClick={() => handleLearnItemClick(learnItem.id)}
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
              className="navbar-menu-item-link"
            >
              <a
                href={"https://sol-surfer.gitbook.io/solsurfer/"}
                className="navbar-menu-item-link"
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
                {ENDPOINTS.map(({ name, endpoint }) => (
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
              content={<Settings />}
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
          {connected ? (
            <CurrentUserBadge />
          ) : (
            <ConnectButton
              type="text"
              size="large"
              allowWalletChange={true}
              style={{ color: "#2abdd2" }}
            />
          )}
          {/* <WalletConnect /> */}
        </div>
      </Wrapper>
    </>
  );
}
