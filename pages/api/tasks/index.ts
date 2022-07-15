import { NextApiRequest, NextApiResponse } from 'next';
import { connectTodoDB } from '../../../utils/helper-functions';
import { ResponseMessage, Task } from '../../../utils/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Task[] | ResponseMessage>
) {
	//////////////////////////////////////////////////////////////////////////////////////////
	if (req.method === 'GET') {
		const tasksDB = connectTodoDB();
		tasksDB.connect();

		const queryString = 'SELECT * FROM todoList';
		tasksDB.query(queryString, (err, response) => {
			if (err) {
				return res.status(500).json({ message: 'Fail fetching tasks' });
			}

			return res.status(200).json(response);
		});

		tasksDB.end();
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	if (req.method === 'POST') {
		const task: Task = req.body;

		const taskDB = connectTodoDB();

		taskDB.connect();

		const queryString = `INSERT INTO todoList (zadanie, priorytet, id) VALUES("${task.zadanie}", "${task.priorytet}", "${task.id}")`;
		taskDB.query(queryString, (err, response) => {
			if (err)
				return res
					.status(500)
					.json({ message: 'Querying tasks failed' });

			if (response['affectedRows'] === 0)
				return res.status(400).json({ message: "couldn't add" });
			else return res.status(201).json({ message: 'success' });
		});

		taskDB.end();
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	if (req.method === 'PUT') {
		const taskDB = connectTodoDB();

		const queryString = `UPDATE todoList SET priorytet = priorytet + 1`;
		taskDB.query(queryString, (err, response) => {
			if (err) return res.status(500).json({ message: 'Updating fail' });
			return res.status(200).json({ message: 'success' });
		});
		taskDB.end();
	}
}
