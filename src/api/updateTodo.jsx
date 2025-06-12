export default async function updateTodo (id, data)  {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}
	);
	if (!response.ok) throw new Error("Update failed");
	return await response.json();
};
