export default async function deleteTodo (id) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
		{
			method: "DELETE",
		}
	);
	if (!response.ok) throw new Error("Delete failed");
	return true;
};
