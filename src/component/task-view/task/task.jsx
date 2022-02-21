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
		<form
			className={`task ${styles.task}`}
			onSubmit={(e) => {
				e.preventDefault();
				onUpdateHandler();
			}}>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onFocus={() => {
					setShowTask(true);
				}}
				onBlur={() => {
					setShowTask(false);
				}}
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
					}}
					type='submit'>
					✓
				</button>
			)}
			<button
				className={styles.delete}
				onClick={() => onDeleteHandler(task.id)}
				type='button'>
				X
			</button>
		</form>
	);
};

export default Task;
