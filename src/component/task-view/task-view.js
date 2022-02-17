import { useEffect, useState } from 'react';
import axios from 'axios';
import './task-view.css';

import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const TaskView = () => {
	const [tasks, setTasks] = useState([]);

	const fetchData = async () => {
		return await axios
			.get(process.env.REACT_APP_DB_ENDPOINT)
			.then((res) => setTasks(res.data));
	};
	useEffect(() => {
		fetchData();
	}, []);

	const deleteTask = async (id) => {
		NotificationManager.error(
			'poprawnie usunięto zadanie',
			'Usunięto zadanie'
		);
		await axios.delete(process.env.REACT_APP_DB_ENDPOINT + `/${id}`);
		fetchData();
	};

	return (
		<div className='task-view'>
			{tasks.map((res) => (
				<div className='task' key={res.id}>
					<h4>{res.zadanie}</h4>
					<button onClick={() => deleteTask(res.id)}>X</button>
				</div>
			))}
			<NotificationContainer />
		</div>
	);
};

export default TaskView;
