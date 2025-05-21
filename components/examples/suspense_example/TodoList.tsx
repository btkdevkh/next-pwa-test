const TodoList = ({ todos }: { todos: { id: number; title: string }[] }) => {
  return (
    <>
      {todos.map((todo: { id: number; title: string }) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </>
  );
};

export default TodoList;
