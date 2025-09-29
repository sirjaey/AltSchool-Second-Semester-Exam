import { useState } from "react";
import { login, register } from "../../authService";
import { ToastContainer, toast } from "react-toastify";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const handleAuth = async () => {
        try {
            if (isLogin) {
                await login(email, password);
                toast.success("Logged in successfully!");
            } else {
                await register(email, password);
                toast.success("Registered successfully!");
            }
        } catch (err) {
            console.error(err);
            toast.error((err as Error).message);
        }
    };

    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="min-h-screen flex items-center justify-center bg-purple-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
                        My Todo App
                    </h1>
                    <h2 className="text-lg text-blue-600 text-center mb-6">
                        {isLogin ? "Login" : "Sign Up"}
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={handleAuth}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors mb-4"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>

                    <p className="text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </div>
            </div>

            {/* <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
        </>
    );
};

export default AuthForm;
