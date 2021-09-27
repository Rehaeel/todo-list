import React from 'react'
import TaskEntryView from '../task-entry-view/task-entry-view.js';
import TaskView from '../task-view/task-view.js';
import './main-renderer.css';
import ReactGA from 'react-ga';

export default class MainRenderer extends React.Component {
    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <div className="main-renderer">
                <TaskEntryView />
                <TaskView />
            </div>
        )
    }
}
