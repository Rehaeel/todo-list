import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseMessage, Task } from '../../utils/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Task[] | ResponseMessage>
) {
	return;
}
