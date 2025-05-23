import type { Task } from '$lib/types/task';

export const load = async () => {
	const res = await fetch(`http://localhost:3000/api/v1/tasks/`);
	if (!res.ok) {
		throw new Error('Failed to fetch tasks');
	}
	const tasks: Task[] = await res.json();

	return {
		tasks
	};
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const description = formData.get('description');

		const res = await fetch(`http://localhost:3000/api/v1/tasks/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, description })
		});

		if (!res.ok) {
			throw new Error('Failed to create task');
		}

		return {
			status: 201,
			body: await res.json()
		};
	},
	updateCompleted: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const completed = formData.get('completed') === 'on' ? true : false;
		const newCompleted = !completed;

		const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ completed: newCompleted })
		});
		if (!res.ok) {
			throw new Error('Failed to update task');
		}
		return {
			status: 200,
			body: await res.json()
		};
	},
	updateTask: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const title = formData.get('title');
		const description = formData.get('description');
		const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, description })
		});
		if (!res.ok) {
			throw new Error('Failed to update task');
		}
		return {
			status: 200,
			body: await res.json()
		};
	},
	deleteTask: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw new Error('Failed to delete task');
		}
		return {
			status: 200,
			body: await res.json()
		};
	}
};
