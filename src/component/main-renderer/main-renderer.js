import React from 'react'
import TaskView from '../task-view/task-view.js';
import './main-renderer.css';

export default class MainRenderer extends React.Component {
    render() {
        return (
            <div className="main-renderer">
                <h1>Cześć</h1>
                <TaskView />
            </div>
        )
    }
}
