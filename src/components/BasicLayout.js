import { Layout } from 'antd';
import styled from 'styled-components';
import React from 'react';
import TopBar from './TopBar/TopBar';
import { CustomFooter as Footer } from './Footer';
const { Header, Content } = Layout;

export default function BasicLayout({ children }) {
  return (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <Header
        className="basic-layout-header"
        style={{ padding: 0, minHeight: 64, height: 'unset' }}
      >
        <TopBar />
      </Header>
      <Content style={{ flex: 1 }}>{children}</Content>
      <Footer />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  background-color: ${(props) => props.theme.colors.bg1} !important;
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .ant-typography {
    color: ${(props) => props.theme.colors.font};
  }
  .ant-layout-footer {
    background-color: ${(props) => props.theme.colors.bg1};
  }
  .ant-menu-item {
    color: ${(props) => props.theme.colors.font};
  }

  .basic-layout-header {
    background-color: ${(props) => props.theme.colors.bg2} !important;
  }
`;
