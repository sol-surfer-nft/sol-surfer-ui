import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Upload, Typography, Button, Row, Col, Select, Image } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { AddNFTFormData } from '../../pages/AddNFTPage'
// import { UploadChangeParam } from 'antd/lib/upload';
// import { RcFile, UploadFile } from 'antd/lib/upload/interface';

interface AddNFTFormProps {
  addNft: (formData: AddNFTFormData) => void
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const initialValues = {
  supply: 1,
  currency: "usdc"
}

const supportedFiles = ["png", "jpg", "jpeg", "svg"]

const acceptedFileFormatsHtml = ".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg,.svg"

// TODO: query user account with useUserAccount() hook
const mockOwner = "temp-owner"

export const AddNFTForm: React.FC<AddNFTFormProps> = ({
  addNft
}) => {
  // const [imageUrl, setImageUrl] = useState("")
  // const [imageTitle, setImageTitle] = useState("")
  const [fileList, setFileList] = useState<any[]>([])

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ "add-nft-owner": mockOwner })

    return () => {
      form.resetFields()
      setFileList([])
    }
  }, [form])

  const onFinish = (e: any) => {
    // TODO: set the image url, set preview
    const values = form.getFieldsValue(true) // gets all field values
    if(!values["add-nft-title"] || fileList.length !== 1 || !values["add-nft-currency"] || !values["add-nft-price"]) {
      alert('There are invalid form fields. cannot submit nft')
    }
    else {
      let currencySelected = values["add-nft-currency"]
      let nftSolPrice =  currencySelected && currencySelected === "sol" ? values["add-nft-price"] : undefined
      let nftUsdcPrice = currencySelected && currencySelected === "usdc" ? values["add-nft-price"] : undefined

      if(!nftSolPrice && !nftUsdcPrice) {
        alert("currency has not been selected! please select one")
      }
      else {
        addNft({
          title: values["add-nft-title"],
          file: values.file,
          owner: "temp-owner",
          currency: currencySelected,
          price: nftSolPrice,
          usdcPrice: nftUsdcPrice
        })
      }
    }
  };

  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUploadFileChange = async ({ file, fileList }) => { // info: UploadChangeParam<UploadFile<any>>
    setFileList(fileList)
    // console.log('file list:', fileList)
    if(fileList.length < 1) return;
    let newFile = fileList[0]
    let src = newFile.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(newFile.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    newFile.url = src;
    fileList[0] = newFile;
    setFileList(fileList)
  }

  const resetForm = () => {
    clearFileList()
    form.resetFields();
    form.setFieldsValue({ "add-nft-owner": mockOwner })
  }

  const clearFileList = () => {
    setFileList([])
  }

  return (
    <StyledForm
      {...layout}
      name="add-nft-form"
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <div className="left-form-container">
        <Form.Item name="add-nft-owner" label="Creator">
          <Input value={mockOwner} disabled />
        </Form.Item>

        <Form.Item
          label="Title"
          name="add-nft-title"
          rules={[{ required: true }]}
        >
          <Input id="tour-2-title" />
        </Form.Item>

        {/* Price */}
        <Form.Item label="Price" required>
          <Row>
            <Col>
              <Form.Item name="add-nft-price" noStyle rules={[{ required: true }]}>
                <Input id="add-nft-price" type="number" min={0} max={10000000} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                initialValue={"usdc"}
                name="add-nft-currency"
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
        
        <Button id="add-nft-submit-button" htmlType="submit">Submit</Button>
        <Button htmlType="reset" onClick={resetForm}>Clear</Button>
      </div>

      <div className="right-form-container">
        {/* File Upload */}
        <Form.Item
          label="Upload Image"
          name="file-upload"
          // rules={[{ required: true }]}
        >
          {/* Upload.Dragger for drag and drop support */}
          <Upload
            id="tour-2-upload-image"
            name="file"
            multiple={false} // one file at a time
            fileList={fileList}
            showUploadList={false}
            maxCount={1}
            // customRequest={() => true}
            // @ts-ignore
            // beforeUpload={beforeUpload}
            onChange={handleUploadFileChange}
            // itemRender={() => []}
            accept={acceptedFileFormatsHtml}
            // onPreview={handlePreview}
            // onDrop={handleUploadFileDrop}
          >
            {fileList.length > 0 ? (
              // <img src={fileList[0].url} alt={fileList[0].name} style={{ width: '100%' }} className="uploaded-image" />
              <Image
                src={fileList[0].url}
                alt={fileList[0].name}
                style={{ width: '100%', maxHeight: 400, cursor: 'pointer' }}
                preview={false}
                // onClick={toggle}
                className="uploaded-image"
              />
            ) : (
              <div className="image-upload-container">
                <PictureOutlined className="image-upload-icon" />
                <Typography className="image-upload-text">Click or drag file to upload</Typography>
                <Typography className="image-upload-helper-text">( {supportedFiles.map((fileName, index) => index < supportedFiles.length - 1 ? "." + fileName + ", " : "." + fileName)} )</Typography>
              </div>
            )}
          </Upload>
          {fileList.length > 0 && fileList[0].name && (
            <div className="file-item-container">
              <Typography>{fileList[0].name}</Typography>
              <Button onClick={clearFileList}>Remove</Button>
            </div>
          )}
        </Form.Item>
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

  .image-upload-container {
    cursor: pointer;
    background: ${props => props.theme.colors.bg2};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.primary};
    padding: 2rem;
    text-align: center;

    .image-upload-icon {
      font-size: 34px;
      opacity: 0.9;
    }
    .image-upload-text {
      margin-top: 10px;
    }
  }
  .uploaded-image {
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
  }
`

  // const beforeUpload = async (file, fileList) => {
  //   // console.log("dropped file:", file.dataTransfer.files
  //   console.log('upload change param info:', file)
  //   console.log('uploading status:', file.status)
  //   setImageUrl(file.url || file.thumbUrl || "")
  //   setFileList(fileList)
  //   console.log('file list:', fileList)
  //   if(fileList.length < 1) return;
  //   let newFile = fileList[0]
  //   let src = newFile.url;
  //   console.log('new file:', newFile)
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(newFile);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   newFile.url = src;
  //   console.log("new file:", newFile)
  //   fileList[0] = newFile;
  //   setFileList(fileList)
  //   console.log('fileList:', fileList)

  //   // return false; // so antd doesn't upload the file right away
  //   // return Upload.LIST_IGNORE
  // }

  // const handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   console.log('file in handlePreview:', file)

  //   setImageUrl(file.url || file.preview)
  //   setImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // submit data

  //   // ALSO send file as Buffer... ask Eric


  // }