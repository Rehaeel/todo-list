import { useRef, useState } from 'react';
import { fetchDeleteTask, fetchTaskUpdate } from '../../../services';
import styles from './task.module.css';

const Task = ({ task, setTasks }) => {
	const [value, setValue] = useState(task.zadanie);
	const inputRef = useRef();

	const onUpdateHandler = () => {
		const submitTask = {
			...task,
			zadanie: value,
		};
		fetchTaskUpdate(submitTask);
	};

	const onDeleteHandler = async (id) => {
		setTasks((prevTasks) =>
			[...prevTasks].filter((task) => task.id !== id)
		);
		fetchDeleteTask(id);
	};

	return (
		<div className={`task ${styles.task}`}>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onUpdateHandler}
				onSubmit={(e) => {
					e.preventDefault();
					inputRef.current.blur();
				}}
				ref={inputRef}
			/>
			<button onClick={() => onDeleteHandler(task.id)}>X</button>
		</div>
	);
};

export default Task;
