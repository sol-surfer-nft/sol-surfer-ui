import React from 'react';
import styled from 'styled-components'
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';
import { GithubOutlined, YoutubeOutlined, TwitterOutlined, LinkedinFilled } from '@ant-design/icons'

const { Footer } = Layout;
const { useBreakpoint } = Grid;

export const links = {
  website: "https://app.solsurfer.xyz",
  solanaSzn: "https://solana.com/solanaszn",
  wormhole: "https://solana.com/wormhole",
  opensea: "https://opensea.io",
  documentation: "https://sol-surfer.gitbook.io/solsurfer/",
}

export const socialLinks = {
  github: "https://github.com/sol-surfer-nft",
  twitter: "https://twitter.com/solsurfer_xyz",
  linkedin: "https://www.linkedin.com/company/solsurfer/",
  youtube: "https://www.youtube.com/channel/UCNc-wl-8GDcjn-z7_on8Iaw"
}

const footerElementLinks = [
  { description: 'Website', link: links.website },
  { description: 'Documentation', link: links.documentation },
  {
    description: 'SolanaSzn',
    link: links.solanaSzn,
  },
  { description: 'Wormhole', link: links.wormhole },
  { description: 'Opensea', link: links.opensea },
];

const footerElementSocials = [
  { description: 'GitHub', link: socialLinks.github, icon: <GithubOutlined alt="GitHub" style={{fontSize: 24}} /> },
  { description: 'Twitter', link: socialLinks.twitter, icon: <TwitterOutlined alt="Twitter" style={{fontSize: 24}} /> },
  { description: 'LinkedIn', link: socialLinks.linkedin, icon: <LinkedinFilled alt="LinkedIn" style={{fontSize: 24}} /> },
  { description: 'YouTube', link: socialLinks.youtube, icon: <YoutubeOutlined alt="YouTube" style={{fontSize: 24}} /> },
]

export const CustomFooter = () => {
  const smallScreen = !useBreakpoint().lg;

  return (
    <FooterStyled
      style={{
        height: smallScreen ? '67px' : '124px',
        paddingBottom: 20,
        paddingTop: 20,
      }}
    >
      {!smallScreen && (
      <Row align="middle" gutter={[16, 4]}>
          <>
            <Col flex="auto" />
            {footerElementLinks.map((elem, index) => {
              return (
                <Col key={index + ''}>
                  <LinkStyled external to={elem.link}>
                    <span style={{fontSize: 16}}>{elem.description}</span>
                  </LinkStyled>
                </Col>
              );
            })}
          </>
        <Col flex="auto">{/*  <DexProgramSelector />*/}</Col>
      </Row>
        )}

      <Row align="middle" gutter={[24, 4]} style={{paddingTop: smallScreen ? 0 : 20, paddingBottom: 20}}>
        <Col flex="auto" />
        {footerElementSocials.map((elem, index) => {
          return (
            <Col key={`${index}-${elem.description}`}>
              <LinkStyled external to={elem.link}>
                {elem.icon}
              </LinkStyled>
            </Col>
          );
        })}
        <Col flex="auto"></Col>
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