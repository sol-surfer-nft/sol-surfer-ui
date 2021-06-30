import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'

interface PageHeaderProps {
  title: string
  description?: string
  level?: 1 | 2 | 3 | 4 | 5
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  level
}) => {

  return (
    <PageHeaderStyled>
      <Typography.Title className="page-header-title" level={level} style={{marginBottom: description ? 0 : "initial", paddingBottom: description ? 0 : "initial"}}>{title}</Typography.Title>
      {description && <Typography.Paragraph className="page-header-description">{description}</Typography.Paragraph>}
    </PageHeaderStyled>
  )
}

const PageHeaderStyled = styled.header`
  .page-header-title {
    padding: 2rem;
    padding-left: 0;
  }
  .page-header-description {
    padding: 1rem;
    padding-left: 0;
  }
`