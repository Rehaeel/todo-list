import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { fetchCheckUser } from './services.js';

import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.jsx';
import TaskView from './component/task-view/task-view.jsx';

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
								<TaskView tasks={tasks} setTasks={setTasks} />
							</>
						)
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
