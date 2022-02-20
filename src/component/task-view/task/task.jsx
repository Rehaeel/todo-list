import { useRef, useState } from 'react';
import { fetchDeleteTask, fetchTaskUpdate } from '../../../services';
import styles from './task.module.css';

const Task = ({ task, setTasks }) => {
	const [value, setValue] = useState(task.zadanie);
	const [showTask, setShowTask] = useState(false);
	const inputRef = useRef();

	const onUpdateHandler = () => {
		const submitTask = {
			...task,
			zadanie: value,
		};
		fetchTaskUpdate(submitTask);
		setShowTask(false);
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
				onFocus={() => setShowTask(true)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						onUpdateHandler();
						inputRef.current.blur();
					}
				}}
				ref={inputRef}
			/>
			{showTask && (
				<button
					className={styles.ok}
					onClick={() => {
						inputRef.current.blur();
						onUpdateHandler();
					}}>
					✓
				</button>
			)}
			<button
				className={styles.delete}
				onClick={() => onDeleteHandler(task.id)}>
				X
			</button>
		</div>
	);
};

export default Task;
