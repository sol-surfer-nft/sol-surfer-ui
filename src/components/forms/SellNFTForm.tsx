import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Button, Input, Select, Row, Col, Image, Modal, Typography, Tooltip } from 'antd'
import { NFTItem } from '../../types/NFTItem'
import { nftItems } from '../../data/marketplace.data'
import { useWallet } from '../../contexts/wallet'
import { FORM_LABELS } from './AddNFTForm'

interface SellNFTFormProps {
  sellNft: (data: any) => void
  nftId?: string
}

export interface SellNftFormData {
  id: string
  title: string
  price?: number
  usdcPrice?: number
  currency: 'sol' | 'SOL' | 'usdc' | 'USDC'
  owner: string
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const initialValues = {
  supply: 1,
  currency: "sol"
}

export const SellNFTForm: React.FC<SellNFTFormProps> = ({
  nftId,
  sellNft,
}) => {
  const { connected, wallet } = useWallet()
  
  const [form] = Form.useForm()

  const [nftData, setNftData] = useState<NFTItem | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(nftId) {
      // Find the nft by id
      let nftItem = nftItems.find(nft => nft.id === nftId)
      setNftData(nftItem || null)
      form.setFieldsValue({ "sell-nft-title": nftItem?.title, "sell-nft-owner": connected ? wallet?.publicKey ? `${wallet.publicKey}` : "unknown" : "not connected" })
    }

    return () => {
      form.resetFields()
      setNftData(null)
    }
  }, [connected, form, nftId, wallet])

  useEffect(() => {
    if(!connected) {
      // show the warning modal
      Modal.info({
        title: "Not Connected to Wallet",
        content: (
          <div>
            <Typography.Paragraph>You won't be able to sell an NFT until you are connected to your solana wallet</Typography.Paragraph>
            <Typography.Paragraph>Click <strong>'Connect'</strong> in the top right of the screen to get started</Typography.Paragraph>
          </div>
        // View Tutorial Link Here: (Wrap into custom hook?)
        )
      })
    }
  }, [connected])

  const handleFinishedForm = (e: any) => {
    setLoading(true)
    const formValues = form.getFieldsValue(true)
    
    if(!formValues["sell-nft-title"] || !formValues["sell-nft-price"] || !formValues["sell-nft-currency"]) {
      alert("There are invalid form fields")
    }
    else {
      let currencySelected = formValues["sell-nft-currency"]
      let nftSolPrice =  currencySelected && currencySelected === "sol" ? formValues["sell-nft-price"] : undefined
      let nftUsdcPrice = currencySelected && currencySelected === "usdc" ? formValues["sell-nft-price"] : undefined

      if(!nftSolPrice && !nftUsdcPrice) {
        alert("currency has not been selected! please select one")
      }
      else if(!connected || !wallet?.publicKey) {
        alert("you are not connected. cannot sell")
      }
      else {
        sellNft({
          title: formValues["sell-nft-title"],
          price: nftSolPrice,
          usdcPrice: nftUsdcPrice,
          currency: currencySelected,
          owner: wallet?.publicKey
        })
      }
    }
    setLoading(false)
  }

  const handleFinishFailed = (e: any) => {
    // console.log('finish failed. event:', e)
  }

  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      "sell-nft-owner": wallet?.publicKey || "unknown",
      "sell-nft-title": nftData?.title,
    })
  }
  
  return (
    <StyledForm
      {...layout}
      name="sell-nft-form"
      layout="vertical"
      initialValues={initialValues}
      form={form}
      onFinish={handleFinishedForm}
      onFinishFailed={handleFinishFailed}
    >
      <div className="left-form-container">
        <Form.Item name="sell-nft-owner" label="Creator" tooltip={<Tooltip title="Creator Tooltip">{FORM_LABELS.CREATOR}</Tooltip>} >
          <Input value={`${wallet?.publicKey}` || "unknown"} disabled />
        </Form.Item>

        <Form.Item name="sell-nft-title" label="Title" tooltip={FORM_LABELS.TITLE} rules={[{ required: true }]}>
          <Input value={nftData?.title} disabled />
        </Form.Item>

        <Form.Item label="Price" required tooltip={FORM_LABELS.PRICE_CURRENCY}>
          <Row>
            <Col>
              <Form.Item name="sell-nft-price" noStyle rules={[{ required: true }]}>
                <Input id="sell-nft-price" type="number" min={0} max={10000000} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                initialValue={nftData?.price ? "sol" : nftData?.usdcPrice ? "usdc" : "sol"}
                name="sell-nft-currency"
                label="Currency"
                noStyle
                rules={[{ required: true, message: 'Please select currency' }]}
              >
                <Select placeholder="Currency" id="sell-nft-currency">
                  <Select.Option value="sol">SOL</Select.Option>
                  <Select.Option value="usdc">USDC</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Button htmlType="submit" id="submit-sell-nft-form-button" disabled={!connected || loading}>Submit</Button>
        <Button htmlType="reset" onClick={resetForm}>Clear</Button>
      </div>

      <div className="right-form-container">
        {/* Add Preview for Image */}
        <Image
          src={nftData?.url}
          placeholder={true}
          style={{ width: '100%', maxHeight: 400, height: 400 }}
          alt={`listing nft for sale: ${nftData?.title || "nft not selected"}`}
        />
      </div>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;

  .left-form-container {
    flex: 1;
    padding-right: 1rem;
  }
  .right-form-container {
    flex: 1;
    text-align: center;
    padding-left: 1rem;
  }

  @media(max-width: ${props => props.theme.breakpoints.md}px) {
    flex-direction: column-reverse;

    .right-form-container {
      margin-bottom: 2rem;
      padding-left: 0;
    }
    .left-form-container {
      padding-right: 0;
    }
  }
`;