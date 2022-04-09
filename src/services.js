import axios from 'axios';

export const fetchData = async () =>
	await axios.get(process.env.REACT_APP_DB_ENDPOINT);

export const fetchLoginUser = async (user) =>
	await axios
		.get(`${process.env.REACT_APP_DB_ENDPOINT}/user`, { headers: user })
		.then((res) => res.data);

export const fetchCheckUser = async (email) =>
	await axios
		.get(`${process.env.REACT_APP_DB_ENDPOINT}/user/${email}`)
		.then((res) => res.data);

export const fetchPostTask = async (value) =>
	await axios.post(process.env.REACT_APP_DB_ENDPOINT + `/${value}`);

export const fetchTaskUpdate = async (task) =>
	await axios.post(
		`${process.env.REACT_APP_DB_ENDPOINT}/zadanie/${task.id}`,
		{
			zadanie: task.zadanie,
		}
	);

export const fetchDeleteTask = async (id) =>
	await axios.delete(process.env.REACT_APP_DB_ENDPOINT + `/${id}`);
