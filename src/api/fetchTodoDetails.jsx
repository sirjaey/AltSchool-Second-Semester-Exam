
export default async function fetchTodoDetails({id,
	setDetails,
	setLoading,
	setError,
	details,
}) {
	setLoading(true);
	setError(null);
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/todos/${id}`
		);
		if (!response.ok) {
			// throw new Error(`HTTP error! status: ${response.status}`);
			setDetails(details);
		}
		const data = await response.json();
		setDetails(data);
		// setCurrentPage(1); // Reset to page 1 when new data is fetched
		console.log(details);
		// setJaey(true);
	} catch (err) {
		// setError(err.message || "Something went wrong");
		console.error("Fetch error:", err);
	} finally {
		setLoading(false);
	}
};


// export default async function fetchTodoDetails(id) {
// 	const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
// 	if (!res.ok) {
// 		throw new Error(`HTTP error! status: ${res.status}`);
// 	}
// 	return res.json();
// }
