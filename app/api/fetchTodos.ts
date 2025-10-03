export default async function fetchTodos() {
  const locStore = localStorage.getItem("todos");
  if (locStore) {
    return JSON.parse(locStore);
  }
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  const {todos} = data;
  console.log(todos);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return todos;
};
