import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { fetchCheckUser, fetchData } from './services.js';

import Login from './component/login/login.jsx';
import TaskEntryView from './component/task-entry-view/task-entry-view.jsx';
import './component/task-view/task-view.css';
import Task from './component/task-view/task/task.jsx';
import { compareArrs } from './helperFunctions.js';

function App() {
	const navigate = useNavigate();
	const location = useLocation();
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
					fetchData().then((res) => setTasks(res.data.reverse()));
					setAreTasksFetched(true);
				})
				.catch(() => {
					setUser(false);
					window.localStorage.removeItem('user');
					navigate('/login');
					setAreTasksFetched(false);
				});
		} else {
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

			// if (
			// 	compareArrs(tasks, fetchedTasks).length > 0 &&
			// 	Notification.permission === 'granted'
			// ) {
			// 	const notification = new Notification('Nowa pozycja!', {
			// 		icon: 'https://download.flaticon.com/download/icon/4911942?icon_id=4911942&author=346&team=346&keyword=Shopping+bag&pack=4911763&style=Flat&style_id=569&format=png&color=%23000000&colored=2&size=512&selection=1&premium=&type=standard&token=03AGdBq274PBsiGi7lOZvlZoG9yhuZqy0lbzeA_7xTUtubOErKCYX2_YgefbZrtqblRH1eFJ7BoLy4pUIA62YNYfO6VnncZhBi1rKMuGaEOZm5-czQrCbcN5cABARFCAO8TG03tyAbsBFO8dRFRwJOmu4JWLW5h2CFL2UcWYnD3eFbFRUh1jN4TEf-xalqF2pGNuFcur4wj4jHV75q3Y-0jBO9j3JlLD-1PaTfuhPKXPUbB_1WonDpQKRwWtH-y5sArTpblvK4mtXdayCPcDQ-yCSAlF3VeoXI_6m0fHSrgprs-V2cvrrq902FJH9W5iy54-xhMUq19h_P3W9dFy4fYJ0v-kBoQ7TBceSGZzXKeCfXywreXULXimQhCMhgSgXzTu0ZpTOo_BCd8vYO-F3CJ2U6UzNXbSKO1TSM5beCjIV6cGTJqmryvGBswkCzH1MghtAf8M6V-8E_2ZBbyCrziZxOAqvN-HZ6ecLMPArA0SUPi9KIeUbT7DJjrNQcUny1PjxAYkmDwPKQLMXlZPOG-2Cv9jEcugZNkcpgbyhq7JBn-HFqFM-qSsDAjvdpOp-0Ya7VMgmpduxH8B51Gzi5qCwmTPcXEAu-DKFybgFbpyGyaP7sWuMkvNN5UG8aSkL5IyUxUunkfw8C7S2CzzNkJc6ua1qUOG222ynCk4-EFPk9WXMH_yiuIt8D7EB0pCuHV2eT3wT9OR9S6eZDXf9tIF2V1QhxGnydclSb9bVWYSM8ILfdbomKog9FU7_RQEErYDJrwJAPgbxLXHxUxF__55WdIQUFwEb0GDAwqWE_5v_Ab_IMshMzgiYAY7vSUHZP4o1UvopGVnlC4dUWZQpUwdZ9E73trtryntd54d2b3b6qq_VBa7TRyJqypFQveawoCbD6xsDPi5uLAcJMg7jzhD4gxwTsVgHsXn1NE7dAQoNwMXMgejQSLYmfW-_UJrZDPj8HXCoWFTRdkdYwyVHDTPHPh5YBpDr0h1VFl4UNim4T4UR-GFF-D3c1NZdvwbbIjZf3ot1WAt8aQtF7foBcZc7HjRQdbeR7uDr5yxczjinEsFIrVvX4M7xECbdMBfTgVICVu6HUPTukgtBpZqOWWAqZlf18uCBk9Fb9NHEON7djUu4z-C55srPluB84xTJRb0C1XgHnG-5RQge13gDZFgBs9vuI6ETWo1e2-V1UjiZeujyBzTrP70x6VXsKIettq59xwd6lJFim&search=item',
			// 	});

			// 	notification.onclick = () =>
			// 		(window.location.href = 'https://todo.prokopiak.pl');
			// }
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
								<div className='task-view'>
									{tasks.map((res) => (
										<Task
											task={res}
											setTasks={setTasks}
											key={res.id}
											setIsEditingTask={setIsEditingTask}
										/>
									))}
								</div>
							</>
						)
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
