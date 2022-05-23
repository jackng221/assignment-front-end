import { Space, Typography } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import DogView from '../components/DogView'

function Dog() {
    return (
        <>
            <Space style={{ width: "100%", justifyContent: "center" }}>
                <Typography.Title>Dog details</Typography.Title>
            </Space>
            <DogView data={useLocation().state} />
        </>
    )
}

export default Dog