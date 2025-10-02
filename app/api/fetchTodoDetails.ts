export default async function fetchTodoDetails({id,
	setDetails,
	setLoading,
	setError,
	details,
}) {
	setLoading(true);
	setError(null);
	try {
		const response = await fetch(`https://dummyjson.com/todos/${id}`);
		if (!response.ok) {
		}
		const data = await response.json();
		setDetails(data);
		console.log(details);
	} catch (err) {
		// setError(err.message || "Something went wrong");
		console.error("Fetch error:", err);
	} finally {
		setLoading(false);
	}
};
