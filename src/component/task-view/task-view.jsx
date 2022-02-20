import './task-view.css';

import Task from './task/task';

const TaskView = (props) => (
	<div className='task-view'>
		{props.tasks.map((res) => (
			<Task task={res} setTasks={props.setTasks} key={res.id} />
		))}
	</div>
);

export default TaskView;
