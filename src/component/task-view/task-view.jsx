import { useEffect } from 'react';
import './task-view.css';

import { motion } from 'framer-motion';
import axios from 'axios';

const TaskView = (props) => {
	useEffect(() => {
		const fetchData = async () => {
			return await axios
				.get(process.env.REACT_APP_DB_ENDPOINT)
				.then((res) => props.setTasks(res.data));
		};
		fetchData();
	}, []);

	const deleteTask = async (id) => {
		props.setTasks((prevTasks) =>
			[...prevTasks].filter((task) => task.id !== id)
		);
		await axios.delete(process.env.REACT_APP_DB_ENDPOINT + `/${id}`);
	};

	return (
		<motion.div className='task-view'>
			{props.tasks.map((res) => (
				<div className='task' key={res.id}>
					<h4>{res.zadanie}</h4>
					<button onClick={() => deleteTask(res.id)}>X</button>
				</div>
			))}
		</motion.div>
	);
};

export default TaskView;
