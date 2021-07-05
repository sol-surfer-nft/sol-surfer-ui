import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PageHeader } from '../components/PageHeader/PageHeader'
// import { SellNFTForm, SellNftFormData } from '../components/forms/SellNFTForm'
import { nftItemsState } from '../atoms'
import { Steps, Typography, Input, Button } from 'antd'

type StepStatus = 'wait' | 'process' | 'finish' | 'error'

const initialStatuses: StepStatus[] = ["process", "wait", "wait", "wait"]

const SellNFTMenuPage = () => {
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsStatuses, setStepsStatuses] = useState<StepStatus[]>(initialStatuses)
  const [nftItems, setNftItems] = useRecoilState(nftItemsState)

  const onStepChange = (current) => {
    console.log('step change:', current)
    setCurrentStep(current)
  }

  const nextStep = (next: number) => {
    setCurrentStep(next)
    setStepsStatuses(prevStatuses => {
      prevStatuses[next] = "process";

      return prevStatuses;
    })
  }

  return (
    <StyledSellNFTMenuPage>
      <PageHeader title="Sell your NFT" />

      {/* Steps Container */}
      <Steps progressDot current={currentStep} direction="vertical" onChange={onStepChange}>
        {/* First, select an NFT */}
        <Steps.Step
          title="Connect Wallet"
          status={stepsStatuses[0]}
          description={
            <div className="sell-nft-step-description">
              <Typography.Paragraph>Make sure you connect your wallet</Typography.Paragraph>
              <Input />
              <Button type="primary" onClick={() => nextStep(1)}>Next</Button>
            </div>
          }
        />
        <Steps.Step
          title="Select NFT"
          status={stepsStatuses[1]}
          description={
            <div className="sell-nft-step-description">
              <Typography.Paragraph>Select the NFT you wish to sell</Typography.Paragraph>
              <Input />
              <Button type="primary" onClick={() => setCurrentStep(2)}>Next</Button>
              <Button onClick={() => setCurrentStep(0)}>Back</Button>
            </div>
          }
        />
        <Steps.Step
          title="Complete Form"
          status={stepsStatuses[2]}
          description={
            <div className="sell-nft-step-description">
              <Typography.Paragraph>Complete the Form to sell your nft</Typography.Paragraph>
              <Input />
              <Button type="primary" onClick={() => setCurrentStep(3)}>Next</Button>
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
            </div>
          }
        />
        <Steps.Step
          title="List for Sale"
          status={stepsStatuses[3]}
          description={
            <div className="sell-nft-step-description">
              <Typography.Paragraph>List the NFT for Sale and finalize the transaction</Typography.Paragraph>
              <Input />
              <Button onClick={() => setCurrentStep(2)}>Back</Button>
            </div>
          }
        />
      </Steps>

    </StyledSellNFTMenuPage>
  )
}

const StyledSellNFTMenuPage = styled.div`
  .ant-steps-item-title {
    font-size: 1.35rem;
  }

  .sell-nft-step-description {
    padding: 1rem;
  }
`;

export default SellNFTMenuPage