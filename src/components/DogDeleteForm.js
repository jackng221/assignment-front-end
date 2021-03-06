/**
* A module to submit a form to delete a dog entry.
* @module components/DogDeleteForm
* @author Jack
* @see ManageDogs for the page to display this module.
*/

import { Button, Form, InputNumber, message, Space, Typography } from 'antd'
import React from 'react'
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers'

class DogDeleteForm extends React.Component {
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
            method: "DELETE",
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
                message.info(`Success`);
                this.context.enableRequest();
            })
            .catch(errorResponse => {
                console.error(errorResponse);
                alert("Creation failed");
                this.context.enableRequest();
            });
    }
    render() {
        if (this.context.canRequest === false) {
            return (
                <Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
                    <Typography.Title >Please wait</Typography.Title>
                </Space>
            )
        }
        else {
            return (
                <Form
                    name="Add dog form"
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
                        <InputNumber min={1} precision={0} />
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

export default DogDeleteForm