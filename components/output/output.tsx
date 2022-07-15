import Task from './task';
import TaskSkeleton from './task-skeleton';
import { OutputProps } from './types';

const Output: React.FC<OutputProps> = (props) => {
	const { tasks, setTasks, isFetched, setIsEditing, isAdding } = props;

	const skeleton = Array(12)
		.fill(0)
		.map((s, i) => <TaskSkeleton key={i} />);

	return (
		<section className='h-output w-full  bg-gray-color px-[3%] pt-2'>
			<div className='flex flex-col items-center gap-5'>
				{!isFetched && skeleton}

				{isAdding && <TaskSkeleton />}
				{tasks?.map((task, i) => (
					<Task
						key={task.id}
						task={task}
						setIsEditing={setIsEditing}
						setTasks={setTasks}
					/>
				))}
			</div>
		</section>
	);
};

export default Output;
