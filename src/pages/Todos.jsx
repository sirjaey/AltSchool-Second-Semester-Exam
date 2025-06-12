import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchTodos from "../api/fetchTodos";
import fetchTodoDetails from "../api/fetchTodoDetails";
import updateTodo from "../api/updateTodo";
import deleteTodo from "../api/deleteTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorHandler";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "@/components/ui/button";


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
	const [allTodos, setAllTodos] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState("");
	const [newTodoTitle, setNewTodoTitle] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [newCompleted, setNewCompleted] = useState(false);


	useEffect(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			setAllTodos(JSON.parse(savedTodos));
		}
	}, []);

	const {
		data: todos,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
		onSuccess: (data) => {
			setAllTodos(data);
			localStorage.setItem("todos", JSON.stringify(data));
			setCurrentPage(1);
		},
	});

	useEffect(() => {
		if (todos) {
			setAllTodos(todos);
		}
	}, [todos]);

	const completed = allTodos.filter((todo) => todo.completed === true);
	const pending = allTodos.filter((todo) => todo.completed === false);
	const all = allTodos;

	const todosPerPage = 10;
	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

	let currentTodos = [];
	let totalPages = 1;

	if (fullList) {
		const filtered = (all
			|| []).filter((todo) =>
					todo.title.toLowerCase().includes(searchTerm.toLowerCase())
			  )
		currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
		totalPages = Math.ceil(filtered.length / todosPerPage);
	}
	
	
	if (completedTasks) {
		const filtered = completed
			? completed.filter((todo) =>
					todo.title.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: [];
		currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
		totalPages = Math.ceil(filtered.length / todosPerPage);
	}
	if (pendingTasks) {
		const filtered = pending
			? pending.filter((todo) =>
					todo.title.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: [];
		currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
		totalPages = Math.ceil(filtered.length / todosPerPage);
	}

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	const handleSingleTodo = (id) => {
		setCurrentTodoId(id);
		fetchTodoDetails({
			id,
			currentTodoId,
			setDetails,
			setLoading,
			setError,
			details,
		});
	};

	const handleAll = () => {
		setFullList(true);
		setCompletedTasks(false);
		setPendingTasks(false);
	};

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

	const handleDelete = async (id) => {
		try {
			await deleteTodo(id); // delete from server
			setAllTodos((prev) => prev.filter((todo) => todo.id !== id)); // update local state
			localStorage.setItem(
				"todos",
				JSON.stringify(allTodos.filter((todo) => todo.id !== id))
			);
			if (currentTodoId === id) {
				setCurrentTodoId(null); // Clear current todo if deleted
			}
			alert("Todo deleted successfully.");
		} catch (err) {
			console.error(err);
			alert("Failed to delete todo.");
		}
	};

	const handleEdit = (todo) => {
		setEditingId(todo.id);
		setEditText(todo.title);
		setCurrentTodoId(todo.id); // Set current todo ID for editing
		fetchTodoDetails({
			id: todo.id,
			currentTodoId,
			setDetails,
			setLoading,
			setError,
			details,
		});
	};

	const handleEditSave = async (id) => {
		try {
			const updated = await updateTodo(id, { title: editText }); // update on server
			setAllTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, title: updated.title } : todo
				)
			);
			setEditingId(null);
			setEditText("");
		} catch (err) {
			console.error(err);
			alert("Failed to update todo.");
		}
	};

	const handleEditCancel = () => {
		setEditingId(null);
		setEditText("");
	};

	const handleAdd = (e) => {
		e.preventDefault();
		if (!newTodoTitle.trim()) return;

		const newTodo = {
			id: Date.now(), // unique ID
			title: newTodoTitle.trim(),
			completed: newCompleted,
		};

		const updatedTodos = [newTodo, ...allTodos];
		setAllTodos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		setNewTodoTitle("");
		setNewCompleted(false);
	};
	

	return (
		<ErrorBoundary>
			<div className="p-4 max-w-xl mx-auto">
				{isLoading && <LoadingSpinner />}
				{isError && <p className="text-red-600">Error fetching todos.</p>}

				{!isLoading && currentTodos.length >= 0 && (
					<>
						<div className="todo-btns mb-4 flex gap-2">
							<Button onClick={handleAll} style={{ backgroundColor: "blue" }}>
								All
							</Button>
							<Button
								onClick={handleCompleted}
								style={{ backgroundColor: "green" }}>
								Completed
							</Button>
							<Button
								onClick={handlePending}
								style={{ backgroundColor: "orange" }}>
								Pending
							</Button>
						</div>

						<div>
							<form onSubmit={handleAdd} className="mb-4">
								<input
									type="text"
									value={newTodoTitle}
									onChange={(e) => setNewTodoTitle(e.target.value)}
									placeholder="Enter new todo"
									className="border p-2 rounded w-full border-blue-600"
								/>

								<div className="flex items-center mb-2">
									<input
										type="checkbox"
										checked={newCompleted}
										onChange={(e) => setNewCompleted(e.target.checked)}
										className="mr-2"
									/>
									<label>Mark as completed</label>
								</div>

								<Button className="bg-green-500 text-white px-4 py-2 rounded">
									Add Todo
								</Button>
							</form>

							{/* <div className="mb-4 flex items-center gap-2">
								<input
									type="text"
									value={newTodoTitle}
									onChange={(e) => setNewTodoTitle(e.target.value)}
									placeholder="Enter new todo"
									className="border p-2 rounded w-full border-blue-600"
								/>
								<Button
									onClick={handleAdd}
									className="bg-green-500 text-white px-4 py-2 rounded">
									Add
								</Button>
							</div> */}
							<div className="search-bar mb-4">
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search todos..."
									className="w-full p-2 border border-blue-600 rounded"
								/>
							</div>
						</div>

						{currentTodos.length === 0 ? (
							<p className="text-gray-500">No todos found.</p>
						) : (
							<ul className="space-y-2 mb-4">
								{currentTodos.map((todo) => (
									<li
										key={todo.id}
										className="todoCell p-2 border rounded bg-gray-50 shadow-sm">
										<div className="flex justify-between items-center">
											<div
												className="flex-1"
												onClick={() => handleSingleTodo(todo.id)}>
												{editingId === todo.id ? (
													<input
														value={editText}
														onChange={(e) => setEditText(e.target.value)}
														className="w-full p-1 border-gray-400 border rounded"
													/>
												) : (
													<Link to="/singleTodo">
														<p className="todoText font-medium">{todo.title}</p>
													</Link>
												)}
												<p className="todoActions text-sm text-gray-600">
													{todo.completed ? (
														<span className="statusCompleted">✅ Done</span>
													) : (
														<span className="statusP">❌ Pending</span>
													)}
												</p>
											</div>

											<div className="flex items-center gap-2">
												{editingId === todo.id ? (
													<>
														<Button
															className="cursor-pointer bg-green-500"
															disabled={!editText.trim()}
															onClick={() => handleEditSave(todo.id)}>
															Save
														</Button>
														<Button
															onClick={handleEditCancel}
															className="bg-red-500">
															Cancel
														</Button>
													</>
												) : (
													<>
														<span onClick={() => handleEdit(todo)}>
															<FontAwesomeIcon
																icon={faPen}
																className="cursor-pointer text-blue-500"
															/>
														</span>
														<span onClick={() => handleDelete(todo.id)}>
															<FontAwesomeIcon
																icon={faTrash}
																className="cursor-pointer text-red-600"
															/>
														</span>
													</>
												)}
											</div>
										</div>
									</li>
								))}
							</ul>
						)}

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

// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import fetchTodos from "../scripts/fetchTodos";
// import { Button } from "@/components/ui/button";
// import ErrorBoundary from "../components/ErrorHandler";
// import LoadingSpinner from "../components/LoadingSpinner";
// import fetchTodoDetails from "../scripts/fetchTodoDetails";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faPen } from "@fortawesome/free-solid-svg-icons";

// const Todos = ({
// 	currentPage,
// 	setCurrentPage,
// 	currentTodoId,
// 	setCurrentTodoId,
// 	setError,
// 	details,
// 	setDetails,
// 	setLoading,
// }) => {
// 	const [fullList, setFullList] = useState(true);
// 	const [completedTasks, setCompletedTasks] = useState(false);
// 	const [pendingTasks, setPendingTasks] = useState(false);

// 	const {
// 		data: todos,
// 		isLoading,
// 		isError,
// 	} = useQuery({
// 		queryKey: ["todos"],
// 		queryFn: fetchTodos,
// 		onSuccess: () => {
// 			console.log(todos); // Log the fetched todos
// 			setCurrentPage(1); // Reset to page 1 when data is fetched
// 		},
// 	});

// 	console.log(todos);
// 	const completed = todos?.filter((todo) => todo.completed === true);
// 	const pending = todos?.filter((todo) => todo.completed === false);
// 	const all = todos?.filter((todo) => todo.id);

// 	const todosPerPage = 10;

// 	// Pagination logic
// 	const indexOfLastTodo = currentPage * todosPerPage;
// 	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

// 	let currentTodos;
// 	let totalPages;

// 	if (fullList) {
// 		currentTodos = all ? all.slice(indexOfFirstTodo, indexOfLastTodo) : [];

// 		totalPages = all ? Math.ceil(all.length / todosPerPage) : 1;
// 	}
// 	if (completedTasks) {
// 		currentTodos = completed
// 			? completed.slice(indexOfFirstTodo, indexOfLastTodo)
// 			: [];

// 		totalPages = completed ? Math.ceil(completed.length / todosPerPage) : 1;
// 	}
// 	if (pendingTasks) {
// 		currentTodos = pending
// 			? pending.slice(indexOfFirstTodo, indexOfLastTodo)
// 			: [];

// 		totalPages = pending ? Math.ceil(pending.length / todosPerPage) : 1;
// 	}

// 	const handlePrev = () => {
// 		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
// 	};

// 	const handleNext = () => {
// 		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
// 	};

// 	const handleSingleTodo = (id) => {
// 		setCurrentTodoId(id);
// 		console.log(currentTodoId);
// 		// This function is used to fetch and display a single todo
// 		fetchTodoDetails({
// 			id,
// 			currentTodoId,
// 			setDetails,
// 			setLoading,
// 			setError,
// 			details,
// 		});
// 		// Set the current todo ID for further actions
// 		console.log(`Clicked on Todo ID: ${id}`);
// 	};

// 	const handleAll = () => {
// 		setFullList(true);
// 		setCompletedTasks(false);
// 		setPendingTasks(false);
// 	};
// 	const handleCompleted = () => {
// 		setFullList(false);
// 		setCompletedTasks(true);
// 		setPendingTasks(false);
// 	};
// 	const handlePending = () => {
// 		setFullList(false);
// 		setCompletedTasks(false);
// 		setPendingTasks(true);
// 	};
// 	const handleDelete = (id) => {
// 		// This function is used to delete a todo
// 		console.log(`Delete Todo ID: ${id}`);
// 		// Implement the delete logic here, e.g., make an API call to delete the todo
// 		alert(`Todo with ID ${id} deleted!`);
// 		currentTodos = currentTodos.filter((todo) => todo.id !== id);
// 	}

// 	return (
// 		<ErrorBoundary>
// 			<div className="p-4 max-w-xl mx-auto">
// 				{isLoading && <LoadingSpinner />}
// 				{isError && <p className="text-red-600">Error fetching todos.</p>}

// 				{!isLoading && currentTodos.length > 0 && (
// 					<>
// 						<div className="todo-btns">
// 							<Button onClick={handleAll} style={{ backgroundColor: "blue" }}>
// 								All
// 							</Button>{" "}
// 							<Button
// 								onClick={handleCompleted}
// 								style={{ backgroundColor: "green" }}>
// 								Completed
// 							</Button>{" "}
// 							<Button
// 								onClick={handlePending}
// 								style={{ backgroundColor: "orange" }}>
// 								Pending
// 							</Button>
// 						</div>
// 						<ul className="space-y-2 mb-4">
// 							{currentTodos.map((todo) => (
// 								<li
// 									key={todo.id}
// 									className="todoList p-2 border rounded bg-gray-50 shadow-sm"
// 									onClick={() => handleSingleTodo(todo.id)}>
// 									{
// 										<div className="todoCell">
// 											<Link to="/singleTodo">
// 												<div className="todoText">
// 													<p>{todo.title}</p>
// 												</div>
// 											</Link>
// 											<div className="todoActions">
// 												{todo.completed ? (
// 													<span className="statusCompleted">✅ Done</span>
// 												) : (
// 													<span className="statusP">Pending</span>
// 												)}
// 												<span>
// 													<FontAwesomeIcon icon={faPen} />
// 												</span>
// 												<span onClick={handleDelete.bind(null, todo.id)}>
// 													<FontAwesomeIcon
// 														icon={faTrash}
// 														style={{ color: "#e62828" }}
// 													/>
// 												</span>
// 											</div>
// 										</div>
// 									}
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
