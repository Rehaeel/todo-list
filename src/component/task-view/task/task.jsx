import { useEffect, useRef, useState } from 'react';

import { fetchDeleteTask, fetchTaskUpdate } from '../../../services';
import styles from './task.module.css';
import autosize from 'autosize';

const Task = ({ task, setTasks, setIsEditingTask }) => {
	const [initValue, setInitValue] = useState(task.zadanie);
	const [showUpdateBtn, setShowUpdateBtn] = useState(false);
	const inputRef = useRef();

	const onUpdateHandler = () => {
		const submitTask = {
			...task,
			zadanie: inputRef.current.value,
		};
		fetchTaskUpdate(submitTask);
		setTasks((prevTasks) =>
			[...prevTasks].map((t) => (t.id === task.id ? submitTask : t))
		);
		setInitValue(inputRef.current.value);
	};

	useEffect(() => {
		if (inputRef.current !== undefined) {
			autosize(inputRef.current);
		}
	}, [inputRef]);

	const onDeleteHandler = (id) => {
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
				inputRef.current.blur();
			}}>
			<textarea
				style={{ width: `calc(100% - 25px)` }}
				defaultValue={initValue}
				onFocus={() => {
					setShowUpdateBtn(true);
					setIsEditingTask(true);
				}}
				onBlur={() => {
					setTimeout(() => {
						setShowUpdateBtn(false);
						setIsEditingTask(false);
					}, 250);
				}}
				rows={1}
				ref={inputRef}
			/>

			{showUpdateBtn ? (
				<button type='submit' className={styles.ok}>
					✓
				</button>
			) : (
				<button
					type='button'
					className={styles.delete}
					onClick={() => onDeleteHandler(task.id)}>
					X
				</button>
			)}
		</form>
	);
};

export default Task;
