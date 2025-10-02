"use client";

import AuthForm from "../components/auth/AuthForm";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Home from "./Home";
import NavBar from "../components/NavBar";
import "./globals.css";
import Providers from "./providers"

export default function Page() {
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
        <>
            <Providers>
                <NavBar>
                    <Home />
                </NavBar>
            </Providers>
        </>
    );
}
