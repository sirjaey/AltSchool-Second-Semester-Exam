import { useState } from "react";
import { Button } from "../components/auth/ui/button";
import { login, register, logout } from "../authService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function NavBar({ children }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
			<nav className="flex justify-between items-center p-6 shadow-md bg-white sticky top-0 z-50">
				<h1 className="text-2xl font-bold text-blue-700">
					<Link to="/">JoshuaTodos</Link>
				</h1>
				<div className="hidden md:flex space-x-6 text-gray-700">
					<a href="#features" className="cursor-pointer px-4 py-2 rounded-md">
						Features
					</a>

					<Link to="/*" className="cursor-pointer px-4 py-2 rounded-md">
						About
					</Link>

					<Link to="/"><button
						onClick={logout}
						className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded-md"
					>
						Logout
					</button></Link>
					

				</div>
				<div className="md:hidden">
					<button onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? (
							<FontAwesomeIcon icon={faX} className="w-6 h-6" />
						) : (
							<FontAwesomeIcon icon={faBars} className="w-6 h-6" />
						)}
					</button>
				</div>
			</nav>
			{menuOpen && (
				<div className="md:hidden bg-white px-6 py-4 space-y-2 shadow-md">
					<a
						href="#features"
						className="block text-gray-700 hover:text-blue-600">
						Features
					</a>
					<a href="#about" className="block text-gray-700 hover:text-blue-600">
						About
					</a>
					<a
						href="#contact"
						className="block text-gray-700 hover:text-blue-600">
						Contact
					</a>
				</div>
			)}

			{children}
		</div>
	);
}
