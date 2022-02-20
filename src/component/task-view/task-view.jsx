import { useEffect } from 'react';
import './task-view.css';

import Task from './task/task';
import { fetchData } from '../../services';

const TaskView = (props) => {
	useEffect(() => {
		fetchData().then((res) => props.setTasks(res.data.reverse()));
	}, []);

	return (
		<div className='task-view'>
			{props.tasks.map((res) => (
				<Task task={res} setTasks={props.setTasks} key={res.id} />
			))}
		</div>
	);
};

export default TaskView;
