import { Form, Input, Select } from 'antd'
import React from 'react'

function DogEntryForm() {
    return (
        <Form
            name="Create form"
            autoComplete="off">
            <Form.Item label="Name" name="name" rules={[
                {
                    required: true,
                    message: 'Missing name',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Age" name="age" rules={[
                {
                    required: true,
                    message: 'Missing age',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Weight" name="weight" rules={[
                {
                    required: true,
                    message: 'Missing weight',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Sex" name="sex" rules={[
                {
                    required: true,
                    message: 'Missing sex',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Breed" name="breed" rules={[
                {
                    required: true,
                    message: 'Missing breed',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Location" name="location" rules={[
                {
                    required: true,
                    message: 'Missing facility location',
                },
            ]}>
                <Select defaultValue={"locationA"}>
                    <Option value="locationA">locationA</Option>
                    <Option value="locationB">locationB</Option>
                    <Option value="locationC">locationC</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Image URL" name="imageurl">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default DogEntryForm