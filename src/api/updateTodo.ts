// export default async function updateTodo (id, data)  {
// 	if (typeof id === "number") {
// 		const response = await fetch(
// 			`https://jsonplaceholder.typicode.com/todos/${id}`,
// 			{
// 				method: "PUT",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify(data),
// 			}
// 		);
// 		if (!response.ok) throw new Error("Update failed");
// 		return await response.json();
// 	}
// 	else return data;
// };

export default async function updateTodo (id: string | number, data: { todo: string; completed: boolean })  {
	
		const response = await fetch(`https://dummyjson.com/todos/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Update failed");
		return await response.json();
	
};
