import { AutoComplete, Button, Form, Input, InputNumber, message, Select, Space, Typography, Upload } from 'antd'
import React from 'react'
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers'

class DogCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
            // image upload
            fileList: [],
        };
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext;

    onFinish = (values) => {
        this.context.disableRequest();

        if (this.state.fileList.length === 1) {
            // upload image then submit data with returned image url
            const { fileList } = this.state;
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('upload', file, file.name);
            });

            fetch('https://assignmentbackend.jackng221.repl.co/api/v1/images', {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password),
                }
            })
                .then(status)
                .then(json)
                .then(uploadedImage => {
                    console.log(`Image uploaded: ${uploadedImage.links.path}`);

                    // proceed to submit data
                    console.log('Received values of form: ', values);
                    values["imagefile"] = uploadedImage.links.path; //insert image url
                    console.log("Json  ", JSON.stringify(values))
                    fetch('https://assignmentbackend.jackng221.repl.co/api/v1/dogs', {
                        method: "POST",
                        body: JSON.stringify(values),
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
                            alert("Data creation failed");
                            this.context.enableRequest();
                        });
                })
                .catch(errorResponse => {
                    console.error(errorResponse);
                    alert("Image upload failed");
                    this.context.enableRequest();
                });
        }
        else{
            // submit without imagefile
            console.log('Received values of form: ', values);
            const { imagefile, ...data } = values;
            console.log("Json  ", JSON.stringify(data))
            fetch('https://assignmentbackend.jackng221.repl.co/api/v1/dogs', {
                method: "POST",
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
                    alert("Data creation failed");
                    this.context.enableRequest();
                });
        }
    }
    render() {
        // upload image
        const { fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        //
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
                        <InputNumber min={0} precision={0} />
                    </Form.Item>
                    <Form.Item label="Weight (kg)" name="weight" rules={[
                        {
                            required: true,
                            message: 'Missing weight',
                        },
                    ]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item label="Sex" name="sex" rules={[
                        {
                            required: true,
                            message: 'Missing sex',
                        },
                    ]}>
                        <Select>
                            <Select.Option value="Boy (M)">Boy (M)</Select.Option>
                            <Select.Option value="Girl (F)">Girl (F)</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Breed" name="breed" rules={[
                        {
                            required: true,
                            message: 'Missing breed',
                        },
                    ]}>
                        <AutoComplete>
                            <AutoComplete.Option key="goldenretriever" value="Golden Retriever">Golden Retriever</AutoComplete.Option>
                            <AutoComplete.Option key="bulldog" value="Bulldog">Bulldog</AutoComplete.Option>
                            <AutoComplete.Option key="havenese" value="Havanese">Havanese</AutoComplete.Option>
                            <AutoComplete.Option key="pembrokewelshcorgi" value="Pembroke Welsh Corgi">Pembroke Welsh Corgi</AutoComplete.Option>
                            <AutoComplete.Option key="bostonterrier" value="Boston Terrier">Boston Terrier</AutoComplete.Option>
                        </AutoComplete>
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
                    <Form.Item label="Image file" name="imagefile">
                        <Upload {...props} maxCount={1}>
                            <Button>Select File</Button>
                        </Upload>
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

export default DogCreateForm