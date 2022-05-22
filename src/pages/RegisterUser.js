import { Space, Typography } from 'antd'
import React from 'react'
import RegisterForm from '../components/RegisterForm'

function RegisterUser() {
    return (
        <div>
            <Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
                <Typography.Title >Register form</Typography.Title>
            </Space>
            <RegisterForm />
        </div>

    )
}

export default RegisterUser