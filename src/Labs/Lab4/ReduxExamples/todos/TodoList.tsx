import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
export default function TodoList() {
  const { todos } = useSelector((store: any) => store.todosReducer);
  //   const [todos, setTodos] = useState([
  //     { id: "1", title: "Learn React" },
  //     { id: "2", title: "Learn Node" },
  //   ]);
  //   const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });

  //   const addTodo = (todo: any) => {
  //     const newTodos = [
  //       ...todos,
  //       { ...todo, id: new Date().getTime().toString() },
  //     ];
  //     setTodos(newTodos);
  //     setTodo({ id: "-1", title: "" });
  //   };
  //   const deleteTodo = (id: string) => {
  //     const newTodos = todos.filter((todo) => todo.id !== id);
  //     setTodos(newTodos);
  //   };
  //   const updateTodo = (todo: any) => {
  //     const newTodos = todos.map((item) => (item.id === todo.id ? todo : item));
  //     setTodos(newTodos);
  //     setTodo({ id: "-1", title: "" });
  //   };
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}