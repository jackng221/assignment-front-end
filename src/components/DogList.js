import React from 'react'
import { status, json } from '../utilities/requestHandlers'

class DogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    // on start
    componentDidMount() {
        fetch('https://assignmentbackend.jackng221.repl.co/api/v1/dogs')
            .then(status)
            .then(json)
            .then(data => {
                this.setState({ list: data })
                console.log("list: ", data)
            })
            .catch(err => console.log("Error fetching dogs", err));
    }
    render() {
        if (!this.state.list.length) {
            return <h3>Loading doggies...</h3>
        }
        else {
            return (
                <div>DogList</div>
            )
        }
    }
}

export default DogList;
