import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { fetchCheckUser, fetchData } from './services.js';

import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.jsx';
import './component/task-view/task-view.css';
import Task from './component/task-view/task/task.jsx';
import { compareArrs, returnUpdatedTasks } from './helperFunctions.js';

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [fetchedTasks, setFetchedTasks] = useState([]);

	useEffect(() => {
		if (window.localStorage.getItem('user')) {
			fetchCheckUser(window.localStorage.getItem('user'))
				.then(() => {
					setUser(true);
					navigate('/');
					fetchData().then((res) => setTasks(res.data.reverse()));
				})
				.catch(() => {
					setUser(false);
					window.localStorage.removeItem('user');
					navigate('/login');
				});
		} else {
			setUser(false);
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		setInterval(() => {
			fetchData().then((res) => setFetchedTasks(res.data.reverse()));
		}, 2000);
	}, []);

	useEffect(() => {
		const newTasks = returnUpdatedTasks(tasks, fetchedTasks);
		if (newTasks.length > 0) {
			const newArr = [...compareArrs(tasks, newTasks)];
			Promise.resolve()
				.then(() => setTasks([]))
				.then(() => setTasks(newArr));
		}
	}, [fetchedTasks]);

	return (
		<div className='main-renderer'>
			<Routes>
				<Route path='/login' element={<Login setUser={setUser} />} />
				<Route
					exact
					path='/'
					element={
						user && (
							<>
								<TaskEntryView
									tasks={tasks}
									setTasks={setTasks}
								/>
								(
								<div className='task-view'>
									{tasks.map((res) => (
										<Task
											task={res}
											setTasks={setTasks}
											key={res.id}
										/>
									))}
								</div>
								)
							</>
						)
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
