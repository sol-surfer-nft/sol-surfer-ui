import React from 'react'
import { Button, Typography } from 'antd'
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();

  const navigateHome = () => {
    history.push("/")
  }

  return (
    <div>
      <Typography>Page Not Found!</Typography>
      <Button onClick={() => navigateHome()}>Go Back</Button>
    </div>
  )
}

export default NotFoundPage