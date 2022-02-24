export const returnUpdatedTasks = (tasks, fetched) =>
	fetched.filter((task) => {
		const foundEl = tasks.find((el) => el.id === task.id);
		console.log(task);
		return task.zadanie !== foundEl.zadanie;
	});

export const compareArrs = (tasks, newTasks) => {
	const newTasksArr = newTasks;
	const newArr = tasks.map((task) => {
		const foundEl = newTasks.find((el) => el.id === task.id);
		if (foundEl) {
			newTasksArr.pop(foundEl);
			return foundEl;
		} else return task;
	});
	return [...newArr, ...newTasksArr];
};
