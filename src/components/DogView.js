/**
* A module to view details of a dog.
* @module components/DogView
* @author Jack
* @see Dog for the page to display this module.
*/

import { Col, Row, Space } from 'antd';
import React, { Component } from 'react'
import DogCard from './DogCard';
import { status, json } from '../utilities/requestHandlers';

export default class DogView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogData: [],
        }
        this.ID = props.data;
    }
    componentDidMount() {
        fetch('https://assignmentbackend.jackng221.repl.co/api/v1/dogs/' + this.ID)
            .then(status)
            .then(json)
            .then(data => {
                this.setState({ dogData: data })
                console.log("data ", data)
            })
            .catch(err => console.log("Error fetching dog", err));
    }
    render() {
        if (!this.state.dogData.length) {
            return (
                <Space style={{ width: "100%", justifyContent: "center" }}>
                    <h3>Loading doggie...</h3>

                </Space>
            )
        }
        else {
            const card = this.state.dogData.map(data => {
                return (
                    <div style={{ padding: "10px" }} key={data.id} >
                        <Col span={6}>
                            <DogCard {...data} />
                        </Col>
                    </div>
                )
            });
            return (
                <Row type="flex" justify="space-around">
                    {card}
                </Row>)
        }
    }
}
