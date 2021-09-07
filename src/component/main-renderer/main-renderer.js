import React from 'react'
import './main-renderer.css';
import { axios } from 'axios';

export default class MainRenderer extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData() {
        let response = await axios.get(process.env.REACT_APP_DB_ENDPOINT);
        this.setState({ tasks: response });
        console.log(response);
    }

    async componentDidMount() {
        await this.fetchData;
    }
    render() {
        return (
            <div className="main-renderer">
                <h1>Cześć</h1>
                {this.state.tasks.map(res =>
                    <h3>{res.data}</h3>
                )}
            </div>
        )
    }
}
