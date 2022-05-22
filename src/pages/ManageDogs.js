import { Button, Space, Typography } from 'antd';
import React from 'react'
import DogEntryForm from '../components/DogEntryForm'

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
    return (
        <div>
            <Space style={{ width: "100%", justifyContent: "center" }}>
                <Typography.Title >Dog entry form</Typography.Title>
                <Button onClick={() => onClick("create")}>Create</Button>
                <Button onClick={() => onClick("update")}>Update</Button>
                <Button onClick={() => onClick("delete")}>Delete</Button>
            </Space>
            <DogEntryForm />
        </div>
    )
}

export default ManageDogs