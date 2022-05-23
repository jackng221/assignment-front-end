import { Button, Space, Typography } from 'antd';
import React from 'react'
import DogCreateForm from '../components/DogCreateForm'
import DogDeleteForm from '../components/DogDeleteForm';
import DogUpdateForm from '../components/DogUpdateForm';

function ManageDogs() {
    const [currentCRUD, setCurrentCRUD] = React.useState("create");

    const onClick = (x) => {
        switch (x) {
            case "create":
                setCurrentCRUD("create");
                break;
            case "update":
                setCurrentCRUD("update");
                break;
            case "delete":
                setCurrentCRUD("delete");
                break;
            default:
                setCurrentCRUD("create");
                break;
        }
    }
    switch (currentCRUD) {
        case "create":
            return (
                <div>
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <Typography.Title >Dog create form</Typography.Title>
                        <Button onClick={() => onClick("create")}>Create</Button>
                        <Button onClick={() => onClick("update")}>Update</Button>
                        <Button onClick={() => onClick("delete")}>Delete</Button>
                    </Space>
                    <DogCreateForm />
                </div>
            )
        case "update":
            return (
                <div>
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <Typography.Title >Dog update form</Typography.Title>
                        <Button onClick={() => onClick("create")}>Create</Button>
                        <Button onClick={() => onClick("update")}>Update</Button>
                        <Button onClick={() => onClick("delete")}>Delete</Button>
                    </Space>
                    <DogUpdateForm />
                </div>
            )
        case "delete":
            return (
                <div>
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <Typography.Title >Dog delete form</Typography.Title>
                        <Button onClick={() => onClick("create")}>Create</Button>
                        <Button onClick={() => onClick("update")}>Update</Button>
                        <Button onClick={() => onClick("delete")}>Delete</Button>
                    </Space>
                    <DogDeleteForm />
                </div>
            )
        default:
            return (
                <div>
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <Typography.Title >Dog create form</Typography.Title>
                        <Button onClick={() => onClick("create")}>Create</Button>
                        <Button onClick={() => onClick("update")}>Update</Button>
                        <Button onClick={() => onClick("delete")}>Delete</Button>
                    </Space>
                    <DogCreateForm />
                </div>
            )
    }
}

export default ManageDogs