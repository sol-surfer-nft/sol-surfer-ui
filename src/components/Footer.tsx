import React from 'react';
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';
const { Footer } = Layout;
const { useBreakpoint } = Grid;

export const links = {
  github: "https://github.com/sol-surfer-nft",
  website: "https://solsurfer.io",
  solanaSzn: "https://solana.com/solanaszn",
  wormhole: "https://solana.com/wormhole",
  opensea: "https://opensea.io",
  documentation: "https://gitbook.com"
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
    <Footer
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
                  <Link external to={elem.link}>
                    {elem.description}
                  </Link>
                </Col>
              );
            })}
          </>
        )}
        <Col flex="auto">{/*  <DexProgramSelector />*/}</Col>
      </Row>
    </Footer>
  );
};
