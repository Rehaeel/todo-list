import React from 'react'
import TaskEntryView from '../task-entry-view/task-entry-view.js';
import TaskView from '../task-view/task-view.js';
import './main-renderer.css';

export default class MainRenderer extends React.Component {
    render() {
        return (
            <div className="main-renderer">
                <TaskEntryView />
                <TaskView />
            </div>
        )
    }
}
