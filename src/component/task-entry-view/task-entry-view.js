import React from 'react'
import './task-entry-view.css';
const axios = require('axios');

export default class TaskEntryView extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ""
        }
        this.insertTask = this.insertTask.bind(this);
        this.sendTask = this.sendTask.bind(this);
    }

    insertTask(event) {
        console.log(this.state.value)
        this.setState({ value: event.target.value });
    }

    sendTask(task) {
        axios.post(process.env.REACT_APP_DB_ENDPOINT + `/${task}`);
    }

    render() {
        return (
            <form className="task-entry-view" onSubmit={() => this.sendTask(this.state.value)}>
                <input type="text" placeholder="dodaj zadanie" onChange={this.insertTask} />
                <input type="submit" value="Dodaj" />
            </form>
        )
    }
}
