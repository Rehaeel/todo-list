import mysql from 'mysql';

export const cloneArray = (arr: any) => JSON.parse(JSON.stringify(arr));

export const connectTodoDB = () => {
	const todoDB = mysql.createConnection({
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});

	return todoDB;
};

export const connectUsersDB = () => {
	const usersDB = mysql.createConnection({
		user: process.env.USER_DB_USER,
		host: process.env.USER_DB_HOST,
		password: process.env.USER_DB_PASSWORD,
		database: process.env.USER_DB_DATABASE,
	});

	return usersDB;
};
