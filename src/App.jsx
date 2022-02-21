import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { fetchCheckUser, fetchData } from './services.js';

import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.jsx';
import './component/task-view/task-view.css';
import Task from './component/task-view/task/task.jsx';

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(false);
	const [tasks, setTasks] = useState([]);

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
		const interval = setInterval(
			fetchData().then((res) => setTasks(res.data.reverse())),
			3000
		);
		return () => clearInterval(interval);
	}, [tasks]);

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
