import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchTodos from "../scripts/fetchTodos";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "../components/ErrorHandler";
import LoadingSpinner from "../components/LoadingSpinner";
import fetchTodoDetails from "../scripts/fetchTodoDetails";

const Todos = ({
	currentPage,
	setCurrentPage,
	currentTodoId,
	setCurrentTodoId,
	setError,
	details,
	setDetails,
	setLoading,
}) => {
	const [fullList, setFullList] = useState(true);
	const [completedTasks, setCompletedTasks] = useState(false);
	const [pendingTasks, setPendingTasks] = useState(false);

	const {
		data: todos,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
		onSuccess: () => {
			// setTodos(todos); // Store fetched todos in state
			console.log(todos); // Log the fetched todos
			// setIsLoading(false)// Set loading to false after fetching
			setCurrentPage(1); // Reset to page 1 when data is fetched
		},
	});

	const completed = todos?.filter((todo) => todo.completed === true);
	const pending = todos?.filter((todo) => todo.completed === false);
	const all = todos?.filter((todo) => todo.id);

	const todosPerPage = 10;

	// Pagination logic
	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

	let currentTodos;
	let totalPages;

	if (fullList) {
		currentTodos = all ? all.slice(indexOfFirstTodo, indexOfLastTodo) : [];

		totalPages = all ? Math.ceil(all.length / todosPerPage) : 1;
	}
	if (completedTasks) {
		currentTodos = completed
			? completed.slice(indexOfFirstTodo, indexOfLastTodo)
			: [];

		totalPages = completed ? Math.ceil(completed.length / todosPerPage) : 1;
	}
	if (pendingTasks) {
		currentTodos = pending
			? pending.slice(indexOfFirstTodo, indexOfLastTodo)
			: [];

		totalPages = pending ? Math.ceil(pending.length / todosPerPage) : 1;
	}

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	const handleSingleTodo = (id) => {
		setCurrentTodoId(id);
		console.log(currentTodoId);
		// This function is used to fetch and display a single todo
		fetchTodoDetails({
			id,
			currentTodoId,
			setDetails,
			setLoading,
			setError,
			details,
		});
		// Set the current todo ID for further actions
		console.log(`Clicked on Todo ID: ${id}`);
	};

	const handleAll = () => {
		setFullList(true);
		setCompletedTasks(false);
		setPendingTasks(false)
	}
	const handleCompleted = () => {
		setFullList(false);
		setCompletedTasks(true);
		setPendingTasks(false);
	};
	const handlePending = () => {
		setFullList(false);
		setCompletedTasks(false);
		setPendingTasks(true);
	};

	return (
		<ErrorBoundary>
			<div className="p-4 max-w-xl mx-auto">
				{isLoading && <LoadingSpinner />}
				{isError && <p className="text-red-600">Error fetching todos.</p>}

				{!isLoading && currentTodos.length > 0 && (
					<>
						<div className="todo-btns">
							<Button onClick={handleAll} style={{ backgroundColor: "blue" }}>
								All
							</Button>{" "}
							<Button
								onClick={handleCompleted}
								style={{ backgroundColor: "green" }}>
								Completed
							</Button>{" "}
							<Button
								onClick={handlePending}
								style={{ backgroundColor: "orange" }}>
								Pending
							</Button>
						</div>
						<ul className="space-y-2 mb-4">
							{currentTodos.map((todo) => (
								<li
									key={todo.id}
									className="todoList p-2 border rounded bg-gray-50 shadow-sm"
									onClick={() => handleSingleTodo(todo.id)}>
									{
										<Link to="/singleTodo">
											<strong>{todo.title}</strong> -{" "}
											{todo.completed ? "✅ Done" : "❌ Not done"}
										</Link>
									}
								</li>
							))}
							{/* {status &&
								status.map((todo) => (
									<li
										key={todo.id}
										className="todoList p-2 border rounded bg-gray-50 shadow-sm"
										onClick={() => handleSingleTodo(todo.id)}>
										{
											<Link to="/singleTodo">
												<strong>{todo.title}</strong> -{" "}
												{todo.completed ? "✅ Done" : "❌ Not done"}
											</Link>
										}
									</li>
								))} */}
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
		</ErrorBoundary>
	);
};

export default Todos;

// const Todos = ({
// 	currentPage,
// 	setCurrentPage,
// 	setCurrentTodoId,
// 	todos,
// 	error,
// 	loading,
// }) => {
// 	const todosPerPage = 10;

// 	// Pagination logic
// 	const indexOfLastTodo = currentPage * todosPerPage;
// 	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
// 	const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
// 	const totalPages = Math.ceil(todos.length / todosPerPage);

// 	const handlePrev = () => {
// 		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
// 	};

// 	const handleNext = () => {
// 		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
// 	};

// 	const handleSingleTodo = (id) => {
// 		// This function is used to fetch and display a single todo
// 		setCurrentTodoId(id);
// 		console.log(`Clicked on Todo ID: ${id}`);
// 	};

// 	return (
// 		<ErrorBoundary>
// 			<div className="p-4 max-w-xl mx-auto">
// 				{loading && <LoadingSpinner/>}
// 				{error && <p className="text-red-600">Error: {error}</p>}

// 				{!loading && currentTodos.length > 0 && (
// 					<>
// 						<ul className="space-y-2 mb-4">
// 							{currentTodos.map((todo) => (
// 								<li
// 									key={todo.id}
// 									className="todoList p-2 border rounded bg-gray-50 shadow-sm"
// 									onClick={() => handleSingleTodo(todo.id)}>
// 									<strong>
// 										<Link to="/singleTodo">{todo.title}</Link>
// 									</strong>{" "}
// 									- {todo.completed ? "✅ Done" : "❌ Not done"}
// 								</li>
// 							))}
// 						</ul>

// 						<div className="flex justify-between items-center">
// 							<button
// 								onClick={handlePrev}
// 								disabled={currentPage === 1}
// 								className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
// 								Previous
// 							</button>
// 							<span>
// 								Page {currentPage} of {totalPages}
// 							</span>
// 							<button
// 								onClick={handleNext}
// 								disabled={currentPage === totalPages}
// 								className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50">
// 								Next
// 							</button>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 		</ErrorBoundary>
// 	);
// };

// export default Todos;
