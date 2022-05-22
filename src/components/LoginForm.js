import { Button, Form, Input, Select } from 'antd'
import React from 'react'

function LoginForm() {
    return (
        <Form
            name="Login form"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 12,
            }}
            autoComplete="off"
        >
            <Form.Item label="Username" name="username" rules={[
                {
                    required: true,
                    message: 'Missing username',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[
                {
                    required: true,
                    message: 'Missing password',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 18,
                }}>
                <Button type="primary" htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm