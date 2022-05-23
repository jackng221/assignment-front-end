import { Space, Typography } from 'antd'
import React from 'react'
import DogSearch from '../components/DogSearch'

function Home() {
  return (
    <div>
      <Space style={{ width: "100%", justifyContent: "center" }}>
        <Typography.Title>Welcome to The Canine Shelter</Typography.Title>
      </Space>
      <DogSearch />
    </div>
  )
}

export default Home