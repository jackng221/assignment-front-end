import { Card } from 'antd'
import React, { Component } from 'react'

export default class DogCard extends Component {
    render() {
        return (
            <Card
                style={{ width: 320 }}
                cover={<img alt="image" src={this.props.imageurl} />}

                hoverable={true}
            >
                <Meta title={this.props.name} />
                <Link to={`/dashboard/${this.props.id}`}>Details</Link>
            </Card>
        )
    }
}