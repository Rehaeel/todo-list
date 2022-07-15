import Skeleton from 'react-loading-skeleton';

const TaskSkeleton: React.FC = () => {
	return (
		<div
			className='grid w-full max-w-[700px] grid-cols-task items-center justify-between gap-4 
        rounded-2xl border border-dark-gray-color/30 px-4 py-4'>
			<div className='w-11/12'>
				<Skeleton className='h-5' />
			</div>

			<Skeleton className='btn' />
		</div>
	);
};

export default TaskSkeleton;
