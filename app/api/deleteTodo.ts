export default async function deleteTodo (id: string | number) {
	const response = await fetch(`https://dummyjson.com/todos/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) throw new Error("Delete failed");
	return true;
};
