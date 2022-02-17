import axios from 'axios';

export const fetchLoginUser = async (user) =>
	await axios
		.get(`${process.env.REACT_APP_DB_ENDPOINT}/user`, { headers: user })
		.then((res) => res.data);

export const fetchCheckUser = async (email) =>
	await axios
		.get(`${process.env.REACT_APP_DB_ENDPOINT}/user/${email}`)
		.then((res) => res.data);
