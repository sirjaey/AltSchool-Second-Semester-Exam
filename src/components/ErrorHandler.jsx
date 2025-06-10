import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, message: "" };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, message: error.message };
	}

	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="text-red-600 p-4">
					<h2>Something went wrong.</h2>
					<p>{this.state.message}</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
