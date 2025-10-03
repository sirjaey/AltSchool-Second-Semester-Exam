"use client";
import Todos from "../../components/Todos";

export default function TodosPage() {
    return (
        <div>
			<Todos currentPage={1} setCurrentPage={() => {}} currentTodoId={null} setCurrentTodoId={() => {}} setError={() => {}} details={null} setDetails={() => {}} setLoading={() => {}} />
        </div>
    );
}