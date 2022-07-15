import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Input from '../components/input/input';
import Output from '../components/output/output';
import { fetchTasks } from '../utils/services';
import { Task } from '../utils/types';

const Home: NextPage = () => {
	const router = useRouter();
	const [tasks, setTasks] = useState<Task[] | undefined>();
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [fetchedTasks, setFetchedTasks] = useState<Task[] | undefined>();

	useEffect(() => {
		if (window?.localStorage.getItem('email')) {
			fetchTasks().then((res) => {
				setTasks(res?.sort((a, b) => +a.priorytet - +b.priorytet));
				setIsFetched(true);
			});
		} else router.push('/login');
	}, [router]);

	useEffect(() => {
		const interval = setInterval(() => {
			fetchTasks().then((res) =>
				setFetchedTasks(
					res?.sort((a, b) => +a.priorytet - +b.priorytet)
				)
			);
		}, 2500);
		() => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!isEditing)
			Promise.resolve()
				.then(() => setTasks([]))
				.then(() => setTasks(fetchedTasks));
	}, [fetchedTasks, isEditing]);

	return (
		<SkeletonTheme baseColor='#c2cad0' highlightColor='#dde4ea'>
			<main className='flex min-h-screen w-screen flex-col items-center justify-center'>
				<Input
					setTasks={setTasks}
					isAdding={isAdding}
					setIsAdding={setIsAdding}
				/>
				<Output
					tasks={tasks}
					isFetched={isFetched}
					setIsEditing={setIsEditing}
					setTasks={setTasks}
					isAdding={isAdding}
				/>
			</main>
		</SkeletonTheme>
	);
};

export default Home;
