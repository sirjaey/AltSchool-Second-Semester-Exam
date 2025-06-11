import { useState } from "react";
import Todos from "../pages/Todos";
import ErrorBoundary from "./ErrorHandler";
import SingleTodo from "../pages/SingleTodo";

export default function TodosHandler() {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [currentTodoId, setCurrentTodoId] = useState(null);
	const [show, setShow] = useState(false);

	return (
		<ErrorBoundary>
			<Todos
				todos={todos}
				setTodos={setTodos}
				error={error}
				setError={setError}
				loading={loading}
				setLoading={setLoading}
				currentTodoId={currentTodoId}
				setCurrentTodoId={setCurrentTodoId}
				show={show}
				setShow={setShow}
			/>
			<SingleTodo
				todos={todos}
				setTodos={setTodos}
				error={error}
				setError={setError}
				loading={loading}
				setLoading={setLoading}
				currentTodoId={currentTodoId}
				setCurrentTodoId={setCurrentTodoId}
				show={show}
				setShow={setShow}
			/>
		</ErrorBoundary>
	);
}
