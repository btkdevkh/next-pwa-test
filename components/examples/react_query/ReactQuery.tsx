"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ReactQuery = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryTodos = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutation post
  const mutationPost = useMutation({
    mutationFn: postTodo,
    onSuccess: (newTodo) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });

      queryClient.setQueryData(
        ["todos"],
        (old: { id: number; title: string }[] = []) => [...old, newTodo]
      );
    },
  });

  // Mutation update
  const mutationUpdate = useMutation({
    mutationFn: updateTodo,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(
        ["todos"],
        (old: { id: number; title: string }[] = []) => {
          // const found = old?.find((t) => t.id === todo.id);
          // const filered = old?.filter((t) => t.id !== found?.id);
          // return [...filered, todo];

          // Better version
          return old.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          );
        }
      );
    },
  });

  // Mutation delete
  const mutationDelete = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deleteTodo) => {
      queryClient.setQueryData(
        ["todos"],
        (old: { id: number; title: string }[] = []) =>
          old?.filter((todo) => todo.id !== deleteTodo.id)
      );
    },
  });

  if (!queryTodos.data) return null;

  return (
    <>
      <ul className="flex flex-col gap-3 bg-gray-600 p-3">
        {queryTodos.data.map((todo) => (
          <li
            className="bg-gray-100 flex justify-between p-2 text-black"
            key={todo.id}
          >
            {todo.title}

            <div className="flex gap-3">
              <span
                className="cursor-pointer text-red-600"
                onClick={() => {
                  mutationUpdate.mutate({
                    id: todo.id,
                    title: `${todo.title} updated`,
                  });
                }}
              >
                U
              </span>

              <span
                className="cursor-pointer text-red-600"
                onClick={() => {
                  mutationDelete.mutate(todo);
                }}
              >
                D
              </span>
            </div>
          </li>
        ))}
      </ul>

      <br />

      <button
        className="bg-blue-700 px-4 py-2"
        onClick={() => {
          mutationPost.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </>
  );
};

export default ReactQuery;

const todos = [
  { id: 1, title: "Todo 1" },
  { id: 2, title: "Todo 2" },
  { id: 3, title: "Todo 3" },
];

// Get todos
const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return todos;
};

// Create todo
const postTodo = async (newTodo: { id: number; title: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return newTodo;
};

// update todo
const updateTodo = async (updateTodo: { id: number; title: string }) => {
  // Simulate API call or side effect
  await new Promise((resolve) => setTimeout(resolve, 500));
  return updateTodo;
};

// Delete todo
const deleteTodo = async (deleteTodo: { id: number; title: string }) => {
  // Simulate API call or side effect
  await new Promise((resolve) => setTimeout(resolve, 500));
  return deleteTodo;
};
