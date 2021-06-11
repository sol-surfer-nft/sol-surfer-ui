import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Button, Input, Select, Row, Col } from 'antd'
import { NFTItem } from '../../types/NFTItem'
import { nftItems } from '../../data/marketplace.data'

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

export const SellNFTForm: React.FC<SellNFTFormProps> = ({
  nftId,
  sellNft,
}) => {
  const [form] = Form.useForm()

  const [nftData, setNftData] = useState<NFTItem | null>(null)

  useEffect(() => {
    if(nftId) {
      // Find the nft by id
      let nftItem = nftItems.find(nft => nft.id === nftId)
      setNftData(nftItem || null)
      form.setFieldsValue({ "sell-nft-title": nftItem?.title })
    }

    return () => {
      form.resetFields()
      setNftData(null)
    }
  }, [form, nftId])

  const handleFinishedForm = (e: any) => {
    
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
      else {
        sellNft({
          title: formValues["sell-nft-title"],
          price: nftSolPrice,
          usdcPrice: nftUsdcPrice,
          currency: currencySelected,
          owner: "temp-user"
        })
      }
    }
  }

  const handleFinishFailed = (e: any) => {
    console.log('finish failed. event:', e)
  }
  
  return (
    <StyledForm
      name="sell-nft-form"
      layout="vertical"
      form={form}
      onFinish={handleFinishedForm}
      onFinishFailed={handleFinishFailed}
    >
      {/* Choose between usdc / sol... Needs converter function? */}
      <Form.Item name="sell-nft-title" label="Title">
        <Input value={nftData?.title} disabled />
      </Form.Item>

      <Form.Item initialValue={nftData?.usdcPrice || nftData?.price} label="Price">
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
              <Select placeholder="Currency">
                <Select.Option value="sol">SOL</Select.Option>
                <Select.Option value="usdc">USDC</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Button htmlType="submit">Submit</Button>
      <Button htmlType="reset">Clear</Button>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  // background: black;
`;