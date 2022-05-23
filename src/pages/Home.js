import { Typography } from 'antd'
import React from 'react'
import DogList from '../components/DogList'
import DogSearch from '../components/DogSearch'

function Home() {
  return (
    <div>
      <Typography.Title>Welcome to The Canine Shelter</Typography.Title>
      <DogSearch />
    </div>
  )
}

export default Home