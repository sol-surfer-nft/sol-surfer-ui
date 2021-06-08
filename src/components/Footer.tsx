import React from 'react';
import styled from 'styled-components'
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';
const { Footer } = Layout;
const { useBreakpoint } = Grid;

export const links = {
  github: "https://github.com/sol-surfer-nft",
  // website: "https://solsurfer.xyz",
  solanaSzn: "https://solana.com/solanaszn",
  wormhole: "https://solana.com/wormhole",
  opensea: "https://opensea.io",
  documentation: "https://sol-surfer.gitbook.io/solsurfer/"
}
const footerElements = [
  { description: 'GitHub', link: links.github },
  { description: 'Documentation', link: links.documentation },
  {
    description: 'SolanaSzn',
    link: links.solanaSzn,
  },
  { description: 'Wormhole', link: links.wormhole },
  { description: 'Opensea', link: links.opensea },
];

export const CustomFooter = () => {
  const smallScreen = !useBreakpoint().lg;

  return (
    <FooterStyled
      style={{
        height: '45px',
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      <Row align="middle" gutter={[16, 4]}>
        {!smallScreen && (
          <>
            <Col flex="auto" />
            {footerElements.map((elem, index) => {
              return (
                <Col key={index + ''}>
                  <LinkStyled external to={elem.link}>
                    <span>{elem.description}</span>
                  </LinkStyled>
                </Col>
              );
            })}
          </>
        )}
        <Col flex="auto">{/*  <DexProgramSelector />*/}</Col>
      </Row>
    </FooterStyled>
  );
};

const FooterStyled = styled(Footer)`
  background-color: ${props => props.theme.colors.bg1};
  border-top: 1px solid #333;
`
const LinkStyled = styled(Link) `
  color: ${props => props.theme.colors.font};
`