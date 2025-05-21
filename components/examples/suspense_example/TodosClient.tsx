"use client";

import React, { useEffect, useState } from "react";
import getSimulationDelay from "@/helpers/getSimulationDelay";
import TodoList from "./TodoList";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
};

const TodosClient = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetchData();
      await getSimulationDelay();
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Todos</h2>
      <TodoList todos={todos} />
    </>
  );
};

export default TodosClient;
