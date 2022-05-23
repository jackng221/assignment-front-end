import React, { useState } from 'react';
import { Input } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { Table, Select, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Column } = Table;
const { Search } = Input;

function DogSearch() {

    const [press, setPress] = useState("");
    const [dogsData, setDogsData] = useState([]);
    const [isSearchOK, setSearch] = useState(false);

    const fields = "id%name%age%weight%sex%location%breed"
    var searchType = "";

    const onSearch = value => {
        console.log("value ", value)
        console.log("press ", `${press}`)
        let urlPath = "https://assignmentbackend.jackng221.repl.co/api/v1/dogs";
        switch (`${press}`){
            case "age":
                searchType = "number";
                urlPath += `/search/?type=${searchType}&fields=${fields}&sfields=${press}&q=${value}`
                break;
            case "sex":
            case "breed":
                searchType = "text";
                urlPath += `/search/?type=${searchType}&fields=${fields}&sfields=${press}&q=${value}`
                break;
            default:
                urlPath += `/search/?type=${searchType}&fields=${fields}`
        }

        console.log("urlPath ", urlPath)

        return (fetch(`${urlPath}`, {
            method: "GET"
        })
            .then(status)
            .then(json)
            .then(data => {
                console.log("user return  ", JSON.stringify(data));
                console.log("user data  ", data);
                setDogsData(data);
                setSearch(true);
                value = "";
            })
            .catch(err => console.log("Error fetching users", err))
        )
    }

    const { Option } = Select;

    function handleChange(value) {
        //message.info("Pls. enter at least three characters to search by email or username otherwise leave the input empty")

        setPress(value);
        console.log(`selected ${value}`);
    }
    return (
        <>
            <Col span={16}>
                <Search placeholder="Search dogs"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch} />
                <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="age">age</Option>
                    <Option value="sex">sex</Option>
                    <Option value="breed">breed</Option>
                    <Option value="all">Get all-without filter</Option>
                </Select>
                {isSearchOK && <Table dataSource={dogsData}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" render={text => <Link to="/dog">{text}</Link>} />
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Weight" dataIndex="weight" key="weight" />
                    <Column title="Sex" dataIndex="sex" key="sex" />
                    <Column title="Breed" dataIndex="breed" key="breed" />
                    <Column title="Location" dataIndex="location" key="location" />
                </Table>}
            </Col>

        </>
    );
}

export default DogSearch;

