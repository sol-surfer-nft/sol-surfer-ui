import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Button, Input, Select, Row, Col } from 'antd'
import { NFTItem } from '../../types/NFTItem'
import { nftItems } from '../../data/marketplace.data'

interface SellNFTFormProps {
  nftId?: string
}

export const SellNFTForm: React.FC<SellNFTFormProps> = ({
  nftId
}) => {
  const [form] = Form.useForm()

  const [nftData, setNftData] = useState<NFTItem | null>(null)

  useEffect(() => {
    if(nftId) {
      console.log('selling nft with id:', nftId);
      // Find the nft by id
      let nftItem = nftItems.find(nft => nft.id === nftId)
      console.log('nft item:', nftItem)
      setNftData(nftItem || null)
      form.setFieldsValue({ "sell-nft-title": nftItem?.title })
    }

    return () => {
      form.resetFields()
    }
  }, [form, nftId])

  const handleFinishedForm = (e: any) => {
    console.log('finished form. values:', form.getFieldsValue())
    alert("thank you for your submissino")
    form.setFieldsValue({ "sell-nft-price": 0 })
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
              <Input id="tour-3-nft-price" type="number" min={0} max={10000000} />
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