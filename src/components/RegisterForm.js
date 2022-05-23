import { Button, Form, Input, message, Typography } from 'antd'
import React from 'react'
import UserContext from '../contexts/user';
import {status, json} from '../utilities/requestHandlers'

class RegisterForm extends React.Component {
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
        const data = values;
        console.log("Json  ", JSON.stringify(data))
        fetch('https://assignmentbackend.jackng221.repl.co/api/v1/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                console.log(data);
                message.info(`Success`);
                this.context.regComplete();
                this.context.enableRequest();
            })
            .catch(errorResponse => {
                console.error(errorResponse);
                alert("Registration failed");
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
                    name="Register form"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    autoComplete="off"
                    onFinish={this.onFinish}
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
                    <Form.Item label="Sign up code" name="signupcode">
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
    }
}

export default RegisterForm