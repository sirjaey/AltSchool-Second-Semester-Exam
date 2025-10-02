import SingleTodo from "../../components/SingleTodo";

export default function SingleTodoPage({ details, error, loading, setDetails }) {
    return (
        <>
            <SingleTodo details={details} error={error} loading={loading} setDetails={setDetails} />
        </>
    );
}