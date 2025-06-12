
export default async function fetchTodos() {
  const locStore = localStorage.getItem("todos");
  if (locStore) {
    return JSON.parse(locStore);
  }
	const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};
