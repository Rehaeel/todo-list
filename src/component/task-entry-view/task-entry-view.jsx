import React, { useState } from 'react';
import axios from 'axios';

import './task-entry-view.css';

const TaskEntryView = (props) => {
	const [value, setValue] = useState('');

	const insertTask = (event) => {
		setValue(event.target.value);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		await axios.post(process.env.REACT_APP_DB_ENDPOINT + `/${value}`);
		const task = { zadanie: value, id: Math.random() };
		props.setTasks((prevTasks) => [...prevTasks, task]);
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
