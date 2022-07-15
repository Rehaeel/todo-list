import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { fetchInsertTask, fetchUpdateTasks } from '../../utils/services';
import { Task } from '../../utils/types';
import { InputProps } from './types';

const Input: React.FC<InputProps> = (props) => {
	const { setTasks, isAdding, setIsAdding } = props;
	const [input, setInput] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	const onAddHandler: FormEventHandler = async (e) => {
		e.preventDefault();
		setIsAdding(true);

		const taskToInsert: Task = {
			zadanie: input,
			priorytet: `${0}`,
			id: Date.now().toString(),
		};

		setInput('');

		await fetchUpdateTasks();
		await fetchInsertTask(taskToInsert);

		setTasks((prev) => {
			const sorted = prev?.map((task) => ({
				...task,
				priorytet: (Number(task.priorytet) + 1).toString(),
			}));
			sorted?.unshift({ ...taskToInsert, id: Date.now().toString() });
			return sorted;
		});

		setIsAdding(false);
		setTimeout(() => inputRef?.current?.focus(), 0);
	};

	return (
		<section
			className='sticky top-0 z-50 mb-[25px] flex 
		h-[80px] w-full justify-center border-b border-b-[#517d9540]/25 bg-light-gray-color shadow-lg shadow-[#5787a133]'>
			<form
				onSubmit={onAddHandler}
				className=' flex w-screen max-w-[700px] items-center justify-center place-self-center'>
				<input
					type='text'
					placeholder='dodaj zadanie'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className='mr-[20px] w-fit flex-grow-[0.5] scale-100 overflow-hidden rounded-xl border
					border-dark-gray-color px-[25px] py-[15px] text-sm'
					disabled={isAdding}
					ref={inputRef}
				/>
				<button
					type='submit'
					className={`cursor-pointer rounded-xl border-none ${
						isAdding ? 'bg-gray-300' : 'bg-green-color'
					} px-[25px] py-[15px] text-sm text-white`}
					disabled={isAdding}>
					{isAdding ? '...' : 'Dodaj'}
				</button>
			</form>
		</section>
	);
};

export default Input;
