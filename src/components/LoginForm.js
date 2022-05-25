/**
* A module to submit a form to login as a user.
* @module components/LoginForm
* @author Jack
* @see Login for the page to display this module.
*/

import { Button, Form, Input, message, Space, Typography } from 'antd'
import React from 'react'
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    static contextType = UserContext;

    login(values) {
        this.context.disableRequest();
        const { username, password } = values;
        console.log(`logging in user: ${username}`)
        fetch('https://assignmentbackend.jackng221.repl.co/api/v1/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            }
        })
            .then(status)
            .then(json)
            .then(user => {
                user.password = password;
                this.context.login(user);
                message.info(`Welcome ${user.username}`);
                console.log(user.username + " Logged in successfully");
                this.context.enableRequest();
            })
            .catch(error => {
                console.log(`Error ${error}`);
                alert(`${username} login failed`);
                this.context.enableRequest();
            });
    }
    render() {
        if (this.context.user.loggedIn === true) {
            return (
                <Space style={{ width: "100%", justifyContent: "center" }}>
                    <Typography.Title>You are logged in</Typography.Title>
                </Space>
            )
        }
        else if (this.context.canRequest === false) {
            return (
                <Space style={{ width: "100%", justifyContent: "center" }}>
                    <Typography.Title>Please wait</Typography.Title>
                </Space>
            )
        }
        else {
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
                    onFinish={this.login}
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
    }
}

export default LoginForm