import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import SingleTodo from "./pages/SingleTodo";
import NotFound from "./pages/NotFound";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTodoId, setCurrentTodoId] = useState(null);
	const [details, setDetails] = useState(null);

	const queryClient = new QueryClient();
	return (
		<Router>
			<NavBar>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								todos={todos}
								setTodos={setTodos}
								error={error}
								setError={setError}
								loading={loading}
								setLoading={setLoading}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						}
					/>
					<Route
						path="/todos"
						element={
							<QueryClientProvider client={queryClient}>
								<Todos
									todos={todos}
									setTodos={setTodos}
									error={error}
									setError={setError}
									loading={loading}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									setCurrentTodoId={setCurrentTodoId}
									details={details}
									setDetails={setDetails}
									setLoading={setLoading}
									currentTodoId={currentTodoId}
								/>
							</QueryClientProvider>
						}
					/>
					<Route
						path="/singleTodo"
						element={
							<QueryClientProvider client={queryClient}>
								<SingleTodo
									todos={todos}
									setTodos={setTodos}
									error={error}
									setError={setError}
									loading={loading}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									setCurrentTodoId={setCurrentTodoId}
									details={details}
									setDetails={setDetails}
								/>
							</QueryClientProvider>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</NavBar>
		</Router>
	);
}



