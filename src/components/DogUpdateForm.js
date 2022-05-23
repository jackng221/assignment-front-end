import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
import React from 'react'
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers'

class DogUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext;

    onFinish = (values) => {
        this.context.disableRequest();
        console.log('Received values of form: ', values);
        const ID = values["id"];
        const { id, ...data } = values;
        console.log("Json  ", JSON.stringify(data))
        fetch('https://assignmentbackend.jackng221.repl.co/api/v1/dogs/' + ID, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password),
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                console.log(data);
                alert(`Success`);
                this.context.enableRequest();
            })
            .catch(errorResponse => {
                console.error(errorResponse);
                alert("Update failed");
                this.context.enableRequest();
            });
    }
    render() {
        if (this.context.canRequest === false) {
            return (
                <Typography.Title>Please wait</Typography.Title>
            )
        }
        else {
            return (
                <Form
                    name="Update dog form"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    autoComplete="off"
                    onFinish={this.onFinish}
                >
                    <Form.Item label="ID" name="id" rules={[
                        {
                            required: true,
                            message: 'Missing id',
                        },
                    ]}>
                        <InputNumber precision={0} />
                    </Form.Item>
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
                        <InputNumber precision={0} />
                    </Form.Item>
                    <Form.Item label="Weight" name="weight" rules={[
                        {
                            required: true,
                            message: 'Missing weight',
                        },
                    ]}>
                        <InputNumber formatter={value => `${value}kg`} />
                    </Form.Item>
                    <Form.Item label="Sex" name="sex" rules={[
                        {
                            required: true,
                            message: 'Missing sex',
                        },
                    ]}>
                        <Select>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="F">F</Select.Option>
                        </Select>
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
                        <Select>
                            <Select.Option value="locationA">locationA</Select.Option>
                            <Select.Option value="locationB">locationB</Select.Option>
                            <Select.Option value="locationC">locationC</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Image URL" name="imageurl">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 18,
                        }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
    }
}

export default DogUpdateForm