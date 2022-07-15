import { useEffect, useRef, useState } from 'react';
import { fetchDeleteTask, fetchUpdateTask } from '../../utils/services';
import { TaskProps } from './types';
import autosize from 'autosize';

const Task: React.FC<TaskProps> = (props) => {
	const { task, setTasks, setIsEditing } = props;
	const [showUpdateBtn, setShowUpdateBtn] = useState<boolean>(false);
	const [taskValue, setTaskValue] = useState<string>(task.zadanie);
	const textareaRef = useRef(null);

	const onDeleteHandler = (): void => {
		setTasks((prev) => prev?.filter((t) => t.id !== task.id));
		fetchDeleteTask(task.id);
	};

	const onUpdateHandler: React.FormEventHandler = (e): void => {
		e.preventDefault();
		setTasks((prevTasks) => {
			if (prevTasks)
				return [...prevTasks].map((t) =>
					t.id === task.id ? { ...task, zadanie: taskValue } : t
				);
		});
		fetchUpdateTask(task.id, taskValue);
	};

	useEffect(() => {
		if (textareaRef?.current) autosize(textareaRef.current);
	}, [textareaRef]);

	return (
		<form
			className='grid h-fit min-h-[3em] w-full max-w-[700px] grid-cols-task items-center justify-between 
        gap-4 break-words rounded-2xl border border-dark-gray-color/30 bg-light-gray-color px-4 py-4
        shadow shadow-dark-gray-color/5'
			onSubmit={onUpdateHandler}>
			<textarea
				className='h-fit min-h-[1em] w-full resize-none border-none bg-transparent py-2 px-4 align-middle text-sm 
            font-normal text-dark-gray-color focus:w-full focus:outline focus:outline-1'
				rows={1}
				defaultValue={taskValue}
				onChange={(e) => setTaskValue(e.target.value)}
				onFocus={() => {
					setShowUpdateBtn(true);
					setIsEditing(true);
				}}
				onBlur={() => {
					setTimeout(() => {
						setShowUpdateBtn(false);
						setIsEditing(false);
					}, 250);
				}}
				ref={textareaRef}
			/>
			{showUpdateBtn ? (
				<button
					type='submit'
					className='btn border border-red-color/30 bg-green-color text-base'>
					✓
				</button>
			) : (
				<button
					type='button'
					className='btn border border-red-color/30 bg-light-red-color'
					onClick={onDeleteHandler}>
					X
				</button>
			)}
		</form>
	);
};

export default Task;
