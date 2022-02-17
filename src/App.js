import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.js';
import TaskView from './component/task-view/task-view.js';
import { fetchCheckUser } from './services.js';

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(false);

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
								<TaskEntryView />
								<TaskView />
							</>
						)
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
