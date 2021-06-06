import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { faqItems } from '../data/faq.data'

const FAQPage = () => {


  return (
    <StyledFAQPage>
      <PageHeader title="Questions and Answers" />

      <div className="faq-container">
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
    width: 50%;
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
`

export default FAQPage