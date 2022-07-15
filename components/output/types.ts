import { Dispatch, SetStateAction } from 'react';
import { Task } from '../../utils/types';

export interface OutputProps {
	tasks?: Task[];
	isFetched: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	setTasks: Dispatch<SetStateAction<Task[] | undefined>>;
	isAdding: boolean;
}

export interface TaskProps {
	task: Task;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	setTasks: Dispatch<SetStateAction<Task[] | undefined>>;
}
