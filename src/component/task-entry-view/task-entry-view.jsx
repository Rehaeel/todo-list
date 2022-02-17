import React, { useState } from 'react';
import axios from 'axios';

import './task-entry-view.css';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const TaskEntryView = () => {
	const [value, setValue] = useState('');

	const insertTask = (event) => {
		setValue(event.target.value);
	};

	const sendTask = async (task) => {
		NotificationManager.success(`${task}`, 'Dodano zadanie!');
		await axios.post(process.env.REACT_APP_DB_ENDPOINT + `/${task}`);
	};

	return (
		<form className='task-entry-view' onSubmit={() => sendTask(value)}>
			<input
				type='text'
				placeholder='dodaj zadanie'
				onChange={insertTask}
			/>
			<input type='submit' value='Dodaj' />
			<NotificationContainer />
		</form>
	);
};

export default TaskEntryView;
