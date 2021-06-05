import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Upload, message, Typography, Button } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

interface AddNFTFormProps {

}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const initialValues = {
  supply: 1
}

const supportedFiles = ["png", "jpg", "jpeg"]

export const AddNFTForm: React.FC<AddNFTFormProps> = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [imageTitle, setImageTitle] = useState("")
  const [fileList, setFileList] = useState<any[]>([])

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);

    // TODO: set the image url, set preview
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUploadFileChange = async ({ file, fileList }) => { // info: UploadChangeParam<UploadFile<any>>
    console.log('upload change param info:', file)
    console.log('uploading status:', file.status)
    // if(file.status === "done") {
      setImageUrl(file.url || file.thumbUrl || "")
      console.log('finished uploading:', file)
      setFileList(fileList)
      console.log('file list:', fileList)
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
    // }
    // else {
    //   setImageUrl("")
    // }
  }

  const beforeUpload = async (file, fileList) => {
    // console.log("dropped file:", file.dataTransfer.files
    console.log('upload change param info:', file)
    console.log('uploading status:', file.status)
    setImageUrl(file.url || file.thumbUrl || "")
    setFileList(fileList)
    console.log('file list:', fileList)
    if(fileList.length < 1) return;
    let newFile = fileList[0]
    let src = newFile.url;
    console.log('new file:', newFile)
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onload = () => resolve(reader.result);
      });
    }
    newFile.url = src;
    console.log("new file:", newFile)
    fileList[0] = newFile;
    setFileList(fileList)
    console.log('fileList:', fileList)

    // return false; // so antd doesn't upload the file right away
    // return Upload.LIST_IGNORE
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log('file in handlePreview:', file)

    setImageUrl(file.url || file.preview)
    setImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // submit data

    // ALSO send file as Buffer... ask Eric


  }

  const resetForm = () => {
    // ...reset form
    clearFileList()
    form.resetFields();
  }

  const clearFileList = () => {
    setFileList([])
  }

  return (
    <FormStyled
      {...layout}
      name="add-nft-form"
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* File Upload */}
      <Form.Item
        label="Upload Image"
        name="file-upload"
        rules={[{ required: true }]}
      >
        {/* Upload.Dragger for drag and drop support */}
        <Upload
          name="file"
          multiple={false} // one file at a time
          fileList={fileList}
          showUploadList={false}
          disabled={fileList.length > 0}
          // customRequest={() => true}
          // @ts-ignore
          // beforeUpload={beforeUpload}
          onChange={handleUploadFileChange}
          // itemRender={() => []}
          // accept="..."
          // onPreview={handlePreview}
          // onDrop={handleUploadFileDrop}
        >
          {fileList.length > 0 ? (
            // @ts-ignore
            <img src={fileList[0].url} alt={fileList[0].name} style={{ width: '100%' }} className="uploaded-image" />
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

      
      <Button htmlType="submit">Submit</Button>
      <Button htmlType="reset" onClick={resetForm}>Clear</Button>
    </FormStyled>
  )
}

const FormStyled = styled(Form)`
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