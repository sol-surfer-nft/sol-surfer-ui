import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { faqItems } from '../data/faq.data'

const FAQPage = () => {


  return (
    <StyledFAQPage>
      <div className="faq-container">
        <PageHeader title="Questions and Answers" />
        <div className="faq-item">
          <Typography.Paragraph className="question-answer">
            For a more comprehensive FAQ, try visiting Solana's &nbsp;
            <a
              href="https://forums.solana.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              official forum
            </a>
          </Typography.Paragraph>
        </div>
        {faqItems.map(faqItem => (
          <div className="faq-item" key={faqItem.questionId}>
            <Typography.Title level={2} className="question-title">{faqItem.questionTitle}</Typography.Title>
            <Typography.Paragraph className="question-answer">{faqItem.questionAnswer}</Typography.Paragraph>
          </div>
        ))}
      </div>
    </StyledFAQPage>
  )
}

const StyledFAQPage = styled.div`
  .faq-container {
    width: 100%;
    margin: auto;
    margin-bottom: 4rem;
  }
  .faq-item {
    margin-bottom: 2rem;
    padding: 2rem;

    .question-answer {
      font-size: 22px;
    }
  }

  @media(min-width: ${props => props.theme.breakpoints.md}px) {
    .faq-container {
      width: 50%;
    }
  }
`

export default FAQPage