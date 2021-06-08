import React from 'react'
import styled from 'styled-components'

interface ContentLayoutProps {
  isContainer?: boolean
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  isContainer
}) => {

  return (
    <StyledContentLayout className={isContainer ? "container" : ""}>
      {children}
    </StyledContentLayout>
  )
}

const StyledContentLayout = styled.div`
  color: ${props => props.theme.colors.font} !important;

  &.container {
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 4rem;
  }
  @media (min-width: 992px) {
    &.container {
      width: 91.75%;
      padding-left: 0;
      padding-right: 0;
    }
  }
  @media (min-width: 1200px) {
    &.container {
      width: 83.5%;
      padding-left: 0;
      padding-right: 0;
    }
  }
`
