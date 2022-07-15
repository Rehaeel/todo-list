import { NextApiRequest, NextApiResponse } from 'next';
import { connectUsersDB } from '../../../utils/helper-functions';
import { ResponseMessage, Task } from '../../../utils/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Task | ResponseMessage>
) {
	if (req.method !== 'POST') return;

	const { email, password } = req.body;

	const usersDB = connectUsersDB();

	usersDB.connect();

	const queryString = `SELECT email FROM users WHERE email='${email}' AND password='${password}'`;
	usersDB.query(queryString, (err, response) => {
		if (err)
			return res.status(500).json({ message: "Couldn't connect to DB" });

		if (response.length > 0) {
			const message = response[0].email;
			return res.status(200).json({ message });
		}
		return res.status(404).json({ message: `Couldn't find the user` });
	});

	usersDB.end();
}
