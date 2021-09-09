import React from 'react'
import './task-view.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const axios = require('axios').default;

export default class TaskView extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        }
        this.fetchData = this.fetchData.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async fetchData() {
        let response = await axios.get(process.env.REACT_APP_DB_ENDPOINT);
        this.setState({ tasks: response.data });
    }

    deleteTask = async (id) => {
        NotificationManager.error('poprawnie usunięto zadanie', 'Usunięto zadanie');
        await axios.delete(process.env.REACT_APP_DB_ENDPOINT + `/${id}`);
        this.fetchData();
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        return (
            <div className="task-view">
                {this.state.tasks.map(res =>
                    <div className="task" key={res.id}>
                        <h4>{res.zadanie}</h4>
                        <button onClick={() => this.deleteTask(res.id)}>X</button>
                    </div>
                )}
                <NotificationContainer />
            </div>
        )
    }
}
