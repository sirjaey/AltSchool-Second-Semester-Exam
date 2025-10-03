import { useEffect } from "react";
import Link from "next/link"
import { Button } from "../components/auth/ui/button";
import fetchTodos from "./api/fetchTodos";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
	const handleFetchTodos = () => {
		fetchTodos();
	};
	useEffect(() => {
		toast.success("Logged in successfully!")
	}, []);

	return (
		<>
			<ToastContainer autoClose={2000} />
		<div>
			<header className="text-center py-16 px-6">
				<h2 className="text-5xl font-bold text-blue-800">JoshuaTodos</h2>
				<p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
					Organize your life, one task at a time. Stay productive with our
					minimalist to-do app.
				</p>
				<Button className="mt-6 text-lg px-6 py-3" onClick={handleFetchTodos}>
					<Link to="/todos">Get Started</Link>
				</Button>
			</header>

			<section
				id="features"
				className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto py-16 px-6">
				<div className="flex flex-col justify-center">
					<h3 className="text-3xl font-semibold text-gray-800 mb-4">
						Why JoshuaTodos?
					</h3>
					<ul className="space-y-4 text-gray-700">
						<li>✅ Simple and intuitive interface</li>
						<li>📱 Fully responsive on all devices</li>
						<li>✏️ Editable and Flexible</li>
						<li>🔍 Search and filter tasks easily</li>
					</ul>
				</div>
				<div>
					<img
						src="https://shorturl.at/zVlaT"
						alt="Task management illustration"
						className="rounded-2xl shadow-xl"
					/>
				</div>
			</section>

			<footer id="contact" className="text-center py-10 text-gray-500 px-6">
				<div className="mb-4">
					Have questions or feedback?{" "}
					<a
						href="mailto:smartjoshua98@gmail.com"
						className="text-blue-600 hover:underline"
						id="email-link">
						<strong>Email us</strong>
					</a>
					<div>© 2025 JoshuaTodos. All rights reserved.</div>
				</div>
			</footer>
			</div>
		</>
	);
}
