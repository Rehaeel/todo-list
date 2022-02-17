import TaskEntryView from './component/task-entry-view/task-entry-view.js';
import TaskView from './component/task-view/task-view.js';

function App() {
	return (
		<div className='main-renderer'>
			<TaskEntryView />
			<TaskView />
		</div>
	);
}

export default App;
