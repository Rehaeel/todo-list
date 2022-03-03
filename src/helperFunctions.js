export const returnUpdatedTasks = (tasks, fetched) =>
	fetched.filter((task) => {
		const foundEl = tasks.find((el) => el.id === task.id);
		if (foundEl) return task.zadanie !== foundEl.zadanie;
		else return true;
	});

export const compareArrs = (tasks, newTasks) =>
	newTasks.filter((e) => !tasks.some((e2) => e.id === e2.id));
