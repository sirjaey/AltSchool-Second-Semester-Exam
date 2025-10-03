"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentTodoId: number | null;
    setCurrentTodoId: React.Dispatch<React.SetStateAction<number | null>>;
    details: Todo | null;
    setDetails: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
    const [details, setDetails] = useState<Todo | null>(null);

    return (
        <TodoContext.Provider
            value={{
                todos, setTodos,
                error, setError,
                loading, setLoading,
                currentPage, setCurrentPage,
                currentTodoId, setCurrentTodoId,
                details, setDetails
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodoContext must be used within a TodoProvider");
    return context;
}