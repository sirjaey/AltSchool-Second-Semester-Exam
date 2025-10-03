import ErrorBoundary from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

export default function SingleTodo({ details, error, loading, setDetails }) {
	const handleClosePreview = () => {
		setDetails(false); // Clear the preview
	};

	return (
		<ErrorBoundary>
			<div className="todo-item">
				{loading && <LoadingSpinner />}
				{error && <p className="text-red-600">Error: {error}</p>}
				<div className="space-y-2 mb-4">
					{details && !loading && (
						<div>
							<div className="preview modal-overlay">
								<div key={details.id} className="modal-content">
									<div>
										<strong>Todo Details</strong>
									</div>
									<div>
										<strong>ID:</strong> {details.id || "Your Todo"}
									</div>
									<strong>Title:</strong>{" "}
									{details.todo || "You created this Todo yourself"}
									<div>
										<p>
											<strong>Status:</strong>{" "}
											{details.completed ? "✅ Done" : "⏳ Pending"}
										</p>
									</div>
									<div className="clote-btn">
										<button
											onClick={handleClosePreview}
											style={{
												color: "white",
												backgroundColor: "red",
												padding: "10px 20px",
												borderRadius: "10px",
											}}>
											<Link
												style={{
													color: "white",
													backgroundColor: "red",
													padding: "10px 20px",
													borderRadius: "10px",
												}}
												to="/todos">
												Back
											</Link>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</ErrorBoundary>
	);
}