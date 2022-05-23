import { Card } from 'antd'
import React, { Component } from 'react'
import UserContext from '../contexts/user';

export default class DogCard extends Component {
    static contextType = UserContext;

    render() {
        if (this.context.user.loggedIn){
            return (
                <Card
                    style={{ width: 320 }}
                    cover={<img alt="doggie" src={require(`../img/${this.props.imagefilename}`)} />}
                    hoverable={true}
                    actions={[
                        //to do
                    ]}
                >
                    <Card.Meta title={this.props.name} />
                    <Card.Meta description={`Age: ${this.props.age}`} />
                    <Card.Meta description={`Weight: ${this.props.weight}`} />
                    <Card.Meta description={`Sex: ${this.props.sex}`} />
                    <Card.Meta description={`Breed: ${this.props.breed}`} />
                    <Card.Meta description={`Current location: ${this.props.location}`} />
                </Card>
            )
        }
        else {
            return (
                <Card
                    style={{ width: 320 }}
                    cover={<img alt="doggie" src={require(`../img/${this.props.imagefilename}`)} />}
                    hoverable={true}
                >
                    <Card.Meta title={this.props.name} />
                    <Card.Meta description={`Age: ${this.props.age}`} />
                    <Card.Meta description={`Weight: ${this.props.weight}`} />
                    <Card.Meta description={`Sex: ${this.props.sex}`} />
                    <Card.Meta description={`Breed: ${this.props.breed}`} />
                    <Card.Meta description={`Current location: ${this.props.location}`} />
                </Card>
            )
        }
    }
}