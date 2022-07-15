import { ResponseMessage, Task, User } from './types';

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchLoginUser = async (user: User): Promise<ResponseMessage> => {
	const response: Response = await fetch(`/api/user`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	return await response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchTasks = async (): Promise<Task[]> => {
	const response: Response = await fetch(`/api/tasks`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	});
	return await response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchInsertTask = async (task: Task): Promise<ResponseMessage> => {
	const response: Response = await fetch(`/api/tasks`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(task),
	});

	return await response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchUpdateTasks = async (): Promise<ResponseMessage> => {
	const response: Response = await fetch(`/api/tasks`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
		},
	});

	return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchDeleteTask = async (id: string): Promise<ResponseMessage> => {
	const response: Response = await fetch(`/api/tasks/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
	});

	return await response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////
export const fetchUpdateTask = async (
	id: string,
	zadanie: string
): Promise<ResponseMessage> => {
	const response: Response = await fetch(`/api/tasks/${id}`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ zadanie }),
	});

	return await response.json();
};
