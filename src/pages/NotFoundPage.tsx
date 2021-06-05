import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'antd' 
import { PageHeader } from '../components/PageHeader/PageHeader'

const NotFoundPage = () => {
  const history = useHistory();

  const navigateHome = () => {
    history.push("/")
  }

  return (
    <div>
      <PageHeader title="Page Not Found" />
      <Button onClick={() => navigateHome()}>Go Back</Button>
    </div>
  )
}

export default NotFoundPage