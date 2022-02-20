import { useEffect } from 'react';
import './task-view.css';

import axios from 'axios';
import Task from './task/task';

const TaskView = (props) => {
	useEffect(() => {
		const fetchData = async () => {
			return await axios
				.get(process.env.REACT_APP_DB_ENDPOINT)
				.then((res) => props.setTasks(res.data));
		};
		fetchData();
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
