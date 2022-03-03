import React, { useState } from 'react';

import './task-entry-view.css';
import { fetchPostTask } from '../../services';

const TaskEntryView = (props) => {
	const [value, setValue] = useState('');

	const insertTask = (event) => {
		setValue(event.target.value);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		fetchPostTask(value);
		const task = { zadanie: value, id: Math.random() };
		props.setTasks((prevTasks) => [task, ...prevTasks]);

		setValue('');
	};

	return (
		<form className='task-entry-view' onSubmit={onSubmitHandler}>
			<input
				type='text'
				placeholder='dodaj zadanie'
				onChange={insertTask}
				value={value}
			/>
			<input type='submit' value='Dodaj' />
		</form>
	);
};

export default TaskEntryView;
