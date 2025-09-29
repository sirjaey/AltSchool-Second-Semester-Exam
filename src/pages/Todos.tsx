import { SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchTodos from "../api/fetchTodos";
import fetchTodoDetails from "../api/fetchTodoDetails";
import updateTodo from "../api/updateTodo";
import deleteTodo from "../api/deleteTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "../components/auth/ui/button";

// ✅ Define a type for a Todo
export interface Todo {
	id: number | string;
	todo: string;
	completed: boolean;
}

// ✅ Define Props for the component
interface TodosProps {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	currentTodoId: number | string | null;
	setCurrentTodoId: React.Dispatch<React.SetStateAction<number | string | null>>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	details: Todo | null;
	setDetails: React.Dispatch<React.SetStateAction<Todo | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Todos: React.FC<TodosProps> = ({
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
	const [allTodos, setAllTodos] = useState<Todo[]>([]);
	const [editingId, setEditingId] = useState<number | string | null>(null);
	const [editText, setEditText] = useState<string>("");
	const [editCompleted, setEditCompleted] = useState<boolean | null>(null);
	const [newTodoTitle, setNewTodoTitle] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [newCompleted, setNewCompleted] = useState<boolean>(false);
	const [newId, setNewId] = useState<string>("");

	// Load todos from localStorage on initial render
	useEffect(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			setAllTodos(JSON.parse(savedTodos));
		}
	}, []);

	// Load newId from localStorage or initialize it
	useEffect(() => {
		const savedId = localStorage.getItem("newTodoId");
		if (savedId) {
			setNewId(JSON.parse(savedId) + 1);
		} else {
			setNewId(31);
		}
	}, []);

	// Fetch todos from API
	const {
		data: todos,
		isLoading,
		isError,
	} = useQuery<Todo[], Error>({
		queryKey: ["todos"],
		queryFn: fetchTodos,
		onSuccess: (data: SetStateAction<Todo[]>) => {
			setAllTodos(data);
			localStorage.setItem("todos", JSON.stringify(data));
			setCurrentPage(1);
		},
	});

	useEffect(() => {
		if (todos) {
			setAllTodos(todos as Todo[]);
		}
	}, [todos]);

	const completed = allTodos?.filter((todo) => todo.completed === true);
	const pending = allTodos?.filter((todo) => todo.completed === false);
	const all = allTodos;

	const todosPerPage = 10;
	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

	let currentTodos: Todo[] = [];
	let totalPages = 1;

	if (fullList) {
		const filtered = (all || []).filter((todo) =>
			todo.todo?.toLowerCase().includes(searchTerm.toLowerCase())
		);
		currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
		totalPages = Math.ceil(filtered.length / todosPerPage);
	}

	if (completedTasks) {
		const filtered = completed
			? completed.filter((todo) =>
				todo.todo?.toLowerCase().includes(searchTerm.toLowerCase())
			)
			: [];
		currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
		totalPages = Math.ceil(filtered.length / todosPerPage);
	}
	if (pendingTasks) {
		const filtered = pending
			? pending.filter((todo) =>
				todo.todo?.toLowerCase().includes(searchTerm.toLowerCase())
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

	const handleSingleTodo = (id: number | string, todo: string, completed: boolean) => {
		setCurrentTodoId(id);
		setDetails({ id, todo, completed });
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

	const handleDelete = async (id: number | string) => {
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

	const handleEdit = (todo: Todo) => {
		setEditingId(todo.id);
		setEditText(todo.todo);
		setEditCompleted(todo.completed);
		setCurrentTodoId(todo.id);
	};

	const handleEditSave = async (id: number | string) => {
		try {
			const updated = await updateTodo(id, {
				todo: editText,
				completed: editCompleted,
			}); // update on server

			const updatedTodos = allTodos.map((todo) =>
				todo.id === id
					? { ...todo, todo: updated.todo, completed: updated.completed }
					: todo
			);

			setAllTodos(updatedTodos);
			localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ updated state

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

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTodoTitle.trim()) return;

		// Generate a unique ID for the new todo

		const newTodo = {
			todo: newTodoTitle.trim(),
			completed: newCompleted,
			userId: 1,
		};

		try {
			const res = await fetch("https://dummyjson.com/todos/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodo),
			});

			const data = await res.json();
			const todoWithUniqueId = { ...data, id: newId }; // Ensure unique ID
			const updatedTodos = [todoWithUniqueId, ...allTodos];
			setAllTodos(updatedTodos);
			localStorage.setItem("todos", JSON.stringify(updatedTodos));
			setNewTodoTitle("");
			setNewCompleted(false);
			setNewId((prev) => prev + 1); // Increment ID for next todo

			//store new Id to local storage
			localStorage.setItem("newTodoId", JSON.stringify(newId));
			console.log("newId:", newId);
		} catch (error) {
			console.error("Failed to add todo:", error);
		}

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

								<Button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded">
									Add Todo
								</Button>
							</form>

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
												onClick={() =>
													handleSingleTodo(todo.id, todo.todo, todo.completed)
												}>
												{editingId === todo.id ? (
													<div>
														<input
															value={editText}
															onChange={(e) => setEditText(e.target.value)}
															className="w-full p-1 border-gray-400 border rounded"
														/>
														{(
															<>
																<input
																	type="checkbox"
																	checked={editCompleted}
																	onChange={(e) =>
																		setEditCompleted(e.target.checked)
																	}
																	className="mr-2"
																/>
																<label>Mark as completed</label>
															</>
														)}
													</div>
												) : (
													<Link to="/singleTodo">
														<p className="todoText font-medium">{todo.todo}</p>
													</Link>
												)}
												<div className="todoActions text-sm text-gray-600">
													{todo.completed ? (
														<span className="statusCompleted">✅ Done</span>
													) : (
														<div><span className="statusP">⏳ Pending</span></div>
													)}
												</div>
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
														{
															<span
																className="edit-btn"
																onClick={() => handleEdit(todo)}>
																<FontAwesomeIcon
																	icon={faPen}
																	className="cursor-pointer text-blue-500"
																/>
															</span>
														}
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
