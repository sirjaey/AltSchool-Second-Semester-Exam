import { useState } from "react";

const Todos = ({todos, setTodos, error, setError, loading, setLoading, setCurrentTodoId, setShow}) => {
	const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;
    const [showList, setShowList] = useState(true)

	const fetchTodos = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos"
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setTodos(data);
            setCurrentPage(1); // Reset to page 1 when new data is fetched
            // console.log(data)
		} catch (err) {
			setError(err.message || "Something went wrong");
			console.error("Fetch error:", err);
		} finally {
			setLoading(false);
		}
    };
    
    const handleFetchTodos = () => {
        if (showList) {
            fetchTodos();
        }
        else return
    }

	// Pagination logic
	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
	const totalPages = Math.ceil(todos.length / todosPerPage);

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    
    const handleSingleTodo = (id) => {
        // This function is used to fetch and display a single todo 
        setCurrentTodoId(id);
        setShow(true)
        setShowList(false)
        console.log(`Clicked on Todo ID: ${id}`);
    }

	return (
		<div className="p-4 max-w-xl mx-auto">
			<button
				onClick={handleFetchTodos}
				className="loadTodos mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				Load Todos
			</button>

			{loading && <p className="text-gray-500">Loading...</p>}
			{error && <p className="text-red-600">Error: {error}</p>}

			{!loading && currentTodos.length > 0 && (
				<>
					<ul className="space-y-2 mb-4">
						{currentTodos.map((todo) => (
							<li
								key={todo.id}
								className="todoList p-2 border rounded bg-gray-50 shadow-sm"
								onClick={() => handleSingleTodo(todo.id)}>
								<strong>{todo.title}</strong> -{" "}
								{todo.completed ? "✅ Done" : "❌ Not done"}
							</li>
						))}
					</ul>

					<div className="flex justify-between items-center">
						<button
							onClick={handlePrev}
							disabled={currentPage === 1}
							className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
							Previous
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={handleNext}
							disabled={currentPage === totalPages}
							className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50">
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Todos;