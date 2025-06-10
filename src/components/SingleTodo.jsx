import { useState } from "react";

export default function SingleTodo({ error, loading, setLoading, setError, currentTodoId, show }) {
    const [nne, setNne] = useState(null);
    const [jaey, setJaey] = useState(false);

    const fetchSingleTodo = async () => {
        const id = currentTodoId;
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setNne(data);
			// setCurrentPage(1); // Reset to page 1 when new data is fetched
            console.log(nne);
            setJaey(true);
		} catch (err) {
			setError(err.message || "Something went wrong");
			console.error("Fetch error:", err);
		} finally {
			setLoading(false);
		}
    };
    
        show && fetchSingleTodo()


	return (
		<div className="todo-item">
			<button
				
				className="loadTodos mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				Load Single Todos
			</button>

			{loading && <p className="text-gray-500">Loading...</p>}
			{error && <p className="text-red-600">Error: {error}</p>}
			<ul className="space-y-2 mb-4">
				{jaey && (
					<li
						key={nne.id}
						className="todoList p-2 border rounded bg-gray-50 shadow-sm">
						<strong>{nne.title}</strong> -{" "}
						{nne.completed ? "✅ Done" : "❌ Not done"}
					</li>
				)}
			</ul>
		</div>
	);
}


// <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
// <button onClick={() => deleteTodo(todo.id)}>Delete</button>