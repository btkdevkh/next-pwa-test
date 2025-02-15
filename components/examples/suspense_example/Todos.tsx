import getSimulationDelay from "@/helpers/getSimulationDelay";
import TodoList from "./TodoList";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
};

const Todos = async () => {
  const todos = await fetchData();
  await getSimulationDelay();

  return (
    <>
      <h2>Todos</h2>
      <TodoList todos={todos} />
    </>
  );
};

export default Todos;
