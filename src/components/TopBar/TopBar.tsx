import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher'
import styled from 'styled-components';
import { Button, Col, Menu, Popover, Row, Select, Tooltip, Typography, Dropdown } from 'antd';
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
  DownOutlined,
  CaretDownOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Settings } from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { ConnectButton } from './ConnectButton'
import { CurrentUserBadge } from './CurrentUserBadge'
import AppSearch from './AppSearch';
import learnItems from '../../data/learn.data';
import { colors } from '../../styles/colors';
import logo from '../../assets/logo.svg';
import { activeEndpointState, darkModeState, joyrideState } from '../../atoms';

import { ENDPOINTS, useConnectionConfig } from '../../contexts/connection';
import { useWallet } from '../../contexts/wallet';

const EXTERNAL_LINKS = {
  '/docs': 'https://sol-surfer.gitbook.io/solsurfer/',
  '/feedback': 'https://forms.gle/5RkyWQMfAavPgFrN9',
};

interface MoreLinks {
  name: string
  link: string
  external?: boolean
}
const moreLinks: MoreLinks[] = [
  {
    name: "FAQ",
    link: "/faq",
    external: false
  },
  {
    name: "Documentation",
    link: "/docs",
    external: true
  },
  {
    name: "Feedback",
    link: "/feedback",
    external: true
  },
]

export default function TopBar() {
  const { connected } = useWallet();
  const {
    endpoint,
    setEndpoint,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [searchFocussed, setSearchFocussed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { switcher, themes } = useThemeSwitcher()

  const isDarkMode = useRecoilValue(darkModeState)
  const setIsDarkMode = useSetRecoilState(darkModeState)
  const { steps/*, progress, activeLessonId, isJoyrideActive*/ } = useRecoilValue(joyrideState)
  const setJoyrideState = useSetRecoilState(joyrideState)
  const setActiveEndpoint = useSetRecoilState(activeEndpointState)

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS) && e.key[0] !== '_') {
        history.push(e.key);
      }
    },
    [history],
  );

  const handleLearnItemClick = (lessonId: string) => {
    let lesson = learnItems[lessonId]
    if(lesson && steps[lessonId]) {
      if(lesson.internalLink)
        history.push(lesson.internalLink)
        
      setJoyrideState(oldJoyrideState => ({
        ...oldJoyrideState,
        activeLessonId: lessonId,
        isJoyrideActive: true
      }))
    }
  };

  const toggleDarkMode = () => {
    localStorage.setItem("solsurfer.theme", isDarkMode ? "light" : "dark")
    switcher({ theme: isDarkMode ? themes.light : themes.dark })
    setIsDarkMode((prevTheme) => !prevTheme);
  };

  const changeEndpoint = (value, optionData) => {
    setEndpoint(value)
    setActiveEndpoint(optionData.key)
  }

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <LogoWrapper onClick={() => history.push('/')}>
          <img src={logo} alt="solsurfer logo" />
          {'SolSurfer'}
        </LogoWrapper>
        <Menu
          className="top-bar-nav-menu-items"
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[location.pathname]}
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
          {!searchFocussed && (
            <Menu.SubMenu
              key="/learn"
              title={<span id="tour-1-learn">Learn<CaretDownOutlined style={{marginLeft: 4, marginRight: 0, paddingRight: 0}} /></span>}
              onTitleClick={() => history.push('/learn')}
              style={{ margin: '0 10px', textTransform: 'uppercase', background: '#212121 !important' }}
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
            <Menu.SubMenu
              key="_more"
              title={<span>More<CaretDownOutlined style={{marginLeft: 4}} /></span>}
              style={{ margin: '0 10px', textTransform: 'uppercase', background: '#212121 !important' }}
            >
              {moreLinks.map((moreLink) => (
                <Menu.Item
                  key={moreLink.link}
                  style={{background: "#212121 !important"}}
                >
                  {moreLink.external ? (
                    <a
                      href={EXTERNAL_LINKS[moreLink.link]}
                      className="navbar-menu-item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {moreLink.name}
                      <LinkOutlined style={{marginLeft: 5}} />
                    </a>
                  ) : (
                    moreLink.name
                  )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )}
        </Menu>

        {connected && (
          <div className="topbar-sell-nft">
            <Link to="/sell-nft">
              <Button type="primary">Sell NFT</Button>
            </Link>
          </div>
        )}

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
                onSelect={changeEndpoint}
                value={endpoint}
                style={{ marginRight: 8, width: '150px' }}
              >
                {ENDPOINTS.map(({ name, endpoint }) => (
                  <Select.Option value={endpoint} key={name}>
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

        <div style={{display: 'flex', alignItems: 'center'}}>
          <div id="tour-1-wallet">
            {!connected && (
              <ConnectButton
                type="text"
                size="large"
                allowWalletChange={true}
                style={{ color: "#2abdd2" }}
              />
            )}
          </div>

          {/* Make user badge a dropdown */}
          {connected ? (
            <CurrentUserBadge />
          ) : (
            <Dropdown
              placement="bottomRight"
              trigger={['click']}
              overlay={(
                <Menu>
                  <Menu.Item>You are not connected yet...</Menu.Item>
                  <Menu.Item>Click 'Connect' to begin</Menu.Item>
                </Menu>
              )}
            >
              <Typography.Paragraph style={{marginBottom: 0, cursor: 'pointer', marginLeft: 15}}>Not Connected <DownOutlined /></Typography.Paragraph>
            </Dropdown>
          )}

          {/* <WalletConnect /> */}
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  // background-color: #0d1017;
  background-color: ${props => props.theme.colors.bg2};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap;

  .top-bar-nav-menu-items {
    display: flex;
    align-items: flex-end;
    flex: 1;
    border-bottom: none;
    background-color: transparent;
  }

  .navbar-menu-item-link {
    color: ${props => props.theme.colors.font};
  }

  .topbar-sell-nft {
    margin-right: 10px;
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