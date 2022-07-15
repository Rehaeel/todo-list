import { Dispatch, SetStateAction } from 'react';
import { Task } from '../../utils/types';

export interface InputProps {
	setTasks: Dispatch<SetStateAction<Task[] | undefined>>;
	isAdding: boolean;
	setIsAdding: Dispatch<SetStateAction<boolean>>;
}
