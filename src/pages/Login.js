import { Space, Typography } from 'antd'
import React from 'react'
import LoginForm from '../components/LoginForm'

function Login() {
    return (
        <div>
            <Space direction="horizontal" style={{width: "100%", justifyContent: "center"}}>
                <Typography.Title >Login form</Typography.Title>
            </Space>
            <LoginForm />
        </div>
    )
}

export default Login