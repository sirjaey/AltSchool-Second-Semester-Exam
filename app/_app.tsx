import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { TodoProvider } from "../context/TodoContext";
import { AuthProvider } from "../context/AuthContext";
import { auth } from "../lib/firebase"; // move firebase.ts to /lib or /services
import AuthForm from "../components/auth/AuthForm";
import { ToastContainer } from "react-toastify";
import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (authLoading) return <p>Loading...</p>;
    if (!user) return <AuthForm />;

    return (
       
            <AuthProvider>
                <TodoProvider>
                    <ToastContainer autoClose={2000} />
                    <Component {...pageProps} user={user} />
                </TodoProvider>
            </AuthProvider>
        
    );
}