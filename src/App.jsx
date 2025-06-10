import { useState } from "react";
import Todos from "./components/Todos";
import ErrorBoundary from "./components/ErrorHandler";
import SingleTodo from "./components/SingleTodo";

export default function App() {
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
