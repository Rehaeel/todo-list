import { NextApiRequest, NextApiResponse } from 'next';
import { connectTodoDB } from '../../../utils/helper-functions';
import { ResponseMessage, Task } from '../../../utils/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Task | ResponseMessage>
) {
	//////////////////////////////////////////////////////////////////////////////////////////
	if (req.method === 'DELETE') {
		const { id } = req.query;

		const todoDB = connectTodoDB();
		todoDB.connect();

		const queryString = `DELETE FROM todoList WHERE id=${id}`;
		todoDB.query(queryString, (err, response) => {
			if (err) {
				return res.status(400).json({ message: "couldn't delete" });
			}

			if (response['affectedRows'] === 1) {
				return res.status(201).json({ message: 'Success!' });
			} else {
				return res
					.status(400)
					.json({ message: `Couldn't delete the task` });
			}
		});
		todoDB.end();
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	if (req.method === 'PUT') {
		const { id } = req.query;
		const { zadanie } = req.body;

		const todoDB = connectTodoDB();
		todoDB.connect();

		const queryString = `UPDATE todoList SET zadanie='${zadanie}' WHERE id='${id}'`;
		todoDB.query(queryString, (err, response) => {
			if (err) {
				return res
					.status(500)
					.json({ message: `Couldn't update the tas` });
			}

			if (response['affectedRows'] === 1) {
				return res.status(201).json({ message: 'Success!' });
			} else {
				return res
					.status(400)
					.json({ message: `Couldn't update the task` });
			}
		});

		todoDB.end();
	}
}
