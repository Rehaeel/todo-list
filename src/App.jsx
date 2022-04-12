import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { fetchCheckUser, fetchData } from './services.js';

import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.jsx';
import './component/task-view/task-view.css';
import Task from './component/task-view/task/task.jsx';

import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isAppFetched, setIsAppFetched] = useState(false);
	const [user, setUser] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [areTasksFetched, setAreTasksFetched] = useState(false);
	const [fetchedTasks, setFetchedTasks] = useState([]);
	const [isEditingTask, setIsEditingTask] = useState(false);

	useEffect(() => {
		if (window.localStorage.getItem('user')) {
			fetchCheckUser(window.localStorage.getItem('user'))
				.then(() => {
					setUser(true);
					navigate('/');
					fetchData().then((res) => {
						setTasks(res.data.reverse());
						setIsAppFetched(true);
					});
					setAreTasksFetched(true);
				})
				.catch(() => {
					setUser(false);
					window.localStorage.removeItem('user');
					navigate('/login');
					setAreTasksFetched(false);
				});
		} else {
			setIsAppFetched(true);
			setUser(false);
			navigate('/login');
			setAreTasksFetched(false);
		}
	}, [user]);

	useEffect(() => {
		setInterval(() => {
			fetchData().then((res) => setFetchedTasks(res.data.reverse()));
		}, 2000);
	}, []);

	useEffect(() => {
		if (location.pathname === '/' && areTasksFetched && !isEditingTask) {
			Promise.resolve()
				.then(() => setTasks([]))
				.then(() => setTasks(fetchedTasks));
		}
	}, [fetchedTasks]);

	return (
		<div className='main-renderer'>
			{isAppFetched ? (
				<Routes>
					<Route
						path='/login'
						element={
							<Login
								setUser={setUser}
								setIsAppFetched={setIsAppFetched}
							/>
						}
					/>
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
									<div className='task-view'>
										{tasks.map((res) => (
											<Task
												task={res}
												setTasks={setTasks}
												key={res.id}
												setIsEditingTask={
													setIsEditingTask
												}
											/>
										))}
									</div>
								</>
							)
						}
					/>
				</Routes>
			) : (
				<div
					style={{
						height: '90vh',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<ReactSpinner />
				</div>
			)}
		</div>
	);
}

export default App;
