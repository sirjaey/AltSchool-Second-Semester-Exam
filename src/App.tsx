// import {Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import NavBar from "./pages/NavBar";
// import Home from "./pages/Home";
// import Todos from "./pages/Todos";
// import SingleTodo from "./pages/SingleTodo";
// import NotFound from "./pages/NotFound";
// import CrashTest from "./pages/CrashTest";

// export interface Todo {
// 	id: number;
// 	title: string;
// 	completed: boolean;
// }

// export default function App() {
// 	const [todos, setTodos] = useState<Todo[]>([]);
// 	const [error, setError] = useState<string | null>(null);
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [currentPage, setCurrentPage] = useState<number>(1);
// 	const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
// 	const [details, setDetails] = useState<Todo | null>(null);

// 	return (
// 		<NavBar>
// 			<Routes>
// 				<Route
// 					path="/"
// 					element={
// 						<Home
							
// 						/>
// 					}
// 				/>
// 				<Route
// 					path="/todos"
// 					element={
// 						<Todos
// 							todos={todos}
// 							setTodos={setTodos}
// 							error={error}
// 							setError={setError}
// 							loading={loading}
// 							currentPage={currentPage}
// 							setCurrentPage={setCurrentPage}
// 							setCurrentTodoId={setCurrentTodoId}
// 							details={details}
// 							setDetails={setDetails}
// 							setLoading={setLoading}
// 							currentTodoId={currentTodoId}
// 						/>
// 					}
// 				/>
// 				<Route
// 					path="/singleTodo"
// 					element={
// 						<SingleTodo
// 							todos={todos}
// 							setTodos={setTodos}
// 							error={error}
// 							setError={setError}
// 							loading={loading}
// 							currentPage={currentPage}
// 							setCurrentPage={setCurrentPage}
// 							setCurrentTodoId={setCurrentTodoId}
// 							details={details}
// 							setDetails={setDetails}
// 						/>
// 					}
// 				/>
// 				<Route path="/crash-test" element={<CrashTest />} />
// 				<Route path="*" element={<NotFound />} />
// 			</Routes>
// 		</NavBar>
// 	);
// }

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase"; // your firebase.ts
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import SingleTodo from "./pages/SingleTodo";
import NotFound from "./pages/NotFound";
import CrashTest from "./pages/CrashTest";
import AuthForm from "./components/auth/AuthForm"; // login/register form

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
	const [details, setDetails] = useState<Todo | null>(null);

	// ---- Auth State ----
	const [user, setUser] = useState<User | null>(null);
	const [authLoading, setAuthLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setAuthLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (authLoading) return <p>Loading...</p>; // optional loading screen while checking auth

	if (!user) return <AuthForm />; // show login/register if not authenticated

	// ---- Render App if authenticated ----
	return (
		<NavBar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/todos"
					element={
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
					}
				/>
				<Route
					path="/singleTodo"
					element={
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
					}
				/>
				<Route path="/crash-test" element={<CrashTest />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</NavBar>
	);
}

